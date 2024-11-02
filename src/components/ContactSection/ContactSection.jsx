import React, { useState, useRef, forwardRef, useEffect } from 'react';
import contactImage from '../../assets/images/contact-me.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingGIF from '../../assets/images/loading-giphy.gif';

const apiKey = import.meta.env.VITE_API_KEY;
// IndexedDB setup


console.log(apiKey);
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('emailDB', 2); // Incremented version number

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => resolve(event.target.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('globalSubmissions')) {
                db.createObjectStore('globalSubmissions', { keyPath: 'id' });
            }
        };
    });
}

// Save or update submission count in IndexedDB
async function updateSubmissionCount() {
    const db = await openDatabase();
    
    // Check if the object store exists
    if (!db.objectStoreNames.contains('globalSubmissions')) {
        console.error('Object store "globalSubmissions" not found.');
        return { allowed: true, count: 0, timestamp: null };
    }
    
    const transaction = db.transaction(['globalSubmissions'], 'readwrite');
    const store = transaction.objectStore('globalSubmissions');
    const request = store.get('submissionCount');

    return new Promise((resolve) => {
        request.onsuccess = async (event) => {
            const record = event.target.result;
            const currentTime = new Date().getTime();

            if (record) {
                const timeDifference = currentTime - record.timestamp;
                
                if (timeDifference < 24 * 60 * 60 * 1000) {
                    const newCount = record.count + 1;
                    await store.put({ id: 'submissionCount', count: newCount, timestamp: record.timestamp });
                    resolve({ allowed: newCount <= 2, count: newCount, timestamp: record.timestamp });
                } else {
                    await store.put({ id: 'submissionCount', count: 1, timestamp: currentTime });
                    resolve({ allowed: true, count: 1, timestamp: currentTime });
                }
            } else {
                const timestamp = currentTime;
                await store.put({ id: 'submissionCount', count: 1, timestamp });
                resolve({ allowed: true, count: 1, timestamp });
            }
        };

        request.onerror = (event) => {
            console.error('Error retrieving submission count:', event.target.error);
            resolve({ allowed: true, count: 0, timestamp: null });
        };
    });
}

const ContactSection = forwardRef((props, ref) => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [resetTime, setResetTime] = useState('');
    const [emailCount, setEmailCount] = useState(0);

    // useEffect(() => {
    //     const checkStoredSubmissions = async () => {
    //         const { allowed, count, timestamp } = await updateSubmissionCount();
    //         setEmailCount(count);

    //         if (!allowed) {
    //             const resetDate = new Date(timestamp + 24 * 60 * 60 * 1000);
    //             setResetTime(resetDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    //         }
    //     };

    //     checkStoredSubmissions();
    // }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { allowed, count, timestamp } = await updateSubmissionCount();
        setEmailCount(count);

        if (!allowed) {
            const resetDate = new Date(timestamp + 24 * 60 * 60 * 1000);
            setResetTime(resetDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
            toast.warning(
                'Submission limit reached. Please wait before sending another.',
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                }
            );
            return;
        }

        const formData = new FormData(event.target);
        formData.append('access_key', apiKey);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            setLoading(true);
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: json,
            });

            const data = await res.json();

            if (data.success) {
                setLoading(false);
                formRef.current.reset();
                toast.success(
                    'Your message has been sent successfully!',
                    {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    }
                );
            } else {
                setLoading(false);
                toast.error('Submission failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            toast.error('There was an error processing your request. Please try again.');
        }
    };

    const isDisabled = emailCount >= 2;

  return (
    <section  id='contactSection' className="max-w-screen-xl mx-auto px-6 py-16 bg-gradient-to-r from-blue-900 to-blue-500 rounded-lg shadow-lg">
      <h2  className="text-3xl sm:text-[40px] bg-[#111] relative z-10 font-bold px-6 py-3 w-max mx-auto text-center text-[#00f2fe] sm:border-2 border-[#00f2fe] rounded-md shadow-md">
        Let's Connect
      </h2>
      <div  className="flex flex-col md:flex-row items-center justify-center mt-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img src={contactImage} alt="Contact Us" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-8 rounded-lg mb-2 shadow-lg" method="POST">
          <div ref={ref} className="mb-6">
            <label htmlFor="name" className="block text-lg font-semibold text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-100 border-2 outline-none border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
              placeholder="Enter your name"
              required
              disabled={isDisabled}
              style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-900">Your Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-100 border-2 outline-none border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
              placeholder="asjad23dawre@gmail.com"
              disabled={isDisabled}
              required
              style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-semibold text-gray-900">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              className="bg-gray-100 border-2 outline-none border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
              placeholder="Write your message here..."
              disabled={isDisabled}
              style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full relative text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-lg px-5 py-3 focus:outline-none transition-transform transform hover:scale-105"
            disabled={isDisabled}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          >
           { 
            isDisabled && <p className='text-center text-red-600 text-lg'>You have already sent {emailCount} emails. Reset Will be on {resetTime}</p>
          }

          {
            loading && <img
            className="absolute left-[105px] border-2 border-black animate-rotate-infinite rounded-md bottom-[5px]" // Note 'animate-' instead of 'animation-'
            height="40px"
            width="45px"
            src={loadingGIF}
            alt="" />            
                 
         } 
           Send Message
   </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
});

export default ContactSection;
