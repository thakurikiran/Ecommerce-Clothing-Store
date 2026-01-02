import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const List = () => {
  const [list, setList] = useState([]);
  console.log(list);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchList();
  }, [list]);

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
        {list.map((item, index) => (
          <div></div>
        ))}
      </div>
    </div>
  );
};

export default List;
