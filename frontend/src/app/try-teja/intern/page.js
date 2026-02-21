"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InternDashboard() {
  const user = useAuth("intern");
  const router = useRouter();

  if (!user) return null;

  function logout() {
    localStorage.removeItem("tejaUser");
    window.location.href = "/try-teja";
  }

  const services = [
    {
      name: "Translation",
      description: "View and work on translation tasks",
      path: "/intern/translation",
    },
    {
      name: "Transcription",
      description: "Access transcription assignments",
      path: "/intern/transcription",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold">
            Intern Dashboard
          </h1>

          <p className="mt-2 text-black/60">
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
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

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
              rounded-2xl
              p-14
              transition-all
              shadow-lg
              hover:shadow-2xl
            "
          >
            <h2 className="text-2xl font-medium">
              {service.name}
            </h2>

            <p className="text-white/60 mt-3 text-sm">
              {service.description}
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}