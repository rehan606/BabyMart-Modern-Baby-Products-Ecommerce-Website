import { cn } from "@/lib/utils"
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ChevronLeft , ChevronRight} from "lucide-react";

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
        <motion.div 
          initial={{ opacity: open ? 1 : 0, width: open ? "auto" : 0}}
          initial={{ opacity: open ? 1 : 0, width: open ? "auto" : 0}}
          transition={{ duration: 0.2}}
          className={cn("flex items-center overflow-hidden", open ? "w-auto opacity-100" : "opacity-0")}
          >
          <h2 className="font-bold text-xl text-white drop-shadow-lg">BabyMart Admin</h2>
        </motion.div>
        
        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
          <Button 
            onClick={() => setOpen(!open)}
            variant={"ghost"} 
            size={"icon"} 
            className="rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white hoverEffect border-white/20 hover:border-white/30 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.3 }}>
              {open ? <ChevronLeft/> : <ChevronRight className="rotate-180"/>}
            </motion.div>
          </Button>
        </motion.div>
      </div>

    </motion.aside>
  )
}

export default Sidebar
