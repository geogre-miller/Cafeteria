import React, { useEffect, useState } from "react";
import getPlaces from "../api";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Define interface for Place objects
interface Place {
  _id: string;
  name: string;
  address: string;
  category: string;
  image?: string;
  likes?: number;
  dislikes?: number;
  time?: string;
}

const Home = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const data = await getPlaces();
        // Make sure data is an array before setting it
        if (Array.isArray(data)) {
          setPlaces(data);
        } else {
          setError("Invalid data format received");
        }
      } catch (err) {
        setError("Failed to fetch places");
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row pt-2">
        <Sidebar />
        <div className="font-nunito">
          <motion.h1
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 10 }}
            transition={{ duration: 1 }}
            className="flex text-3xl font-bold pl-4 pt-2"
          >
            Coffee Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 10 }}
            transition={{ duration: 1 }}
            className="flex text-sm pl-4 pt-2"
          >
            Một ngày đẹp trời, ngồi cafe cùng người mình thương. ❤️
          </motion.p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p>Loading places...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Places Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4 w-full">
              {places.map((place) => (
                <motion.div
                  key={place._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-96 rounded-xl flex flex-col shadow-md transition-all duration-300 transform hover:scale-102 hover:shadow-2xl cursor-pointer"
                >
                  <Card className="h-full flex flex-col">
                    <img
                      src={
                        place.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG"
                      }
                      alt={place.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="flex flex-col flex-grow px-4">
                      <h2 className="text-lg font-semibold">{place.name}</h2>
                      <p className="text-gray-600">{place.address}</p>
                      <div className="flex justify-between mt-2">
                        <span className="cursor-pointer flex items-center gap-1">
                          ❤️ {place.likes || 0}
                        </span>
                        <span className="cursor-pointer flex items-center gap-1">
                          👎 {place.dislikes || 0}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Badge
                          variant="outline"
                          className="border-orange-400 text-orange-400 transition-all duration-300 hover:bg-orange-400 hover:text-white"
                        >
                          {place.category}
                        </Badge>
                        <span className="text-gray-600">
                          {place.time || "Open"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
