import React, { useState,useEffect, useRef, forwardRef } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import contactImage from '../../assets/images/contact-me.png';
import {Toaster, toast} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import './ContactSection.css';
import { useSelector,useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../store/counterSlice';
import loadingGIF from '../../assets/images/loading-giphy.gif';
const apiKey = import.meta.env.VITE_API_KEY;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('emailDB', 2); // Incremented version

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
    const [user, setUser] = useState(null);
    const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(false);
    const [resetTime, setResetTime] = useState('');
    const [emailCount, setEmailCount] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticatedLocal(true);
            dispatch(setIsAuthenticated({ user: parsedUser.email, value: true }));
        }
    }, []);
    

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Add any additional scopes if needed
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: new Date().toISOString()
            }, { merge: true });

            setUser(user);
            const UserObj = {email:user.email,value:true,displayName:user.displayName,photoURL:user.photoURL};
            localStorage.setItem('authUser', JSON.stringify(UserObj));
            setIsAuthenticatedLocal(true);
            console.log('User authenticated:', user);
            dispatch(setIsAuthenticated({user:user.email,value:true}));
            toast.success('Successfully authenticated!');
        } catch (error) {
            console.error('Error during Google authentication:', error);
            toast.error('Authentication failed');
        }
    };

    const handleSubmit = async (event) => {
        if (!isAuthenticatedLocal) {
            toast.error('Please authenticate first');
            return;
        }

        event.preventDefault();
        const { allowed, count, timestamp } = await updateSubmissionCount();
        setEmailCount(count);

        if (!allowed) {
            const resetDate = new Date(timestamp + 24 * 60 * 60 * 1000);
            setResetTime(resetDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
            toast.warning('Submission limit reached. Please wait before sending another.');
            return;
        }

        const formData = new FormData(event.target);
        formData.append('access_key', apiKey);
        formData.append('authenticated_email', user.email);
        formData.append('authenticated_name', user.displayName);

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
                // Save message to Firestore
                await setDoc(doc(db, 'messages', Date.now().toString()), {
                    userId: user.uid,
                    name: user.displayName,
                    email: user.email,
                    message: object.message,
                    timestamp: new Date().toISOString()
                });

                setLoading(false);
                formRef.current.reset();
                toast.success('Your message has been sent successfully!');
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

    return (
        <section ref={ref} id='contactSection' className="contact-section max-w-screen-xl mx-auto px-6 py-16 bg-gradient-to-r from-blue-900 to-blue-500 rounded-lg shadow-lg">
            <h2 className="text-3xl sm:text-[40px] bg-[#111] relative z-10 font-bold px-6 py-3 w-max mx-auto text-center text-[#00f2fe] sm:border-2 border-[#00f2fe] rounded-md shadow-md">
                Let's Connect
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-8">
                <div className="w-full md:w-1/2 flex justify-center transform hover:scale-105 transition-transform duration-300">
                    <img src={contactImage} alt="Contact Us" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="form-container w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                    {!isAuthenticatedLocal ? (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">Please authenticate to send a message</h3>
                            <button
                                onClick={handleGoogleSignIn}
                                className="google-btn px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center mx-auto gap-3"
                            >
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-6 h-6"
                                />
                                <span className="text-gray-700 font-medium">Sign in with Google</span>
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="w-full relative" method="POST">
                            {loading && (
                                <div className="loading-overlay">
                                    <div className="spinner"></div>
                                </div>
                            )}
                            <div className="authenticated-info">
                                <img src={user?.photoURL} alt={user?.displayName}   className="w-10 h-10 rounded-full object-cover"
 />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{user?.displayName}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                            {emailCount >= 2 && (
                                <div className="warning-message">
                                    <p>You have reached the submission limit. Reset will be on {resetTime}</p>
                                </div>
                            )}
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-lg font-semibold text-gray-900">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    required
                                    className="form-input bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="submit-btn w-full relative text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-lg px-5 py-3 focus:outline-none transition-transform transform hover:scale-[1.02]"
                                disabled={loading || emailCount >= 2}
                            >
                                {loading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Toaster
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
});

export default ContactSection;