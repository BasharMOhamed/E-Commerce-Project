import { useState, useEffect } from "react";
import AdminMenu from "./Adminmenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllGategoriesQuery } from "../../redux/api/CategoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useGetAllGategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  useEffect(() => {
    if (productData && productData._id) {
      console.log(productData);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setStock(productData.countInStock);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [
    productData,
    // productData.name,
    // productData.description,
    // productData.price,
    // productData.categories?._id,
    // productData.setQuantity,
    // productData.brand,
    // productData.image,
  ]);
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      console.log(formData);
      const data = await updateProduct({
        productId: params._id,
        FormData: formData,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-20">
          <div className="h-12">Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "upload image"}

              <input
                type="file"
                name="image"
                accept="image/"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="ml-5">
                <div className="flex flex-wrap">
                  <div className="two">
                    <label htmlFor="name block">Price</label> <br />
                    <input
                      type="number"
                      className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap">
                    <div className="one">
                      <label htmlFor="name block">Quantity</label> <br />
                      <input
                        type="number"
                        className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="ml-5">
                      <div className="flex flex-wrap">
                        <div className="two">
                          <label htmlFor="name block">Brand</label> <br />
                          <input
                            type="text"
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </div>
                      </div>

                      <label htmlFor="" className="my-5">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <div className="flex justify-between">
                        <div>
                          <label htmlFor="name block">Count In Stock</label>
                          <br />
                          <input
                            type="number"
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </div>
                        <div className="ml-5">
                          <label htmlFor="">Category</label>
                          <br />
                          <select
                            placeholder="Choose Category"
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categories?.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={handleSubmit}
                          className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 mr-6"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleDelete}
                          className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
