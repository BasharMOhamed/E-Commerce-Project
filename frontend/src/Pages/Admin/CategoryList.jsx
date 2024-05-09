import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllGategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/CategoryApiSlice";
import CategoryForm from "../../Components/CategoryForm";
import Modal from "../../Components/Modal";
import AdminMenu from "./Adminmenu";
const CategoryList = () => {
  const { data: categories, refetch } = useGetAllGategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${res.name} is created successfully`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Category name is required");
      return;
    }

    try {
      await updateCategory({
        id: selectedCategory._id,
        name: updateName,
      }).unwrap();
      toast.success("Category Updated Successfully");
      refetch();
      setUpdateName("");
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      refetch();
      toast.success("Category deleted successfully");
      setUpdateName("");
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };
  return (
    <div className="ml-[4rem] sm:ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:ouline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
