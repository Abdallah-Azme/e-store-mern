import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const FavoritesCount = () => {
  //   const favorites = useSelector((state: RootState) => state.favorites);
  //   const favoriteCount = favorites.length ;
  const favoriteCount = 2;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
