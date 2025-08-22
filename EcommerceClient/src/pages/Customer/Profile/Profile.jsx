import { motion } from "framer-motion";
import { Info, Star, FileText } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const tabs = [
  {
    id: "edit username and password",
    label: "Edit Uername and email",
    icon: FileText,
  },
  { id: "Change Password", label: "Change Password", icon: Star },
  { id: "Orders", label: "Order Info", icon: Info },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  return (
    <div>
      <div className="mt-32">
        <nav className="flex justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center pb-4 pt-2 px-1 ${
                    activeTab === tab.id
                      ? "text-orange-500"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      layoutId="activeTab"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-8">
          {activeTab === "Change Password" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChangePassword />
            </motion.div>
          )}

          {activeTab === "edit username and password" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EditProfile />
            </motion.div>
          )}

          {activeTab === "Orders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold">Shipping Information</h3>
                <p>
                  Standard shipping takes 3-5 business days. Express shipping
                  options are available at checkout.
                </p>
                {/* Add more shipping information as needed */}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
