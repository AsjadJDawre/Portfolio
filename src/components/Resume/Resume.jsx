import React from 'react';
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';

const ResumeSection = () => {
  const obj = useSelector((state) => state.IsAuthenticated);
  const isAuthenticated = obj.value
  // console.log(obj);
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  const checkAuth = () => {
    if (!isAuthenticated) {
      toast.error('Please authenticate first');
      return false;
    }
    return true;
  };

  const resume_link = import.meta.env.VITE_RESUME_LINK
  const handleClick = () => {
    if (checkAuth()) {
      setTimeout(() => {
        window.open(resume_link, '_blank');
      }, 3000);
    
      toast.custom((t) => (
        <div
          className={`transition-all duration-300 transform ${
            t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={authUser?.photoURL}
                  alt={authUser?.displayName}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{authUser?.displayName}</p>
                <div className="mt-2 space-y-1">
  <p className="text-sm text-gray-700 font-medium">
    Hope we can stay in touch and collaborate in the future!
  </p>
  <p className="text-xs text-blue-600 italic">
    Please wait, your file will open shortly — it may take a few seconds.
  </p>
  
</div>


                </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      
      
      ;
    }  };
  return (
    <div className="text-center relative my-10">
    
      <button
        className="relative  g-[#4595eb] font-extrabold  hover:scale-105 ease-in-out duration-100  group   p-2 z-10 text-4xl  py-5 mb-5 border-2 border-gray-300 rounded-lg inline-block  text-[#1788A7] shadow-lg"
        onClick={handleClick}
           >
        Get My Resume 
      </button>
    </div>
  );
};

export default ResumeSection;
