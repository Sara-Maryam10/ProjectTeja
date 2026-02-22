"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function InternDashboard() {
  const user = useAuth("intern");
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [filter, setFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setMounted(true);

    const translationStatus =
      localStorage.getItem("translationStatus") || "In Progress";

    const transcriptionStatus =
      localStorage.getItem("transcriptionStatus") || "Pending";

    const loadedTasks = [
      {
        title: "English to Hindi Translation",
        service: "Translation",
        status: translationStatus,
        date: "2024-01-15",
      },
      {
        title: "Podcast Transcription",
        service: "Transcription",
        status: transcriptionStatus,
        date: "2024-01-15",
      },
      {
        title: "Website Translation",
        service: "Translation",
        status: "Completed",
        date: "2024-01-14",
      },
    ];

    setTasks(loadedTasks);

    const notes = [];
    if (translationStatus === "Completed")
      notes.push("Translation task completed ✅");
    if (transcriptionStatus === "Completed")
      notes.push("Transcription task completed ✅");

    setNotifications(notes);
  }, []);

  if (!mounted || !user) return null;

  function logout() {
    localStorage.removeItem("tejaUser");
    window.location.href = "/try-teja";
  }

  function submitFeedback() {
    alert("Feedback submitted successfully ✅");
    setSelectedTask(null);
    setFeedback("");
  }

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-white text-black px-10 py-14">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold">
            Intern Dashboard
          </h1>
          <p className="text-black/60 mt-2">
            Welcome back, {user.email}
          </p>
        </div>

        <div className="flex items-center gap-6">

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-2xl"
            >
              🔔
            </button>

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-4 w-72 bg-black text-white rounded-2xl shadow-2xl p-4 z-50"
                >
                  <h3 className="font-semibold mb-3">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-white/60 text-sm">
                      No new notifications
                    </p>
                  ) : (
                    notifications.map((note, index) => (
                      <div
                        key={index}
                        className="text-sm border-b border-white/10 py-2"
                      >
                        {note}
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={logout}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-8 mb-20">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="In Progress" value={inProgressCount} />
        <StatCard title="Completed" value={completedCount} />
        <StatCard title="Pending" value={pendingCount} />
      </div>

      {/* SERVICES */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">
          Services
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => router.push("/try-teja/intern/translation")}
            className="bg-black text-white rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Translation
            </h3>
            <p className="text-white/60">
              Work on assigned translation tasks.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => router.push("/try-teja/intern/transcription")}
            className="bg-black text-white rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Transcription
            </h3>
            <p className="text-white/60">
              Access transcription assignments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-8">
        {["All", "Completed", "In Progress", "Pending"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-full text-sm transition ${
              filter === item
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* TASK TABLE */}
      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-white">
          <thead className="border-b border-white/10">
            <tr className="text-left text-white/60">
              <th className="p-6">Task</th>
              <th className="p-6">Service</th>
              <th className="p-6">Status</th>
              <th className="p-6">Date</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-6 font-medium">
                  {task.title}
                </td>

                <td className="p-6 text-white/70">
                  {task.service}
                </td>

                <td className="p-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      task.status === "Completed"
                        ? "bg-green-600"
                        : task.status === "In Progress"
                        ? "bg-blue-600"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-6 text-white/50">
                  {task.date}
                </td>

                <td className="p-6 flex gap-3">
                  <button
  onClick={() => setDetailTask(task)}
  className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
>
  View Details
</button>

                  <button
                    onClick={() => setSelectedTask(task)}
                    className="bg-white text-black px-4 py-1.5 rounded-full text-sm hover:bg-gray-200 transition"
                  >
                    Give Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FEEDBACK MODAL */}
      <AnimatePresence>
        {selectedTask && (
          <Modal onClose={() => setSelectedTask(null)} title="Give Feedback">
            <p className="mb-4 text-black/60">
              {selectedTask.title}
            </p>

            <textarea
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded-lg p-3 mb-6"
              placeholder="Write your feedback here..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={submitFeedback}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {detailTask && (
          <Modal onClose={() => setDetailTask(null)} title="Task Details">
            <p><strong>Language:</strong> {detailTask.service === "Translation" ? "Hindi → English" : "Hindi Audio"}</p>
            <p><strong>Deadline:</strong> 20 Jan 2024</p>
            <p className="mt-3"><strong>Notes:</strong> Please ensure quality and formatting.</p>

            <div className="mt-4">
              <strong>Submission History:</strong>
              <ul className="list-disc ml-6 mt-2">
                <li>Assigned on 14 Jan</li>
                <li>Viewed on 15 Jan</li>
              </ul>
            </div>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-black text-white rounded-3xl p-8 shadow-2xl">
      <p className="text-white/60 text-sm">{title}</p>
      <h2 className="text-4xl font-semibold mt-3">{value}</h2>
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 w-full max-w-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h3 className="text-xl font-semibold mb-6">{title}</h3>
        {children}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}