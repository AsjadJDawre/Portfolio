import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import NameWhiteLogo from '../name-white-logo/NameWhiteLogo';
import PhoneLogo from '../Phone/PhoneLogo';
import Links from '../Links/Links';
import { useTheme } from '../Theme/ThemeContext';

function Header({ onButtonClick3 }) {
  const [dialogStep, setDialogStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const funnyResponses = [
    "Hmm... still sus. 👀",
    "You must be from the light side of the force. 🌞",
    "Respect. Bold choice, mortal. 🔥",
    "Interesting... the council will review your case. 🧙‍♂️",
    "I'll allow it. This time. ⚖️",
    "Your bravery is noted. ✨",
    "A rare specimen! 🧪"
  ];

  const { state, dispatch } = useTheme();
  const darkMode = state.darkMode;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsappClick = () => {
    toast.success('Coming Soon!', {
      position: 'top-center',
      className: 'mt-[40px] sm:mt-[60px]',
    });
  };

  const handleThemeToggle = () => {
    if (state.darkMode) {
      setDialogStep(1);
    } else {
      dispatch({ type: 'SET_DARK' });
    }
  };

  const handleDialogResponse = (response) => {
    if (dialogStep === 1) {
      if (response === 'yes') {
        setDialogStep(2);
        setYesCount(1);
      } else {
        setDialogStep(0);
        dispatch({ type: 'SET_LIGHT' });
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
        dispatch({ type: 'SET_LIGHT' });
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
      <motion.div 
        className={`w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300
          ${darkMode ? 'bg-black/80' : 'bg-white/90'} 
          ${hasScrolled ? 'shadow-lg border-b border-opacity-10' : ''}
          ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <NameWhiteLogo darkMode={darkMode} />
            </motion.div>

            {/* Desktop Links - Centered */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-auto">
              <Links darkMode={darkMode} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <motion.div
                      className="fixed inset-0 bg-black/50 z-40"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    <motion.div
                      className="fixed top-20 right-4 p-4 rounded-lg shadow-xl z-50 w-[280px]"
                      style={{ 
                        background: darkMode 
                          ? 'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)' 
                          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)',
                        border: darkMode ? '1px solid rgba(55,65,81,0.5)' : '1px solid rgba(209,213,219,0.5)'
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Connect with me</h3>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-sm px-2 py-1 rounded-md transition-colors 
                            ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                        >
                          Close
                        </button>
                      </div>
                      <Links darkMode={darkMode} isMobilePopup={true} />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Right-side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <button
                  onClick={handleThemeToggle}
                  className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="4" />
                      <line x1="11" y1="1" x2="11" y2="3" />
                      <line x1="11" y1="19" x2="11" y2="21" />
                      <line x1="3.22" y1="3.22" x2="4.64" y2="4.64" />
                      <line x1="17.36" y1="17.36" x2="18.78" y2="19.78" />
                      <line x1="1" y1="11" x2="3" y2="11" />
                      <line x1="19" y1="11" x2="21" y2="11" />
                      <line x1="3.22" y1="19.78" x2="4.64" y2="18.36" />
                      <line x1="17.36" y1="4.64" x2="18.78" y2="3.22" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>

                {/* Theme Dialog */}
                <AnimatePresence>
                  {dialogStep > 0 && (
                    <motion.div
                      className={`absolute right-0 top-12 w-72 p-4 rounded-lg shadow-xl z-50 
                        ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} border`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {dialogStep === 1 && <p>You don't like dark mode? 🤨</p>}
                      {dialogStep === 2 && <p>Are you a developer? 👨‍💻</p>}
                      {dialogStep === 3 && <p>Wait... a dev that doesn't like dark mode? Are you sure? 🤔</p>}
                      <div className="flex justify-end space-x-2 mt-3">
                        <motion.button 
                          onClick={() => handleDialogResponse('no')} 
                          className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          No
                        </motion.button>
                        <motion.button 
                          onClick={() => handleDialogResponse('yes')} 
                          className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Yes
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* WhatsApp */}
              <motion.button
                onClick={handleWhatsappClick}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 448 512"
                  fill={darkMode? "currentColor" : "black"}
                  className={`transition-colors duration-300 ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </motion.button>

              {/* Phone */}
              <PhoneLogo onButtonClick3={onButtonClick3} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/50 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`w-[90%] max-w-md p-6 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-medium mb-3">Explain yourself! Why do you want light mode? 🧐</h3>
              <textarea
                rows={4}
                className={`w-full mt-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'}`}
                placeholder="Tell me your reasons..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <motion.button
                  onClick={() => setShowExplanation(false)}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmitExplanation}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer below fixed header */}
      <div className="h-16"></div>
    </>
  );
}

export default Header;