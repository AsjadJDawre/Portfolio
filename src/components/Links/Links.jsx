import React, { useState } from 'react';

function Links({ darkMode = true ,isMobilePopup = false}) {
  const [activeIcon, setActiveIcon] = useState(null);

  const iconStyles = darkMode ? [
  { name: 'GitHub', color: 'text-gray-300 hover:text-white', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
  { name: 'LinkedIn', color: 'text-blue-400 hover:text-blue-300', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]' },
  { name: 'Twitter', color: 'text-sky-400 hover:text-sky-300', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.6)]' },
  { name: 'Email', color: 'text-red-400 hover:text-red-300', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.6)]' }
] : [
  { name: 'GitHub', color: 'text-gray-700 hover:text-black', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]' },
  { name: 'LinkedIn', color: 'text-blue-600 hover:text-blue-800', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.3)]' },
  { name: 'Twitter', color: 'text-sky-500 hover:text-sky-700', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.3)]' },
  { name: 'Email', color: 'text-red-500 hover:text-red-700', hoverGlow: 'hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.3)]' }
];


  return (
    <div className="z-50 w-full">
      <div className="relative mx-auto w-full sm:max-w-2xl">
<div className={`
  ${darkMode ? 'bg-black/60 border-gray-700' : 'bg-white/80 border-gray-300'}
    backdrop-blur-md border shadow-md
  px-4 pt-[-5] pb-2
  mx-auto w-[90%] sm:w-[400px]
  rounded-full flex justify-center
  transition-all duration-300
`}>
          {/* Responsive direction using flex-col for small and flex-row for md+ */}
         <ul className={`flex relative p-0 ${darkMode ? 'bg-gray-900' : 'bg-white/45'} top-1 rounded-md justify-center items-center gap-4 p-2 
  ${!isMobilePopup ? 'flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4' : 'flex-row space-x-4'}`}>

            {[
              {
                name: 'GitHub',
                href: 'https://github.com/AsjadJDawre/',
                icon: (
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.385.6.11.793-.26.793-.577v-2.254c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.832 2.809 1.303 3.495.997.107-.775.418-1.304.762-1.603-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.522.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.042.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.654.243 2.873.12 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.103.823 2.222v3.293c0 .32.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.628-5.372-12-12-12z" />
</svg>

                )
              },
              {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/in/asjad-johar',
                icon: (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />                  </svg>
                )
              },
              {
                name: 'Twitter',
                href: 'https://x.com/Asjad_00',
                icon: (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path       fill={darkMode ? '#38BDF8' : '#000000'} // sky-400 in dark, black in light
 d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />                  </svg>
                )
              },
              // {
              //   name: 'Email',
              //   href: "mailto:dawreasjad72@gmail.com",
              //   icon: (
              //     <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              //     <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              //     </svg>
              //   )
              // }
            ].map((item, index) => (
              <li key={index} className="relative">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveIcon(index)}
                  onMouseLeave={() => setActiveIcon(null)}
                  className="block p-1 group"
                >
                  <div className={`
                    relative z-10 p-2 rounded-full 
                    ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}
                    border transition-all duration-200
                    ${activeIcon === index ? 'scale-110' : 'scale-100'}
                    ${iconStyles[index].hoverGlow}
                  `}>
                    <div className={`transition-all duration-300 ${iconStyles[index].color}`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className={`
                    absolute -bottom-7 left-1/2 transform -translate-x-1/2
                    text-white text-xs font-medium bg-black/80 px-2 py-0.5 rounded
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    whitespace-nowrap text-[0.7rem]
                  `}>
                    {item.name}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Links;
