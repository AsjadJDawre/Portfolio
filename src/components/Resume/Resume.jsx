import React from 'react';

const ResumeSection = () => {
  return (
    <div className="text-center relative my-10">
    
      <button
        className="relative  g-[#4595eb] font-extrabold  hover:scale-105 ease-in-out duration-100  group   p-2 z-10 text-4xl  py-5 mb-5 border-2 border-gray-300 rounded-lg inline-block  text-[#1788A7] shadow-lg"
        onClick={() => alert('Coming Soon!')} // Adjust this path as necessary
      >
        Get My Resume
      </button>
    </div>
  );
};

export default ResumeSection;
