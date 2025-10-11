import React from 'react'
import Nav from '../components/Nav'

const team = [
  {
    name: "ATHARV BHAWSAR",
    role: "Frontend Developer",
    img: "https://via.placeholder.com/300x400?text=Anna",
    color: "bg-pink-300",
    linkedin: "https://www.linkedin.com/in/atharv-bhawsar",
  },
  {
    name: "PIYUSH BHAWSAR",
    role: "Full Stack Developer",
    img: "https://res.cloudinary.com/dkhbhumqj/image/upload/v1760019678/piyush1_hssaza.jpg",
    color: "bg-gray-200",
    linkedin: "https://www.linkedin.com/in/piyush-bhawsar",
  },
   {
    name: "SANSKRITI DUBEY",
    role: "Data Analyst",
    img: "https://via.placeholder.com/300x400?text=Leslie",
    color: "bg-neutral-200",
    linkedin: "https://www.linkedin.com/in/sanskriti-dubey",
  },
  {
    name: "NITI JAIN",
    role: "Full Stack Developer",
    img: "https://via.placeholder.com/300x400?text=Jim",
    color: "bg-purple-300",
    linkedin: "https://www.linkedin.com/in/niti-jain",
  },
];

function Developers() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mt-10 mb-14 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wide whitespace-nowrap">
          Meet Developers
        </h1>

        <div className="flex flex-wrap gap-8 justify-center">
          {team.map((member, index) => (
            <div
              key={index}
              className={`relative ${member.color} rounded-full overflow-hidden w-48 sm:w-56 h-[430px] flex flex-col justify-end text-center shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <img
                src={member.img}
                 alt={member.name}
                className="absolute bottom-0 left-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="relative z-10 p-6 text-white flex flex-col items-center">
                <h3 className="font-bold text-sm tracking-wide">{member.name}</h3>
                <p className="text-xs opacity-90 mb-2">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-blue-700"
                     >
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.94 17.5V10.5H6.16V17.5H8.94M7.55 9.45A1.34 1.34 0 1 0 7.55 6.77A1.34 1.34 0 0 0 7.55 9.45M18 17.5V13.24C18 11.24 16.98 10.5 15.64 10.5C14.62 10.5 14.04 11.12 13.78 11.56V10.5H11V17.5H13.78V13.9C13.78 13.3 14.06 12.76 14.84 12.76C15.6 12.76 15.68 13.34 15.68 13.96V17.5H18Z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Developers