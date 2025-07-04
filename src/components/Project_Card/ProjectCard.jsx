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
  darkMode
}) => {
  // Determine if special margin is needed
  const specialImages = ['AcademiaSuite', 'volunteer-hub', 'TodoNest'];
  const needsMargin = specialImages.some(name => 
    imageSrc.includes(name) || 
    imageAlt.includes(name) || 
    title.includes(name)
  );

  // Theme-specific styles
const cardBg = darkMode ? 'bg-gray-800' : 'bg-amber-50';
const cardBorder = darkMode ? 'border-gray-700' : 'border-amber-200';
const textPrimary = darkMode ? 'text-gray-100' : 'text-gray-800';
const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
const textTertiary = darkMode ? 'text-gray-400' : 'text-gray-500';
const overlayBg = darkMode ? 'from-black/70' : 'from-black/60';

  return (
    <div className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 my-16 lg:my-24 items-center group`}>
      {/* Timeline Elements */}
      <div className={`absolute hidden lg:block ${index % 2 === 0 ? 'left-1/2' : 'right-1/2'} top-0 bottom-0 w-1 z-0`}
        style={{
          background: `linear-gradient(to bottom, ${themeColor}, ${themeAccentColor})`,
          transform: index % 2 === 0 ? 'translateX(-50%)' : 'translateX(50%)',
        }}>
      </div>
      
      {/* Project Node */}
      <div className={`absolute hidden lg:block ${index % 2 === 0 ? 'left-1/2' : 'right-1/2'} top-1/2 transform -translate-y-1/2 z-10`}
        style={{
          transform: index % 2 === 0 ? 'translateX(-50%) translateY(-50%)' : 'translateX(50%) translateY(-50%)'
        }}>
        <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border-4 animate-pulse`} 
             style={{ borderColor: themeColor }}>
        </div>
      </div>

      {/* Image Section */}
      <div className={`w-full lg:w-1/2 relative ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
          <div className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${darkMode ? 'ring-1 ring-gray-700' : ''}`}>
            <img
              className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${needsMargin ? 'pt-4' : ''}`}
              src={imageSrc}
              alt={imageAlt}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${overlayBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6`}>
              <div>
                <h3 className="text-white text-xl font-bold">{title}</h3>
                <p className="text-white/90 text-sm mt-1">{subtitle}</p>
                <div className="flex mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                    View Project
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Content Section */}
      <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <div className={`${cardBg} p-6 rounded-xl shadow-lg border ${cardBorder} transition-colors duration-300`}>
          <div className="flex items-center mb-2">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: themeColor }}></span>
            <span className={`text-sm font-medium ${textTertiary}`}>PROJECT {index + 1}</span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${textPrimary}`} style={{ color: themeColor }}>
            {title}
          </h3>
          <h4 className={`text-lg md:text-xl mb-4 ${textSecondary}`}>
            {subtitle}
          </h4>
          <p className={`${textSecondary} mb-4 leading-relaxed`}>
            {description}
          </p>
          
          <div className="mt-6">
            <h5 className={`text-sm font-semibold ${textTertiary} mb-2`}>TECH STACK</h5>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: darkMode 
                      ? `${themeColor}20` 
                      : `${themeColor}10`,
                    color: darkMode 
                      ? `${themeAccentColor}` 
                      : `${themeColor}`,
                    border: `1px solid ${darkMode 
                      ? `${themeColor}40` 
                      : `${themeColor}30`}`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center mt-6 px-4 py-2 rounded-md font-medium transition-colors hover:shadow-md"
            style={{
              backgroundColor: themeColor,
              color: 'white',
            }}
          >
            View Project
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;