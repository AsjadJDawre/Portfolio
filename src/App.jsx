import { useRef, useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero_section from './components/Hero/Hero_section';
import Project_show from './components/Project/Project_show';
import ResumeSection from './components/Resume/Resume';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './Footer/Footer';
import AboutMe from './components/AboutMe/AboutME';

import { ThemeProvider } from './components/Theme/ThemeContext';// import Test from './components/AboutMe/test';

function App() {
  const contactRef = useRef(null);
  const contactRef2 = useRef(null);
const [showAboutMe, setShowAboutMe] = useState(false)
  const handleBtnClick = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const renderAboutMe = () => {
    setShowAboutMe(true)
  }

const closebtn=()=>{
  setShowAboutMe(false)
}

const handleBtnClick2 = () => {
  if (contactRef2.current) {
    contactRef2.current.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <>
   <ThemeProvider>

      <div className='text-white '>
        <Header  onButtonClick3={handleBtnClick2}/>
        {showAboutMe &&(<AboutMe closebtn={closebtn}/>)}
        
  {/* <div className="matter_js w-96 h-96">
    <MatterAnimation />
  </div> */}
        <Hero_section onButtonClick2={renderAboutMe}  onButtonClick={handleBtnClick} showAboutMe={showAboutMe}/>

        <Project_show ref={contactRef}/>
      </div>
      <ResumeSection/>
      <ContactSection ref={contactRef2} />
      <Footer/>
        </ThemeProvider>

    </>
  );
}

export default App;
