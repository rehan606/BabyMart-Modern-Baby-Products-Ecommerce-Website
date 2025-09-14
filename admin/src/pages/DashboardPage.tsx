import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";

const DashboardPage = () => {

  const { logout } = useAuthStore()
  return (
    <div className="p-10">
      <h2>Dashboard</h2>
      <Button variant={"destructive"} onClick={()=> logout()} > Logout </Button>
    </div>
  );
};

export default DashboardPage ; 
