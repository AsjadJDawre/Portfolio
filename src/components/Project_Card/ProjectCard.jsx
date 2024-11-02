import React from 'react';

const ProjectCard = ({
  index,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  link,
  tags = [],
  themeColor,
  themeAccentColor,
}) => {
  // Determine layout class based on the index
  const layoutClass = index % 2 === 0 ? 'layout-even' : 'layout-odd';

  return (
    <div className={`relative flex flex-col ${layoutClass === 'layout-even' ? 'sm:flex-row' : 'sm:flex-row-reverse'} gap-4 mt-12 sm:gap-[80px] items-center sm:mt-20 px-4 sm:px-8`}>
      {/* Horizontal Line from Image */}
      <div
        className={`absolute ${layoutClass === 'layout-even' ? 'left-1/2' : 'right-1/2'} top-1/2 transform -translate-y-1/2 h-[1px] z-0`}
        style={{
          backgroundColor: themeAccentColor,  // Use inline style for dynamic background color
          width: 'calc(35% - 3rem)',
          left: layoutClass === 'layout-even' ? 'calc(50% - 3rem)' : 'auto',
          right: layoutClass === 'layout-even' ? 'auto' : 'calc(50% - 3rem)',
          transform: layoutClass === 'layout-even' ? 'translateX(-88%)' : 'translateX(88%)'
        }}
      ></div>

      {/* Separator Dot */}
      <div
        className={`absolute ${layoutClass === 'layout-even' ? 'left-1/2' : 'right-1/2'} top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#111] z-10 hover:scale-110 ease-in-out duration-100`}
        style={{
          border: `3px solid ${themeColor}`, 
          transform: layoutClass === 'layout-even' ? 'translateX(-50%) translateY(-50%)' : 'translateX(50%) translateY(-50%)'
        }}
      ></div>

      {/* Image Section */}
      <a
        href={link}
        target='_blank'
        className="flex w-full relative justify-center sm:justify-start group"
      >
        <div className={`flex flex-col items-center relative ${layoutClass === 'layout-odd' ? 'ml-[5rem]' : ''}`}>
          <div className="relative w-full max-w-[400px] p-4 group-hover:scale-105 transition-transform duration-200 ease-in-out">
            <img
              className="w-full h-auto drop-shadow-[0_0px_60px_rgba(59,130,246,0.6)]"
              src={imageSrc}
              alt={imageAlt}
            />
            <span
              className="absolute left-1/2 -translate-x-1/2 top-5 px-2 py-1 text-sm sm:text-base rounded text-white opacity-0 group-hover:opacity-100 group-hover:top-16 transition-all duration-300 ease-in-out whitespace-nowrap max-w-max flex items-center gap-1"
              style={{
                backgroundColor: themeColor,  
              }}
            >
              {title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </div>
        </div>
      </a>

      {/* Description Section */}
      <div className={`w-full ${layoutClass === 'layout-even' ? 'order-2 sm:order-1' : 'order-1 sm:order-2'}`}>
        <h3 className="font-bold text-2xl md:text-4xl" style={{ color: themeColor }}>
          {title}
        </h3>
        <span className="text-base md:text-lg" style={{ color: themeColor }}>
          {subtitle}
        </span>
        <p className="text-justify text-sm md:text-base mt-2">{description}</p>
        <ul className="flex flex-wrap gap-2 mt-2">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <li
                key={index}
                className="border rounded-[50px] border-[#999] px-[10px] py-[5px] text-sm md:text-base"
              >
                #{tag}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
