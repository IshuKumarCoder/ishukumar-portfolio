"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Briefcase, Calendar, CheckCircle, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DashboardClient = ({ contacts, totalContacts, unreadContacts }: any) => {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const toggleStatus = async (id: string, currentStatus: string) => {
    setIsUpdating(id);
    try {
      const newStatus = currentStatus === "unread" ? "read" : "unread";
      await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredContacts = contacts.filter((contact: any) => {
    if (filter === "all") return true;
    return contact.status === filter;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 pt-28 space-y-8">
      {/* Stats Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-300">Total Inquiries</h2>
          </div>
          <p className="text-4xl font-bold text-white">{totalContacts}</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-300">Unread Messages</h2>
          </div>
          <p className="text-4xl font-bold text-white">{unreadContacts}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-300">Read Messages</h2>
          </div>
          <p className="text-4xl font-bold text-white">{totalContacts - unreadContacts}</p>
        </motion.div>
      </motion.div>

      {/* Contacts List section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-sm"
      >
        <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
          
          {/* Filters */}
          <div className="flex items-center bg-neutral-950 rounded-lg p-1 border border-neutral-800">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "all" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-neutral-200"}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("unread")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "unread" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-neutral-200"}`}
            >
              Unread
            </button>
            <button 
              onClick={() => setFilter("read")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "read" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-neutral-200"}`}
            >
              Read
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-neutral-800/50">
          {filteredContacts.length === 0 ? (
            <div className="p-10 text-center text-neutral-500">
              No contacts found in this category.
            </div>
          ) : (
            filteredContacts.map((contact: any, index: number) => (
              <motion.div 
                key={contact._id.toString()} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
                className={`p-6 transition-colors group ${contact.status === "unread" ? "bg-neutral-800/20 hover:bg-neutral-800/40" : "hover:bg-neutral-800/30"}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* User Info */}
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-neutral-200 text-lg">
                        {contact.name}
                      </span>
                      {contact.status === "unread" && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium border border-orange-500/20">
                          New
                        </span>
                      )}
                    </div>
                    <a href={`mailto:${contact.email}`} className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </a>
                  </div>
                  
                  {/* Project & Message */}
                  <div className="md:w-1/2 flex-grow">
                    <div className="inline-block px-3 py-1 mb-3 rounded-md bg-neutral-800/50 text-neutral-300 text-xs font-medium uppercase tracking-wider border border-neutral-700">
                      {contact.projectType || "General Inquiry"}
                    </div>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${contact.status === "unread" ? "text-neutral-300" : "text-neutral-500"}`}>
                      {contact.message}
                    </p>
                  </div>
                  
                  {/* Actions & Date */}
                  <div className="md:w-1/4 flex-shrink-0 md:text-right flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end text-sm text-neutral-500">
                    <div className="flex flex-col items-end mb-4">
                      <div className="flex items-center gap-1.5 mb-1 text-neutral-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {new Date(contact.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleStatus(contact._id, contact.status)}
                      disabled={isUpdating === contact._id}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        contact.status === 'unread' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:scale-105' 
                          : 'bg-neutral-800/50 text-neutral-400 border-neutral-700 hover:bg-neutral-700 hover:text-white'
                      } disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-1.5`}
                    >
                      {contact.status === 'unread' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Mark as Read
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          Mark as Unread
                        </>
                      )}
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </main>
  );
};
