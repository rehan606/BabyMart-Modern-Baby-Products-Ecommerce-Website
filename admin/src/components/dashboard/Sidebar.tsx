import { cn } from "@/lib/utils"
import useAuthStore from "@/store/useAuthStore";
import { motion } from "motion/react";

interface Props{
  open: boolean;
  setOpen: (open: boolean) => void;
}


const Sidebar = ({ open, setOpen }: Props) => {
  const { user, logout} = useAuthStore();
  return (
    <motion.aside className={cn("fixed  inset-y-0 left-0 z-20 flex flex-col border-r border-r-slate-800/50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl hoverEffect text-white", open ? "w-64" : "w-20")}
    initial={{width:open ? 256 : 80}}
    animate={{width:open ? 256 : 80}}
    transition={{duration: 0.3, ease: "easeInOut"}}
    >
      {/* Sidebar content */}
      <div className="flex items-center justify-between p-4 h-16 bg-gradient-to-r from-[#29beb3] via-slate-700 to-[#a96bde] border-b border-slate-600/50">
        <span>BabyMart Admin</span>
      </div>

    </motion.aside>
  )
}

export default Sidebar
