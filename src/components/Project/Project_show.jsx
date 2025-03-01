import React, { forwardRef } from 'react';
import ProjectCard from '../Project_Card/ProjectCard';
import volunteerHubImage from "../../assets/images/volunteer-hub.png";
import eGramPanchayatImage from "../../assets/images/eGramPanchayatImage.png";
import refillBuddyImage from "../../assets/images/refillBuddyImage.png";
import TodoNest from "../../assets/images/TodoNest.png";
import Expensetracker from "../../assets/images/Expensetracker.png";
import AcademiaSuite from "../../assets/images/AcademiaSuite.png";

const Project_show = forwardRef((props, ref) => {
  const projects = [
    {
      title: 'E-Gram Panchayat',
      subtitle: '(Digital Village Administration Solution)',
      description: 'Developed a web-based platform to digitize village administration workflows, allowing users to apply for Birth Certificates, NOCs, and Household Applications. Implemented role-based access control for users, staff, and admins, along with dynamic PDF certificate generation.',
      // important: "use asjaddawre2@gmail.com for administrator login",
      imageSrc: eGramPanchayatImage,
      imageAlt: 'E-Gram Panchayat Digital Solution',
      link: 'https://e-grampanchayat.onrender.com',
      tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express.js', 'pdf-lib'],
      themeColor: '#2E86C1',
      themeAccentColor: '#1A5276'
    },
    
  
    {
      title: 'AcademiaSuite',
      subtitle: '(Desktop Application)',
      description: 'Developing a desktop application using Electron.js and React for efficient management of academic processes. Features include real-time validation and DBF to Excel conversion.',
      imageSrc:   AcademiaSuite, 
      imageAlt: 'AcademiaSuite',
      link: 'https://github.com/AsjadJDawre/AcademiaSuite', 
      tags: ['React', 'Electron', 'JavaScript','MySQL-Lite'],
      themeColor: '#47afa1',
      themeAccentColor: '#1788ae'
    },
    
    {
      title: 'Refill Buddy',
      subtitle: '(Gas Cylinder Refill Management System)',
      description: 'Developed a web application to streamline gas cylinder refill bookings, integrating features such as secure authentication, quota tracking, payment gateway (Razorpay), and admin tools for request approvals and notices. Implemented a user-friendly dashboard for booking history and real-time status tracking.',
      imageSrc: refillBuddyImage,
      imageAlt: 'Refill Buddy - Gas Cylinder Refill Management',
      link: 'https://frontend-rb.onrender.com', 
      tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay'],
      themeColor: '#ff9800',
      themeAccentColor: '#f57c00'
    }
,    
    {
      title: 'Volunteer Hub for NSS',
      subtitle: '(Management Solution)',
      description: 'Developed a comprehensive web solution for managing NSS activities, including event scheduling, volunteer tracking, and reporting. Led a team of three developers, overseeing frontend and backend development.',
      imageSrc:volunteerHubImage,
      imageAlt: 'Volunteer Hub for NSS',
      link: 'https://www.linkedin.com/in/asjad-johar/', 
      tags: ['HTML', 'CSS', 'Tailwind','PHP', 'MySQL'],
      themeColor: '#47afa1',
      themeAccentColor: '#1788ae'
    },
    {
      title: 'Expense Tracker',
      subtitle: '(Finance Management)',
      description: 'A web application for managing finances by tracking income and expenses. Built with React, featuring intuitive interfaces and efficient state management using Context API.',
      imageSrc: Expensetracker, 
      imageAlt: 'Expense Tracker',
      link: 'https://asjadjdawre.github.io/Expense-Tracker/', 
      tags: ['React', 'Context API', 'JavaScript'],
      themeColor: '#47afa1',
      themeAccentColor: '#1788ae'
    },
    {
      title: 'TodoNest',
      subtitle: '(Task Management)',
      description: 'A Todo application built using React and Context API. Features include adding, deleting, and filtering todos, providing a user-friendly interface for efficient task management.',
      imageSrc: TodoNest, 
      imageAlt: 'TodoNest',
      link: 'https://asjadjdawre.github.io/TodoNest/',
      tags: ['React', 'Context API', 'JavaScript'],
      themeColor: '#47afa1',
      themeAccentColor: '#1788ae'
    }
  ];
  

  return (
    <div ref={ref} className="relative">
      {/* Latest Work Header */}
      <h2 className='text-[40px] font-bold w-max mx-auto text-center border-b-2 border-[#1788a7] pb-2 text-[#1788a7] relative z-10'>
        Latest Work
      </h2>
      
      {/* Vertical Line from Latest Work Header */}
      <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[1px] h-[98.1%] bg-[#ccc] z-0"></div>

      {/* Project Cards */}
      <div className="relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} index={index} {...project} />
        ))}
      </div>
    </div>
  
);
})

export default Project_show;
