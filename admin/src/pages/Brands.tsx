import { brandSchema } from "@/lib/validation";
import { useState } from "react";
import type { Brand } from "type";

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


  return (
    <div>
      Brands
    </div>
  )
}

export default Brands
