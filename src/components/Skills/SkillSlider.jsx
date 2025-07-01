import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';

const skills = [
  {
    id: 1,
    title: 'ReactJS',
    description: 'A powerful frontend library for building UI components and single-page apps efficiently and scalably.',
    logo: '/images/React-icon.svg',
  },
  {
    id: 2,
    title: 'NodeJS',
    description: 'JavaScript runtime built on Chrome’s V8 engine for backend development.',
    logo: '/images/nodejs.svg',
  },
  
  {
    id: 4,
    title: 'Express Js',
    description: 'A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.',
    logo: '/images/express-js-logo.svg',
  },
  {
    id: 3,
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapidly building custom designs with consistent responsiveness.',
    logo: '/images/tailwind-css.svg',
  },
  {
    id: 5,
    title: 'SQL-Database',
    description: 'Structured Query Language (SQL) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS).',
    logo: '/images/sql-logo.png',
  },

  {
    id: 6,
    title: 'MongoDB',
    description: 'Document-oriented NoSQL database used for high-volume flexible schema data storage.',
    logo: '/images/mongodb-logo.svg',
  },
  {
    id: 7,
    title: 'NEXT JS',
    description: 'A React framework for server-side rendering and static site generation.',
    logo: '/images/Next-logo.png',
  },
  {
    id: 7,
    title: 'Python',
    description: 'A programming language that lets you work quickly and integrate systems more effectively.',
    logo: '/images/python-logo-only.svg',
  },
  {
    id: 8,
    title: 'Javascript',
    description: 'A programming language that allows you to add interactivity and dynamic behavior to web pages.',
    logo: '/images/python-logo-only.svg',
  },
];

const SkillCarousel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="flex justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1788A7] border-2 border-gray-300 px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          My Skills
        </h2>
      </div>
      <br />
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={20}
        loop={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        grabCursor={true}
      >
        {skills.map((skill) => (
          <SwiperSlide key={skill.id} style={{ width: '260px' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-2xl border border-gray-100 h-[320px]"
            >
              <div>
                <img
                  src={skill.logo}
                  alt={skill.title}
                  className="w-16 h-16 object-contain mb-4 mx-auto"
                  zoom="1.5"
                />
                <h3 className="text-lg font-bold text-indigo-600 mb-2">{skill.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{skill.description}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkillCarousel;
