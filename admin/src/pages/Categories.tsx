import { useState } from "react";

type Category = {
  _id: string;
  name: string;
  image?: string;
  categoryType: "Featured" | "Hot Categories" | "Top Categories";
  createdAt: string;
};

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);


  return (
    <div>
      Categories
    </div>
  )
}

export default Categories
