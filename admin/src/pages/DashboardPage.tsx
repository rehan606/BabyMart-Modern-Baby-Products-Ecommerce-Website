import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";

const DashboardPage = () => {

  const { logout } = useAuthStore()
  return (
    <div>
      <h2>Dashboard</h2>
      <Button variant={"destructive"} onClick={()=> logout()} > Logout </Button>
    </div>
  );
};

export default DashboardPage ; 
