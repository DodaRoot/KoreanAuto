import type { Route } from "./+types/home";
import FilterForm from "../components/MainFilter";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const categories = [
  { name: "Performance", text: "Experience unmatched driving dynamics, efficiency, and power engineered for excellence." },
  { name: "Security", text: "Our vehicles prioritize your safety with advanced features and rigorous testing." },
  { name: "Price", text: "Competitive pricing ensures you get the best value without compromising quality." },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      <Spline
        scene="https://prod.spline.design/h5sB0kCQG5TLZBWD/scene.splinecode"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        onLoad={() => setLoading(false)}
      />

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-sm">
          <p className="mt-6 text-white text-lg md:text-xl font-semibold animate-pulse">
            Loading, please wait...
          </p>
          <div className="flex space-x-2 mt-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-225"></span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="fixed w-full bg-gradient-to-r from-blue-900/70 via-indigo-800/60 to-purple-900/70 backdrop-blur-md top-0 z-20">
            <Navbar />
          </div>

          <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-20">
            <motion.div
              className="w-full max-w-2xl flex flex-col items-center mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-lg leading-snug">
                Korean Auto Excellence <br /> in Security, Price & Performance
              </h1>
              <motion.p
                className="text-sm sm:text-base md:text-lg text-white mt-2 drop-shadow-md"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Drive the future with confidence
              </motion.p>
            </motion.div>

            <div className="w-full max-w-2xl">
              <FilterForm />
            </div>
          </section>

          <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-12 mt-32 md:mt-48 mb-62">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 justify-center items-stretch">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 120 }}
                  className="flex-1 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 
                            shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 
                            cursor-pointer flex flex-col items-center"
                >
                  <div className="mb-4 w-12 h-12 sm:w-16 sm:h-16 text-white/80">
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    )}
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-4 text-center drop-shadow-sm">
                    {category.name}
                  </h3>

                  <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center leading-relaxed">
                    {category.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <footer className="fixed bottom-0 left-0 w-full bg-gray-900/80 backdrop-blur-md text-gray-300 py-3 sm:py-4 flex flex-col items-center text-center">
            <p className="text-xs sm:text-sm text-gray-400">&copy; {new Date().getFullYear()} Korean Auto Excellence. All rights reserved.</p>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-500">Designed with passion for security, price & performance.</p>
          </footer>
        </div>
      )}
    </div>
  );
}
