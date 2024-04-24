"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoLocationSharp, IoMailSharp } from "react-icons/io5";
import Link from "next/link";

import React from "react";

const Footer = () => {
  return (
    <main className="bg-white text-gray-800 py-2 fixed  w-full">
      <div className="container mx-4 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div>
            <h4 className="text-sm font-semibold mb-2">Contact Information</h4>
            <div className="flex items-center mb-2 ">
              <IoMailSharp className="mr-2 text-green-400" />
              <p className="text-sm hover:font-semibold">
                ncr02141997@gmail.com
              </p>
            </div>
            <div className="flex items-center">
              <IoLocationSharp className="mr-2 text-green-400" />
              <p className="text-sm hover:font-semibold">
                Bangalore,Karnataka-India
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Connect with Me</h4>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://www.linkedin.com/in/nandiki-chandrashekhar-532362235/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mb-1"
              >
                <FaLinkedin className="mr-2 text-blue-400" />
                <p className="text-sm">LinkedIn</p>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://www.instagram.com/97_chandu_reddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaInstagram className="mr-2 text-pink-400" />
                <p className="text-sm">Instagram</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
