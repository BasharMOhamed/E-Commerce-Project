import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favouriteCount = favorites.length;
  return (
    <div className="absolute left-2 top-8">
      {favouriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favouriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
