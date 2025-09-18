import { Button } from "@/components/ui/button";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import useAuthStore from "@/store/useAuthStore";
import { Plus, RefreshCw, Users2 } from "lucide-react";
import { useEffect, useState } from "react"


const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const {checkIsAdmin} = useAuthStore();
  const isAdmin = checkIsAdmin();

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
            <p className="text-2xl font-bold">{users?.length}</p>
          </div>
          <Button variant={"outline"} className="border-blue-600 text-blue-600 hover:bg-blue-50 hoverEffect"> 
            <RefreshCw className="w-4 h-4 mr-2" />
             Refresh 
          </Button>
          {isAdmin && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white hoverEffect">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* Filters Skeleton */}

      {/* Table Skeleton  */}
      

    </div>
  )
}

export default Users;
