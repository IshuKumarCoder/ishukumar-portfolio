import { connectDB } from "@/lib/mongodb";
import Contact from "@/app/models/contact";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import { DashboardClient } from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  await connectDB();
  
  // Fetch contacts, sorted by newest first
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
  
  const totalContacts = contacts.length;
  const unreadContacts = contacts.filter((c: any) => c.status === "unread").length;
  
  // Convert MongoDB objects to plain JSON for Client Component
  const serializedContacts = JSON.parse(JSON.stringify(contacts));
  
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30">
      <AdminNavbar />
      <DashboardClient 
        contacts={serializedContacts} 
        totalContacts={totalContacts} 
        unreadContacts={unreadContacts} 
      />
    </div>
  );
}