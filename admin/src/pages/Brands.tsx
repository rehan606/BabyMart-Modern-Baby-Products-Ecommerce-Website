import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { brandSchema } from "@/lib/validation";
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

  return (
    <div>
      Brands
    </div>
  )
}

export default Brands
