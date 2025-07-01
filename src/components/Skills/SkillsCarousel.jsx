import { useEffect, useRef } from 'react';

const SkillsCarousel = () => {
  const skills = [
    {
      id: 1,
      title: 'ReactJS',
      description: 'Building dynamic SPAs with hooks, context API, and performance optimization.',
      icon: '/images/React-icon.svg',
      invert: true,
      glow: 'sky',
      colorClass: 'text-sky-400',
      bgClass: 'bg-sky-900/30',
      ringClass: 'ring-sky-500/30'
    },
    {
      id: 2,
      title: 'NodeJS',
      description: 'Creating scalable backend services with Express, Websockets, and REST APIs.',
      icon: '/images/nodejs.svg',
      invert: true,
      glow: 'emerald',
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-900/30',
      ringClass: 'ring-emerald-500/30'
    },
    {
      id: 3,
      title: 'SQL',
      description: 'Designing normalized databases with complex queries and transactions.',
      icon: '/images/sql-logo.png',
      invert: false,
      scale: 1.3,
      glow: 'blue',
      colorClass: 'text-blue-400',
      bgClass: 'bg-blue-500',
      ringClass: 'ring-blue-500'
    },
    {
      id: 4,
      title: 'Express Js',
      description: 'Minimal and flexible Node.js web application framework.',
      icon: '/images/express-js-logo.png',
      invert: false,
     glow: 'light',
    colorClass: 'text-gray-200', // Soft white text
    bgClass: 'bg-gray-200',  // Dark grey background
    ringClass: 'ring-gray-400/30' // Light grey ring

    },
    {
      id: 5,
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid custom designs.',
      icon: '/images/tailwind-css.svg',
      invert: true,
      scale: 1.7,
      glow: 'cyan',
      colorClass: 'text-cyan-400',
      bgClass: 'bg-cyan-900/30',
      ringClass: 'ring-cyan-500/30'
    },
    {
      id: 6,
      title: 'MongoDB',
      description: 'Document-oriented NoSQL database for flexible data storage.',
      icon: '/images/mongodb-logo.svg',
      invert: true,
      glow: 'teal',
      colorClass: 'text-teal-400',
      bgClass: 'bg-teal-900/30',
      ringClass: 'ring-teal-500/30'
    },
    {
      id: 7,
      title: 'NEXT JS',
      description: 'React framework for server-side rendering and static sites.',
      icon: '/images/Next-logo.png',
      invert: false,
      scale: 1.5,
      glow: 'violet',
      colorClass: 'text-violet-400',
      bgClass: 'bg-violet-900/30',
      ringClass: 'ring-violet-500/30'
    },
    {
      id: 8,
      title: 'Python',
      description: 'Versatile programming language for system integration.',
      icon: '/images/python-logo-only.svg',
      invert: false,
      scale: 1.2,
      glow: 'amber',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-900/30',
      ringClass: 'ring-amber-500/30'
    },
    {
      id: 9,
      title: 'Javascript',
      description: 'Programming language for web interactivity.',
      icon: '/images/javascript-1.svg',
      invert: false,
      glow: 'yellow',
      colorClass: 'text-yellow-400',
      bgClass: 'bg-yellow-900/30',
      ringClass: 'ring-yellow-500/30'
    }
  ];

  // Duplicate for seamless looping
  const duplicatedSkills = [...skills, ...skills];
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollSpeed = 1.2; // Adjust scrolling speed
    
    const animate = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += scrollSpeed;
        
        if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="relative py-16 bg-[#111] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Tech Stack
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Technologies I wield to build exceptional digital experiences
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef} 
        className="flex overflow-x-hidden py-4 scrollbar-hide"
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill.id}-${index}`}
            className="flex-shrink-0 px-4 w-72 group"
          >
            <div className={`h-full p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-900/50 backdrop-blur-sm
              shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                skill.glow === 'sky' ? 'hover:shadow-sky-500/30' :
                skill.glow === 'emerald' ? 'hover:shadow-emerald-500/30' :
                skill.glow === 'indigo' ? 'hover:shadow-indigo-500/30' :
                skill.glow === 'lime' ? 'hover:shadow-lime-500/30' :
                skill.glow === 'cyan' ? 'hover:shadow-cyan-500/30' :
                skill.glow === 'teal' ? 'hover:shadow-teal-500/30' :
                skill.glow === 'violet' ? 'hover:shadow-violet-500/30' :
                skill.glow === 'amber' ? 'hover:shadow-amber-500/30' :
                skill.glow === 'light' ? 'hover:shadow-gray-300/20' :
                'hover:shadow-yellow-500/30'
              }`}
            >
              {/* Skill Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center p-3 transition-all 
                ${skill.bgClass} ${skill.ringClass} group-hover:scale-110`}>
                <img
                  src={skill.icon}
                  alt={skill.title}
                  className={`object-contain ${skill.invert ? 'filter brightness-0 invert' : ''}`}
                  style={{ transform: skill.scale ? `scale(${skill.scale})` : 'none' }}
                />
              </div>

              {/* Skill Title */}
              <h3 className={`${skill.colorClass} text-xl font-semibold text-center mb-3 group-hover:text-white transition-colors`}>
                {skill.title}
              </h3>

              {/* Skill Description */}
              <p className="text-gray-400 text-sm text-center line-clamp-3 group-hover:text-gray-300 transition-colors">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#111] via-[#111]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#111] via-[#111]/90 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default SkillsCarousel;