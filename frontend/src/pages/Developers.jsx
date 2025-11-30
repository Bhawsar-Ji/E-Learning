import React from 'react'
import Nav from '../components/Nav'

const team = [
  {
    name: "ATHARV BHAWSAR",
    role: "Frontend Developer",
    img: "https://res.cloudinary.com/dkhbhumqj/image/upload/v1764517029/1000006055_b1robw.png",
    color: "bg-gray-300",
    instagram: "https://www.linkedin.com/in/atharv-bhawsar",
  },
  {
    name: "PIYUSH BHAWSAR",
    role: "Full Stack Developer",
    img: "https://res.cloudinary.com/dkhbhumqj/image/upload/v1760019678/piyush1_hssaza.jpg",
    color: "bg-gray-200",
    linkedin: "https://www.linkedin.com/in/piyushbhawsar89",
  },
  {
    name: "SANSKRITI DUBEY",
    role: "Data Analyst",
    img: "https://res.cloudinary.com/dkhbhumqj/image/upload/v1764516888/1000006063_ttnptg.png",
    color: "bg-green-200",
    linkedin: "https://www.linkedin.com/in/sanskritiz29",
  },
  {
    name: "NITI JAIN",
    role: "Full Stack Developer",
    img: "https://res.cloudinary.com/dkhbhumqj/image/upload/v1764518488/1000006083_hejkdb.png",
    color: "bg-orange-300",
    linkedin: "https://www.linkedin.com/in/niti-jain-6aa337356",
  },
];

function Developers() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl md:text-5xl text-center mt-12 mb-14 tracking-wide whitespace-nowrap">
          Meet the team
        </h1>

        <div className="flex flex-wrap gap-8 justify-center">
          {team.map((member, index) => {
            const socialLink = member.instagram || member.linkedin;
            const isInstagram = Boolean(member.instagram);

            return (
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
                    href={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md hover:scale-110 transition-transform duration-200"
                  >
                    {isInstagram ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-pink-600"
                      >
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm4-3.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 16 5.75z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-700"
                      >
                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.94 17.5V10.5H6.16V17.5H8.94M7.55 9.45A1.34 1.34 0 1 0 7.55 6.77A1.34 1.34 0 0 0 7.55 9.45M18 17.5V13.24C18 11.24 16.98 10.5 15.64 10.5C14.62 10.5 14.04 11.12 13.78 11.56V10.5H11V17.5H13.78V13.9C13.78 13.3 14.06 12.76 14.84 12.76C15.6 12.76 15.68 13.34 15.68 13.96V17.5H18Z" />
                      </svg>
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Developers
