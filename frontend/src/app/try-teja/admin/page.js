"use client";

import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const user = useAuth("admin");
  const router = useRouter();

  if (!user) return null;

  function logout() {
    localStorage.removeItem("tejaUser");
    window.location.href = "/try-teja";
  }

  const services = [
    { name: "Translation", path: "/admin/translation" },
    { name: "Transcription", path: "/admin/transcription" },
    { name: "Voiceover", path: "/admin/voiceover" },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold">
            Admin Dashboard
          </h1>

          <p className="text-black/70 mt-1">
            Welcome {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>

      {/* SERVICE CARDS */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {services.map((service) => (
          <motion.div
            key={service.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(service.path)}
            className="
              cursor-pointer
              bg-black
              text-white
              border border-white/20
              rounded-2xl
              p-14
              text-center
              transition-all
              hover:border-white
              hover:shadow-[black_10px_10px_20px_-10px]
            "
          >
            <h2 className="text-2xl font-medium tracking-wide">
              {service.name}
            </h2>

            <p className="text-white/50 mt-3 text-sm">
              Manage tasks and workflow
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}