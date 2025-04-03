import React from "react";
import { cafeData } from "../lib/constant";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";

const MainContent = () => {
  return (
    <div className="font-nunito">
      <motion.h1
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 1 }}
        className="flex text-3xl font-bold pl-4 pt-2"
      >
        Coffee shop
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 1 }}
        className="flex text-sm pl-4 pt-2"
      >
        Một ngày đẹp trời ngồi cafe cùng người thương ❤️
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4 w-full">
        {cafeData.map((cafe) => (
          <motion.div
            key={cafe.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.95 }} // Hiệu ứng thu nhỏ khi click
            className="w-full h-96 rounded-xl flex flex-col shadow-md transition-all duration-300 transform hover:scale-102 hover:shadow-2xl cursor-pointer"
          >
            <Card className="h-full flex flex-col ">
              <img
                src={cafe.image}
                alt={cafe.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold">{cafe.name}</h2>
                <p className="text-gray-600">{cafe.address}</p>
                <div className="flex justify-between mt-2">
                  <span className="cursor-pointer flex items-center gap-1">
                    ❤️ {cafe.likes}
                  </span>
                  <span className="cursor-pointer flex items-center gap-1">
                    👎 {cafe.dislikes}
                  </span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Badge
                    variant="outline"
                    className="border-orange-400 text-orange-400 transition-all duration-300 hover:bg-orange-400 hover:text-white"
                  >
                    {cafe.category}
                  </Badge>
                  <span className="text-gray-600">{cafe.time}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
