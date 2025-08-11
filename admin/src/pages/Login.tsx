import { Card, CardHeader, CardTitle , CardDescription, CardContent,  } from "@/components/ui/card";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";


type FormData=z.infer<typeof></typeof>

const Login = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<FromData

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
              <form>
                <FormField>
                  <FormLabel></FormLabel>
                </FormField>
              </form>
            </Form>
          </CardContent> 
          
        </Card>
      </motion.div>
    </div>
  )
}

export default Login

