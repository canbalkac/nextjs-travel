"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const SectionTwo = () => {
  return (
    <div className="bg-orange-100 mt-12">
      <div className="mx-auto container text-center py-16 px-6 lg:px-28">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "WELCOME TO TRENDY TRAVEL",
            2000, // wait 1s before replacing "Mice" with "Hamsters"
            "TRENDY TRAVEL'A HOŞ GELDİNİZ",
            2000,
            "BIENVENUE À TRENDY TRAVEL",
            2000,
            "WILLKOMMEN BEI TRENDY TRAVEL",
            2000,
          ]}
          wrapper="span"
          speed={50}
          className="text-2xl lg:text-4xl font-bold text-blue-600 mb-4"
          repeat={Infinity}
        />
        <div className="flex justify-center items-center mb-6">
          <hr className="border-gray-300 w-1/5" />
          <span className="mx-3 text-gray-400 text-xl">&#128064;</span>
          <hr className="border-gray-300 w-1/5" />
        </div>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          dignissimos, quod qui eveniet inventore, soluta repellendus unde animi
          doloremque facere corrupti iste natus dolores distinctio id fuga eius
          labore debitis autem aliquam. Quibusdam voluptatum nesciunt molestiae,
          excepturi quae cum sunt soluta officiis mollitia neque iure ipsam
          repudiandae modi quam harum!
        </p>
        <div className="flex justify-center gap-4">
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <Button className="bg-green-500 text-white py-6 px-8 rounded-lg hover:bg-green-600 transition cursor-pointer">
              Detail
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <Button className="bg-orange-500 text-white py-6 px-8 rounded-lg hover:bg-orange-600 transition cursor-pointer">
              Browse
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
