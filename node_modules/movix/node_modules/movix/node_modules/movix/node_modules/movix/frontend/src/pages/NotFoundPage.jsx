"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400">
      <motion.div
        className="text-9xl font-bold mb-8"
        animate={{
          textShadow: isHovered
            ? [
                "0 0 7px #ff00c8",
                "0 0 10px #ff00c8",
                "0 0 21px #ff00c8",
                "0 0 42px #ff00c8",
                "0 0 82px #ff00c8",
                "0 0 92px #ff00c8",
                "0 0 102px #ff00c8",
                "0 0 151px #ff00c8",
              ]
            : "0 0 7px #fff",
        }}
        transition={{ duration: 0.2 }}
      >
        404
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mt-8 mb-4 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Page not found
      </motion.h2>

      <motion.p
        className="text-gray-400 mb-8 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to={"/"}>
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-200">
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
