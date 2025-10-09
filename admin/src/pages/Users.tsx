import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import useAuthStore from "@/store/useAuthStore";
import { Edit, Eye, Plus, RefreshCw, Trash, Users2 } from "lucide-react";
import { useEffect, useState } from "react"
import type { UserType } from "../../type";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import type { User } from "@/types";


  // Modal / Dialouge 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { userSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type FormData = z.infer<typeof userSchema>;

const Users = () => {

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User| null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const axiosPrivate = useAxiosPrivate();
  const {checkIsAdmin} = useAuthStore();
  const isAdmin = checkIsAdmin();

  const formAdd = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      avatar: "",
    }
  })

  const fetchUsers = async()=>{
    setLoading(true);

    try {
      const response = await axiosPrivate.get('/users');
      setUsers(response?.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect (() => {
    fetchUsers();
  }, []);


  // user role color change

  const getRoleColor = (role:string)=> {
    switch(role){
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'deliveryman':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }



  return ( 
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-0.5">View and manage all system users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-blue-600 flex items-center gap-1">
            <Users2 className="w-8 h-8 " />
            <p className="text-2xl font-bold">{ users?.length}</p>
          </div>
          <Button variant={"outline"} className="border-blue-600 text-blue-600 hover:bg-blue-50 hoverEffect"> 
            <RefreshCw className="w-4 h-4 mr-2" />
             Refresh 
          </Button>
          {isAdmin && (
            <Button onClick={() => setIsAddModalOpen(true)}  className="bg-blue-600 hover:bg-blue-700 text-white hoverEffect">
              <Plus className="w-4 h-4 mr-2" />
              Add User
              
            </Button>
          )}
        </div>
      </div>

      {/* Filters Skeleton */}

      {/* Table Skeleton  */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold"> Avatar </TableHead>
              <TableHead className="font-semibold"> Name </TableHead>
              <TableHead className="font-semibold"> Email </TableHead>
              <TableHead className="font-semibold"> Role </TableHead>
              <TableHead className="font-semibold"> Created At </TableHead>
              <TableHead className="font-semibold"> Actions </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.length > 0 ? ( 
               
                users?.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center text-blue-600 font-semibold shadow-sm">
                        {!user?.avatar ?  <img src={user?.avatar} alt="userImage" className="h-full w-full object-cover rounded-full" /> : 
                      <div className="h-full w-full object-cover rounded-full bg-gradient-to-br from-[#29beb3] to-[#a96bde] flex items-center justify-center text-white text-lg font-bold overflow-hidden shadow-lg ring-2 ring-white/20">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      }
                      </div>
                    </TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", getRoleColor(user?.role))}>{user?.role}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user?.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant={"ghost"} size="icon" title="View User" className=" border border-border"><Eye/></Button>
                        <Button variant={"ghost"} size="icon" title="Edit User" className=" border border-border"><Edit/></Button>
                        <Button variant={"ghost"} size="icon" title="Delete User" className="border border-border"><Trash/></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
            <div className="flex items-center justify-center py-10 font-semibold">
              <h2 className="text-gray-600 text-center font-semibold">User Not Found</h2>
            </div>
            ) }
          </TableBody>
        </Table>
      </div> 


    {/* Add User Modal  */}

    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Create a new user account
          </DialogDescription>
        </DialogHeader>

        {/* Form  */}
        <Form {...formAdd}>
            <form className="mt-4 space-y-6">

                {/* Name Field  */}
              
                <FormField control={formAdd.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} disabled={formLoading} className="focus:border-indigo-500 hoverEffect" placeholder="Enter name" />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )} />
                {/* Email Field  */}

                <FormField control={formAdd.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} disabled={formLoading} className="focus:border-indigo-500 hoverEffect" placeholder="Enter email" />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )} />

                {/* Password Field  */}

                <FormField control={formAdd.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} disabled={formLoading} className="focus:border-indigo-500 hoverEffect" placeholder="Enter password" />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                    </FormItem>
                )} />

                {/* Role Field  */}

                <FormField control={formAdd.control} name="role" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Role</FormLabel>
                        
                        
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={formLoading} > 
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hoverEffect transition=all duration-200">
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem> 
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="deliveryman">Delivery Man</SelectItem>
                                </SelectContent>
                            </Select>
                        
                        <FormMessage className="text-red-500"/>
                    </FormItem>
                )} />

                {/* Avatar Field  */}
                <FormField control={formAdd.control} name="avatar" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Avatar</FormLabel>
                        <FormControl>
                          <ImageUpload 
                            value={field.value ?? ""} 
                            onChange={field.onChange}
                            disabled={formLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                    </FormItem>
                )} />

                <div className="flex items-center justify-end gap-2 pt-4">
                    <Button type="button" variant={"outline"} onClick={() => setIsAddModalOpen(false)} disabled={formLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white hoverEffect" disabled={formLoading}>
                        {formLoading ? "Adding..." : "Add User"}
                    </Button>
                </div>
            </form>
        </Form>

      </DialogContent>
    </Dialog>

    </div>
  )
}

export default Users;
