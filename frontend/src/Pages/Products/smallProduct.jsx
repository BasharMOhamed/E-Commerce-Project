import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] h-[14rem] rounded"
        />
        {<HeartIcon product={product} />}
        <div className="mt-[1rem] p-54">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-enter">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                EGP {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallProduct;
