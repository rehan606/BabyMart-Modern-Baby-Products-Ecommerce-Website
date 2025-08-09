import { Card, CardHeader, CardTitle , CardDescription} from "@/components/ui/card";


const Login = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card className="w-full  bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200"> 
          <CardHeader className="text-center space-y-2">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800"> Admin Dashboard</CardTitle>
             </div>
          </CardHeader>

          <CardDescription className="text-gray-500 ">
            Enter your credentials to sign in
          </CardDescription>
        </Card>
      </div>
    </div>
  )
}

export default Login

