import { Link, Navigate,} from "react-router"
import CommonLayout from "./components/common/CommonLayout"
import { Button } from "./components/ui/button"


function App() {
  // Simulating authentication status
  const isAuthenticated = true;
  // Redirect to login if not authenticated
  if(!isAuthenticated){
    return <Navigate to={"/login"} replace={true} />
  }

  return (
    <CommonLayout>
      <div className="p-10">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>This is a simple admin dashboard built with React.</p>
        <p>Feel free to customize it as per your requirements.</p>
        <Link to={"/login"}className="bg-gray-700 w-20 px-4 py-2 text-white mr-5">Login</Link>

        <Button >Click Me</Button>
      </div>
    </CommonLayout>
  )
}

export default App
