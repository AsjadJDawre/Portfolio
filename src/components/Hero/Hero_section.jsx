import { Suspense,lazy } from 'react';
import React, { useState,useEffect } from 'react';
import Name_Logo from '../Name_logo/Name_Logo';
import '../../Hero_section.css'
import AboutMe from '../AboutMe/AboutME'
  const MatterAnimation= lazy(() => import ('../../MatterAnimation.jsx'));

function Hero_section({onButtonClick,onButtonClick2,showAboutMe}) {
 
  const [changeZIndex, setChangeZIndex] = useState(false);
  useEffect(() => {
    if (onButtonClick2) {
      setChangeZIndex(true); // Set z-index change when onButtonClick2 is triggered
    }
  }, [onButtonClick2]);
  return (
    <>  
        {/* <div className="App">
      <MatterCanvas />
    </div> */}
    
    <section className='relative h-screen flex items-center -mt-24  '  
        style={{ zIndex: showAboutMe ? -5 : 10 }}  // Change z-index based on showAboutMe
      >     

<div className="absolute inset-0" style={{ zIndex: -1 }}>
  <Suspense fallback={null}>

          <MatterAnimation />
  </Suspense>
        </div>

        <div className=' max-w-screen-xl  mx-auto w-full font-["Nunito"]'>
          
        <Name_Logo />
        <div className="text-div relative ml-24 mt-6 sm:-mt-12 md:mt-[0.25rem] lg:mt-1">
  <h1 className='text-[36px] sm:text-[48px] md:text-[64px] font-["Spartan"]'>
    Asjad Dawre
  </h1>
  <p className='font-["Merriweather"] italic mb-6 sm:mb-8 md:mb-10'>
    FULL Stack Developer
  </p>
  <button onClick={onButtonClick2} className='bg-[#4595eb] animate-pulse font-extrabold  hover:scale-110 ease-in-out duration-100  group relative bg-gradient-to-r from-[#1595b6] to-[#1f2667e6] py-2 px-5 rounded font-["Spartan"]'>
    About Me 
    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:cc="http://creativecommons.org/ns#" 
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" 
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" 
  version="1.1" 
  x="0px" 
  y="0px" 
  width="44"  
  className="absolute"  
  height="44" 
  viewBox="0 0 100 100"
class="absolute top-1/2 -translate-y-1/2 -right-6 group-hover:-right-9  ease-in-out duration-100"
>
  <g transform="translate(0,-952.36218)">
    <path 
      d="m 88.999835,1002.3621 c 0,-0.4628 -0.2799,-1.0773 -0.5639,-1.3755 l -15.9997,-17.00026 c -0.747,-0.7723 -1.9572,-0.8618 -2.8281,-0.078 -0.7786,0.7007 -0.798,2.0673 -0.078,2.8282 l 12.8435,13.62516 -69.37347,0 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2.0001 2,2.0001 l 69.37347,0 -12.8435,13.6252 c -0.7199,0.7608 -0.6688,2.0938 0.078,2.8281 0.7885,0.7752 2.0925,0.7062 2.8281,-0.078 l 15.9997,-17.0002 c 0.4701,-0.4611 0.556,-0.9052 0.5639,-1.3748 z" 
      fill="#fff" 
      fillOpacity="1" 
      stroke="white" 
      strokeWidth="2"  
      marker="none" 
      visibility="visible" 
      display="inline" 
      overflow="visible"
    />
  </g>
</svg>

    </button>

</div>


            
        </div>

      <ul className='absolute right-0 text-[#b0b2c3]  transform -translate-y-1/2 flex flex-col space-y-6 p-4 top-72'>
        <li>
          <a href="https://github.com/AsjadJDawre/" target="_blank" rel="noopener noreferrer">
            <svg className='w-7  hover:text-white h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/asjad-johar' target='_blank' rel='noopener noreferrer'>
            <svg className='w-7  hover:text-white h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://x.com/Asjad_00" target="_blank" rel='noopener noreferrer'>
            <svg className='w-7  hover:text-white h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
        </li>
        <li>
          <a href="mailto:dawreasjad72@gmail.com" target="_blank" rel='noopener noreferrer'>
            <svg className='w-7  hover:text-white h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zm0 368c-8.8 0-16-7.2-16-16V232l199.7 149.8c20.6 15.5 51.5 15.5 72.1 0L512 232v232c0 8.8-7.2 16-16 16H64z" />
            </svg>
          </a>
        </li>
      </ul>
      <div className='flex-1 text-center'>

      </div>
      <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
  <button className='bg-[#4595eb] animate-slideUp font-extrabold scroll-button mb-4 hover:scale-110 ease-in-out duration-100 group relative bg-gradient-to-r from-[#1595b6] to-[#1f2667e6] py-2 px-5 rounded font-["Spartan"] whitespace-nowrap' onClick={onButtonClick}>
    Latest Works
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      version="1.1" 
      x="0px" 
      y="0px" 
      width="44"  
      height="44" 
      viewBox="0 0 100 100"
      className="absolute left-1/2 transform -translate-x-1/2 top-10 group-hover:top-14 rotate-90 ease-in-out duration-800"
    >
      <g transform="translate(0,-952.36218)">
        <path 
          d="m 88.999835,1002.3621 c 0,-0.4628 -0.2799,-1.0773 -0.5639,-1.3755 l -15.9997,-17.00026 c -0.747,-0.7723 -1.9572,-0.8618 -2.8281,-0.078 -0.7786,0.7007 -0.798,2.0673 -0.078,2.8282 l 12.8435,13.62516 -69.37347,0 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2.0001 2,2.0001 l 69.37347,0 -12.8435,13.6252 c -0.7199,0.7608 -0.6688,2.0938 0.078,2.8281 0.7885,0.7752 2.0925,0.7062 2.8281,-0.078 l 15.9997,-17.0002 c 0.4701,-0.4611 0.556,-0.9052 0.5639,-1.3748 z" 
          fill="#fff" 
          stroke="white" 
          strokeWidth="2"  
        />
      </g>
    </svg>
    <span className='absolute w-[3px] h-5 bg-[#444] top-[calc(100%+65px)] left-1/2 transform -translate-x-1/2'></span>
  </button>
</div>


    
    </section>

 
    </>

  );
}

export default Hero_section;