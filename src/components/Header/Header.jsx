import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import NameWhiteLogo from '../name-white-logo/NameWhiteLogo '
import PhoneLogo from '../Phone/PhoneLogo';
import Links from '../Links/Links';
import { useTheme } from '../Theme/ThemeContext';
function Header({ onButtonClick3 }) {
  const [darkMode, setDarkMode] = useState(true);
  const [dialogStep, setDialogStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const funnyResponses = [
    "Hmm... still sus. 👀",
    "You must be from the light side of the force. 🌞",
    "Respect. Bold choice, mortal. 🔥",
    "Interesting... the council will review your case. 🧙‍♂️",
    "I'll allow it. This time. ⚖️",
    "Your bravery is noted. ✨",
    "A rare specimen! 🧪"
  ];

  const handleWhatsappClick = () => {
    toast.success('Coming Soon!', {
      position: 'top-center',
      className: 'mt-[40px] sm:mt-[60px]',
    });
  };
  const { state, dispatch } = useTheme();


  const handleThemeToggle = () => {
    if (darkMode) {
      setDialogStep(1); // start the fun dialog
    } else {
      setDarkMode(true); // just toggle back to dark
    }
  };

  const handleDialogResponse = (response) => {
    if (dialogStep === 1) {
      if (response === 'yes') {
        setDialogStep(2);
        setYesCount(1);
      } else {
        setDialogStep(0);
        setDarkMode(false);
        toast("Ahh, a fellow night owl 🦉. Carry on.", {
          icon: '🌚',
          position: 'bottom-center'
        });
      }
    } else if (dialogStep === 2 || dialogStep === 3) {
      if (response === 'yes') {
        if (yesCount >= 2) {
          setDialogStep(0);
          setYesCount(0);
          toast.error("🕵️ You are an imposter. Real devs fear the light!", {
            position: 'bottom-center',
            duration: 4000
          });
        } else {
          setDialogStep(dialogStep + 1);
          setYesCount(yesCount + 1);
        }
      } else {
        setShowExplanation(true);
        setDialogStep(0);
        setDarkMode(false);
      }
    }
  };

  const handleSubmitExplanation = () => {
    const random = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
    setResponseMessage(random);
    setShowExplanation(false);
    setTimeout(() => {
      toast(random, { position: 'bottom-center', duration: 5000 });
    }, 300);
  };

  return (
    <>
      <div className={`w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${darkMode ? 'bg-black/80 border-b border-gray-800' : ''}`}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NameWhiteLogo darkMode={darkMode} />
            </div>

<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-auto pt-1 pb-2 px-3]">
  <Links darkMode={darkMode} />
</div>

{/* Mobile Hamburger Icon */}
<div className="md:hidden relative">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="text-gray-400 hover:text-white focus:outline-none"
  >
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
{isMenuOpen && (
  <>
{/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50 z-40"
      onClick={() => setIsMenuOpen(false)}
    />

    {/* Popup Container */}
    <div className="fixed top-[140%] left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    p-4 rounded-lg shadow-xl z-50 w-[300px]
                    bg-white dark:bg-gray-900 border dark:border-gray-700
                    transition-all duration-300 ease-out animate-popup">

      {/* Close Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>

      {/* Social Icons */}
      <Links darkMode={darkMode} isMobilePopup={true} />
    </div>
  </>
)}
</div>
              {/* 🌞 Theme Toggle Button */}
  {/* Right-side group: Sun, WhatsApp, Phone */}
<div className="flex items-center space-x-4">
  {/* 🌞 Theme Toggle Button */}
  <div className="relative">
    <button
      onClick={handleThemeToggle}
      className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="feather feather-sun">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="feather feather-moon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>

    {/* Interactive Dialog */}
    {dialogStep > 0 && (
      <div className={`absolute right-0 top-12 w-72 p-4 rounded-lg shadow-xl z-50 ${darkMode ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-200 text-black'}`}>
        {dialogStep === 1 && <p>You don't like dark mode? 🤨</p>}
        {dialogStep === 2 && <p>Are you a developer? 👨‍💻</p>}
        {dialogStep === 3 && <p>Wait... a dev that doesn't like dark mode? Are you sure? 🤔</p>}
        <div className="flex justify-end space-x-2 mt-3">
          <button onClick={() => handleDialogResponse('no')} className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white">No</button>
          <button onClick={() => handleDialogResponse('yes')} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Yes</button>
        </div>
      </div>
    )}
  </div>

  {/* WhatsApp */}
  <button
    onClick={handleWhatsappClick}
    className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
  >
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 448 512"
  fill="currentColor"
  className="text-green-500 hover:text-green-600 transition-colors duration-300"
>
  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222
           0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1
           27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 
           341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5
           -29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6
           19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6
           -186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8
           -12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3
           -54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4
           -2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6
           -.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7
           22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 
           10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5
           -3.9-10.5-6.6z" />
</svg>
  </button>

  {/* Phone Logo */}
  <PhoneLogo onButtonClick3={onButtonClick3} darkMode={darkMode} />
</div>
</div>

          </div>
        </div>
        {/* Mobile Links Dropdown */}


      {/* </div> */}

      {/* Explanation Form */}
      {showExplanation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-[1000]">
          <div className={`w-[90%] max-w-md p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-xl`}>
            <p className="mb-2">Explain yourself! Why do you want light mode? 🧐</p>
            <textarea
              rows={4}
              className="w-full mt-2 p-2 border border-gray-300 rounded text-black"
              placeholder="Tell me your reasons..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
            <button
              onClick={handleSubmitExplanation}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Spacer below fixed header */}
      <div className="h-16"></div>
    </>
  );
}

export default Header;
