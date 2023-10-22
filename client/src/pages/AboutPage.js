import React from 'react';


const AboutPage = () => {

  const workExperience = [
    {
      title: "Freelance UI Designer",
      location: "Indonesia",
      description:
        "I worked as a UI Designer using Figma and Adobe Photoshop for 13 months. I also learned and upskilled to become a full-stack programmer because I wanted to switch my career",
      date: "2021-2022",
    },
    {
      title: "Study Independent Dicoding Indonesia Full Stack Mobile Developer",
      location: "Bandung, Indonesia",
      description:
        "I learned  as a front-end developer using Flutter and back-end using Node.js and PostgreSQL for 6 months. I also up skilled to become a full-stack developer.",
      date: "February - August 2022",
    },
    {
      title: "Part-Time Mobile Flutter Developer",
      location: "Makassar, Indonesia",
      description:
        "I worked as a front-end developer using Flutter for 6 months. I also up skilled to become a full-stack developer.",
      date: "February - August 2022",
    },
    {
      title: "Flutter Developer Intern at Gringgo.co",
      location: "Denpasar, Indonesia",
      description:
        "I worked as a front-end Flutter developer for 3 months. I also up skilled to become a full-stack developer.",
      date: "December 2022 - March 2023",
    },
    {
      title: "Full-Stack Developer at Code.ID",
      location: "Jakarta Barat, Indonesia",
      description:
        "I'm now a full-stack developer working as a full-time job. My stack includes Flutter, React, Express, JavaScript, PostgreSQL and Sequelize",
      date: "July 2023 - present",
    },
  ];

  return (
    <>
      <div className='about-box'>

        <div>
          <div className='image'>
            <img src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='me' />
          </div>
          <h1>Gde Swiyasa</h1>
          <p>
            After graduating with a degree in Informatics Engineering, I decided
            to pursue my passion for programming. I enrolled in a coding bootcamp
            and course and learned full-stack development. My favorite part of programming is the
            problem-solving aspect. I love the feeling of finally figuring out a
            solution to a problem. My core stack is Flutter and Firebase.
          </p>
          <a href="/CV.pdf" download>Download CV</a>
        </div>

        <div className='work-experience'>
          <h2>Work Experience</h2>
          {workExperience.map((experience, index) => (
            <div key={index} className='experience'>
              <h3>{experience.title}</h3>
              <p>{experience.location}</p>
              <p>{experience.description}</p>
              <p>{experience.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
