import useAuthStore from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const Header = () => {

  const { user } = useAuthStore();
  return (
    <header className="px-4 border-border border-b sticky top-0 z-10 flex items-center justify-between bg-background h-16">
      <div className="flex items-center gap-4 ml-auto">
        
          <Button variant={"ghost"} size={"icon"} className="rounded-full border border-border">
            <Bell size={18}></Bell>
          </Button>
          <div className="hidden md:block">
            {user && <p className="text-sm font-medium"> {user.name}</p>}
            {user && <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>}
          </div>

          <div className="w-9 h-9 rounded-full bg-primary/10  flex items-center justify-center overflow-hidden text-primary font-semibold border border-border">
            {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full  object-cover" /> : user?.name.charAt(0).toUpperCase()}
          </div>


      </div>

    </header>
  )
}

export default Header
