import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../Components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const productCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block mr-[2rem]">
      {isLoading ? null : error ? (
        <Message variant="danger ">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[46rem] lg:w-[46rem] md:w-[45rem] md:ml-[5rem] lg:ml-[0] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />
                <div className="flex justify-between w-[46rem] mt-[2rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>EGP {price}</p>
                    <br /> <br />
                    <p className="w-[25rem]">{description.substring(0, 170)}</p>
                  </div>

                  <div className="flex justify-between w-full md:ml-[0rem] ml-[1rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Brand :{brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6 ml-10">
                        <FaStar className="mr-2 text-white" /> Rating:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 ml-10 w-[20rem]">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 ml-10">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default productCarousel;
