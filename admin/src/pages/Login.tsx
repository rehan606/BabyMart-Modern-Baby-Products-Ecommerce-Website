import CommonLayout from "@/components/common/CommonLayout"
import { Link } from "react-router"


const Login = () => {
  return (
    <CommonLayout>
    <div>
      <h1>Login Page</h1>
      <Link to={"/"} className="bg-gray-700 w-20 px-4 py-2 text-white">Back to Home</Link>
    </div>
    </CommonLayout>
  )
}

export default Login

