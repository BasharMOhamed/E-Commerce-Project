import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../Pages/Products/smallProduct.jsx";
import ProductCarousel from "../Pages/Products/productCarousel.jsx";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-raw">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="flex flex-raw flex-wrap ml-[4rem] md:hidden lg:flex">
            {/* grid grid-cols-2 */}
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
