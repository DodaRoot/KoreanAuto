import { motion } from "framer-motion";
import Navbar from "~/components/Navbar";

// Personat
const dealers = [
  {
    name: "Rnes Bislimi - Baza Kryesore",
    location: "Baza Kryesore",
    phone: "+383 46 577 577",
  },
  {
    name: "Rrezon Zeneli - Prishtine",
    location: "Prishtine",
    phone: "+383 46 577 578",
  },
  {
    name: "Talat Selimi - Ferizaj",
    location: "Ferizaj",
    phone: "+383 46 577 579",
  },
  {
    name: "Dionit Kryeziu - Malisheve",
    location: "Malisheve",
    phone: "+383 46 577 576",
  },
  {
    name: "Denis Zejnullahu - Dega Lipjan",
    location: "Dega Lipjan",
    phone: "+383 46 577 575",
  },
];

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>

);

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />

      <section className="w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 bg-gray-900 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white/90 drop-shadow-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Korean Auto Excellence
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          At Korean Auto Excellence, we combine cutting-edge technology, safety, and efficiency to deliver vehicles that redefine the driving experience.
        </motion.p>
      </section>

      <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-12 py-32 bg-gray-900">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white/90 mb-12 text-center drop-shadow-md">
          Our Dealers
        </h2>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {dealers.map((dealer, index) => (
            <motion.div
              key={dealer.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 120 }}
              className="flex flex-col items-start bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white/90">{dealer.name}</h3>
              <div className="flex items-center mb-2 text-gray-300">
                <LocationIcon />
                <span>{dealer.location}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon />
                <span>{dealer.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
