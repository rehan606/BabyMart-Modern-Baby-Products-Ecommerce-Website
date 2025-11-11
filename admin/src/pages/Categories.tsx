import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem  } from "@/components/ui/select";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { categorySchema } from "@/lib/validation";
import useAuthStore from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Package, Plus, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

type Category = {
  _id: string;
  name: string;
  image?: string;
  categoryType: "Featured" | "Hot Categories" | "Top Categories";
  createdAt: string;
};

type FormData = z.infer<typeof categorySchema>;

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {checkIsAdmin} = useAuthStore();
  const isAdmin = checkIsAdmin();


  // Form handlers and data fetching logic would go here

  // Form Add
  const formAdd = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: "",
      categoryType: "Featured",
    },
  });


  // Form Edit
  const formEdit = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: "",
      categoryType: "Featured",
    },
  });

  // Fetch Categories function would go here
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(`/categories`, {
        params: { page, perPage, sortOrder },
      });
      setCategories(response?.data?.categories || []);
      setTotal(response?.data?.total || 0);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  // Refresh Categories Button Handler
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axiosPrivate.get(`/categories`, {
        params: { 
          page, perPage, sortOrder, 
          // search: searchTerm.trim() || undefined,
          // categoryType: categoryTypeFilter === "all" ? undefined : categoryTypeFilter,
         },
      });
      setCategories(response?.data?.categories || []);
      setTotal(response?.data?.total || 0);
      setTotalPages(response?.data?.totalPages || 1);
      toast.success("Categories refreshed successfully");
    } catch (error) {
      console.error("Error refreshing categories:", error);
      toast.error("Failed to refresh categories");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, sortOrder]);

  // Search Input Handler
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  }

  // Sort Order Change Handler
  const handleSortOrderChange = (value: string) => {
    setSortOrder(value as "asc" | "desc");
    setPage(1);
  };

  // Add Category Handler
  // const handleAddCategory = async (data: FormData) => {
  //   setFormLoading(true);
  // };

  return (
    <div className="space-y-6 p-5">
      {/* Category Page Header  */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-2">Manage product categories and their organization.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"

            > <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}/> 
            {refreshing ? "Refreshing..." : "Refresh"}  
          </Button>

          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-600"/>
            <span className="text-2xl font-bold text-blue-600">{total} </span>
          </div>
        </div>
      </div>

      {/* Search, Filter and sort Category */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search Category */}
          <div className="flex items-center gap-2">
            <Search/>
            <Input 
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-64" />
          </div> 

          {/* Category Filter */}
          <Select value={categoryTypeFilter} onValueChange={setCategoryTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Featured">Featured</SelectItem>
              <SelectItem value="Hot Categories">Hot Categories</SelectItem>
              <SelectItem value="Top Categories">Top Categories</SelectItem>
            </SelectContent>
          </Select> 

          {/* Sort Category */}
          <Select value={sortOrder} 
            onValueChange={handleSortOrderChange}
            >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4"/> Add Category
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <Form {...formAdd}>
            <form
              // onSubmit={formAdd.handleSubmit(handleAddCategory)}
              className="space-y-4"
            >
              {/* Name Field  */}
              <FormField
                control={formAdd.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Type Field */}
              <FormField
                control={formAdd.control}
                name="categoryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Category Type </FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        disabled={formLoading} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled>Select a Category type</option>
                        <option value="Featured">Featured</option>
                        <option value="Hot Categories">Hot Categories</option>
                        <option value="Top Categories">Top Categories</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image upload field */}
              <FormField
                control={formAdd.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Image (Optional)</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        disabled={formLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Brand"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Categories
