import { Navigate, Outlet,} from "react-router"
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/common/Header";
import { cn } from "./lib/utils";
import useAuthStore from "./store/useAuthStore";



function App() {
  // Simulating authentication status
  const { isAuthenticated } = useAuthStore();
  // Redirect to login if not authenticated
  if(!isAuthenticated){
    return <Navigate to={"/login"}  />;
  }

  return (
    <div className="h-screen flex bg-background ">
      <Sidebar/>
      <div className={cn("flex flex-col bg-gray-200 flex-1 max-w-[--breakpoint-2xl] hoverEffect ml-64")}>
        <Header/>

        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default App
