"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center px-6">
      
      {/* Background Animated Aura */}
      <motion.div
        className="absolute w-150 h-150 rounded-full bg-black/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size:60px_60px" />

      {/* Content */}
      <div className="relative max-w-5xl text-center z-10">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight"
        >
          Intelligence That{" "}
          <span className="relative inline-block">
            Speaks
            <motion.span
              className="absolute left-0 bottom-1 w-full h-0.5 bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </span>{" "}
          Every Language.
        </motion.h1>

        {/* Motive */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
        >
          To redefine communication through AI that understands context,
          tone, and meaning — not just words.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center gap-6 flex-wrap"
        >
          <button className="bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition duration-300">
            Try Now
          </button>

          <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition duration-300">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Floating Intelligence Lines */}
      <motion.div
        className="absolute bottom-10 w-[80%] h-px bg-linear-to-r from-transparent via-black/30 to-transparent"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}
