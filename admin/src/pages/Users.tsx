import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import useAuthStore from "@/store/useAuthStore";
import { Edit, Eye, Plus, RefreshCw, Trash, Users2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react"
import type { UserType } from "../../type";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import  UserSkeleton  from "@/components/skeletons/user-skeleton";
import { ImageUpload } from "@/components/ui/image-upload";
import type { User } from "@/types";
import { toast } from "sonner";



// Modal / Dialouge 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  // DialogTrigger,
} from "@/components/ui/dialog"
// alert Dialouge
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z, { set } from "zod";
import { userSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


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

  // Add User Form
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

  // Edit User Form
  const formEdit = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
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

  //Add User Form Submit 
  const handleAddUser= async (data: FormData)=>{
    setFormLoading(true);

    try{
      await axiosPrivate.post("/users", data);
      
      toast.success("User Created Successfully");
      formAdd.reset();
      setIsAddModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.log("Faild to Create User", error);
      toast("Faild to create user");
    } finally{
      setFormLoading(false);
    }
  };

  // Refresh user 
  const handleRefresh = async()=>{
    setRefreshing(true)
    try{
      const response = await axiosPrivate.get("/users", {
        params:{
          page,
          perPage,
          role: roleFilter !== "all" ? roleFilter : undefined,
        },
      });
      // Handle both paginated and non-paginated responses 

      if (response.data) {
        setUsers(response.data);
        // setTotal(response.data.total || response.data.users.length);
        // setTotalPages(response.data.totalPages || 1);
      } else {
        setUsers(response.data);
        // setTotal(response.data.length);
        // setTotalPages(1);
      }

      toast("Users refreshed successfully");

    } catch (error) {
      console.log("Failed to refresh users", error);
      toast("Failed o refresh users");
    } finally {
      setRefreshing(false)
    }
  };

  // Edit User
  const handleEdit = (user:User)=>{
    setSelectedUser(user);
    formEdit.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
    });
    setIsEditModalOpen(true);
  };

  // Update User
  const handleUpdateUser = async (data: FormData) => {
    if (!selectedUser) return;
    setFormLoading(true);
    try {
      await axiosPrivate.put(`/users/${selectedUser._id}`, data);
      toast.success("User updated successfully!");
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.log("Failed to update user", error);
      toast.error("Failed to updated User");
    } finally {
      setFormLoading(false);
    }
  };

  // View User 
  const handleView = (user: User) =>{
    setSelectedUser(user);
    setIsViewModalOpen(true);
  }

  // Delete User
  const handleDelete = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async() => {
    if (!selectedUser) return;
    setLoading(true)

    try {
      await axiosPrivate.delete(`/users/${selectedUser?._id}`);
      toast("Success", {
        description: "User Deleted successfully"
      });
      fetchUsers();
    } catch (error) {
      console.log("Failed to delete user", error);
      toast("Failed to delete user", {
        description: "Please try again later."
      });
    }
  }

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

  if(loading){
    return <UserSkeleton/>
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
          <Button 
            variant={"outline"} 
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hoverEffect"> 
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
             {refreshing ? "Refreshing..." : "Refresh" }
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

                        {/* view user button  */}
                        <Button 
                          variant={"ghost"} 
                          size="icon" 
                          title="View User" 
                          className=" border border-border"
                          onClick={()=> handleView(user)}
                          >
                            <Eye/>
                        </Button>

                        {/* Edit User Button  */}
                        <Button 
                          variant={"ghost"} 
                          size="icon" 
                          title="Edit User" 
                          className=" border border-border"
                          onClick={() => handleEdit(user)}
                          > <Edit/>
                        </Button>

                        {/* Delete user Button  */}
                        <Button 
                          variant={"ghost"} 
                          size="icon" 
                          onClick={() => handleDelete(user)}
                          title="Delete User" 
                          className="border border-border hover:bg-red-300  "><Trash /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
            <TableRow className="flex items-center justify-center py-10 font-semibold">
              <TableCell className="text-gray-600 text-center font-semibold">User Not Found</TableCell>
            </TableRow>
            
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
            <form className="mt-4 space-y-6" onSubmit={formAdd.handleSubmit(handleAddUser)}>

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

                {/* Buttons  */}

                <DialogFooter>
                    <Button type="button" variant={"outline"} onClick={() => setIsAddModalOpen(false)} disabled={formLoading}>
                        Cancel
                    </Button>

                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white hoverEffect" disabled={formLoading}>
                        {formLoading ? (
                          <>  
                            <Loader2 className="animate-spin"/>   Adding...
                          </>
                        ) : (
                          "Add User"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </Form>

      </DialogContent>
    </Dialog>


    {/* Edit User Model */}
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <Form {...formEdit}>
            <form
              onSubmit={formEdit.handleSubmit(handleUpdateUser)}
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   console.log("hello");
              //   formEdit.handleSubmit(handleUpdateUser);
              // }}
              className="space-y-6 mt-4"
            >

              {/* Name Field */}
              <FormField
                control={formEdit.control}
                name="name"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={formLoading}
                        className="border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={formEdit.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        disabled={formLoading}
                        className="border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}

              {/* <FormField
                control={formEdit.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Password (leave empty to keep current)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Leave empty to keep current password"
                        disabled={formLoading}
                        className="border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              /> */}

              {/* Role field */}
              <FormField
                control={formEdit.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="deliveryman">
                          Delivery Person
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Avater field*/}
              <FormField
                control={formEdit.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Avatar
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        disabled={formLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={formLoading}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  {formLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
    </Dialog>

    
    {/* Delete User Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{selectedUser?.name}</span>'s
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    {/* View User Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View complete user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold shadow-sm overflow-hidden">
                  {selectedUser.avatar ? (
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <Badge
                    className={cn(
                      "capitalize mt-2",
                      getRoleColor(selectedUser.role)
                    )}
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    User ID
                  </Label>
                  <p className="text-lg font-semibold">{selectedUser._id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Created At
                  </Label>
                  <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Users;
