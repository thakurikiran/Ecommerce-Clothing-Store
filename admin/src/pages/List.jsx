import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  console.log(list);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to load products");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { _id: productId },
        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        setList((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Product removed");
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* ------ List Table Title ------ */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 border-gray-300 gap-60">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-60 border border-gray-300 px-2 py-1"
          >
            <img
              className="w-12 h-12 object-cover"
              src={item.image?.[0]}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => removeProduct(item._id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
