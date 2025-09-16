import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useState } from "react"


const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = async()=>{
    setLoading(true);

    try {
      const response = await axiosPrivate.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally{
      setLoading(false);
    }
  };



  return (
    <div>
      Users
    </div>
  )
}

export default Users;
