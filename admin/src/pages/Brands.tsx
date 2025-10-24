import { Button } from "@/components/ui/button";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { brandSchema } from "@/lib/validation";
import useAuthStore from "@/store/useAuthStore";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Brand } from "type";
import { z } from "zod";

type FormData = z.infer<typeof brandSchema>;


const Brands = () => {

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const axiosPrivete = useAxiosPrivate();
  const { checkIsAdmin } = useAuthStore();
  const isAdmin = checkIsAdmin();


  // Fetch Brands
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivete.get("/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);


  // Refresh Brands
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axiosPrivete.get("/brands");
      setBrands(response.data);
      toast.success("Brands refreshed successfully");
    } catch (error) {
      console.error("Error refreshing brands:", error);
      toast.error("Failed to refresh brands");
    } finally {
      setRefreshing(false);
    }
  };


  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Brands Management</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant={"outline"} disabled={refreshing}> 
            <RefreshCcw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />{" "} {refreshing ? "Refreshing..." : "Refresh"}
          </Button>

          {isAdmin && (
            <Button className="ml-2" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Brands
