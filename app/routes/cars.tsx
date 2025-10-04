import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import img from "../img/imagescar.png";
import merc from "../img/mercedes-benz.svg";

const allCars = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  imageUrl: img,
  title: "Aveo Hatchback 1.4 Turbo Ls Sports",
  brandLogoUrl: merc,
  brandName: "Mercedes-Benz",
  color: "Black",
  modelDetails: "Chevrolet Aveo Hatchback 1.4 Turbo Ls Sports",
  year: 2015,
  mileage: "113,415km",
  fuelType: "Gasoline",
  transmission: "Automatic",
  vin: "KLATA48BDFB075560",
  price: "5,263€",
}));

export default function CarsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const brand = query.get("brand") || "All";
  const model = query.get("model") || "All";
  const fuel = query.get("fuel") || "All";
  const yearMin = query.get("yearMin") || "";
  const yearMax = query.get("yearMax") || "";
  const mileageMin = query.get("mileageMin") || "";
  const mileageMax = query.get("mileageMax") || "";
  const price = query.get("price") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = allCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(allCars.length / carsPerPage);

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
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
    );
}

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <section className="px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
          Browse Our Selection
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Browse our selection of premium vehicles. Filter by brand, model, and
          specifications to find your ideal car.
        </p>
      </section>

      <main className="flex-1 px-4 sm:px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden shadow-md 
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <img
                src={car.imageUrl}
                alt={car.title}
                className="w-full h-40 sm:h-48 md:h-52 object-cover"
              />

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base sm:text-lg font-semibold text-white truncate max-w-[80%]">
                      {car.title}
                    </h2>
                    <img
                      src={car.brandLogoUrl}
                      alt={car.brandName}
                      className="w-6 h-6 sm:w-7 sm:h-7"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 mb-2">
                    {car.brandName}
                  </p>

                  <div className="text-xs sm:text-sm text-gray-300 grid grid-cols-2 gap-x-3 gap-y-1">
                    <span>{car.year}</span>
                    <span>{car.mileage}</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
                    VIN: {car.vin}
                  </p>
                </div>

                <p className="text-base sm:text-lg font-bold text-blue-400 mt-3">
                  {car.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 flex-wrap mt-10">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition disabled:opacity-50 text-sm sm:text-base"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              } transition`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition disabled:opacity-50 text-sm sm:text-base"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
