import { Card, CardHeader, CardTitle , CardDescription, CardContent, CardFooter,  } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema } from "@/lib/validation.ts";
import { motion } from "motion/react";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod' ;
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";


type FormData=z.infer<typeof loginSchema>;

const Login = () => {

  
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const {login} = useAuthStore();

  
 
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div 
        initial={{opacity:0, y:200}} 
        animate={{opacity: 1, y:0}}
        transition={{ duration: 0.5, ease: "easeIn"}}
        className="w-full max-w-md px-4">
        <Card className="w-full  bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200"> 
          <CardHeader className="text-center space-y-2">
            <motion.div 
              initial={{ scale: 0.5}}
              animate={{ scale: 1}}
              transition={{ duration: 0.3 }}
              >
              <CardTitle className="text-3xl font-bold text-gray-800 "> Admin Dashboard</CardTitle>
              <CardDescription className="text-gray-500 text-center ">
                Enter your credentials to sign in
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="email" render={({field})=>(
                  <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="emial" disabled={isLoading} className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-800 placeholder:text-sm hoverEffect" {...field}/>
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                  </FormItem>
                )} >
                </FormField>

                {/* Password field  */}

                <FormField control={form.control} name="password" render={({field})=>(
                  <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="******" type="password" disabled={isLoading} className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-800 placeholder:text-sm hoverEffect" {...field}/>
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                  </FormItem>
                )} >
                </FormField>

                {/* Button  */}
                <div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 hoverEffect text-white font-semibold py-2 rounded-lg">
                    <LogIn/> Sign In
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent> 

          <CardFooter className="justify-center">
            <p className="text-sm text-gray-500">Don't have an account <Link to={"/register"} className="text-indigo-600 hover:text-indigo-800 hoverEffect hover:underline font-semibold"> Sign Up</Link> </p>
          </CardFooter>
          
        </Card>
      </motion.div>
    </div>
  )
}

export default Login

