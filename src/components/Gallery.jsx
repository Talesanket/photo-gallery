import {
  useCallback,
  useMemo,
  useState,
  useReducer,
  useEffect,
} from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";
import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";

import {
  favouritesReducer,
  initialState,
} from "../reducers/favouritesReducer";

export default function Gallery() {
  const { photos, loading, error } =
    useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFavourite = (id) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: id,
    });
  };

  if (loading) {
  return (
    <div className="flex justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );
}

if (error) {
  return (
    <div className="text-center text-red-500 py-10">
      {error}
    </div>
  );
}

return (
  <div className="max-w-7xl mx-auto px-4">

    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        Photos
      </h2>

      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
        ❤️ {favourites.length} Favourites
      </span>
    </div>

    <SearchBar
      value={search}
      onChange={handleSearch}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredPhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(photo.id)}
          onToggle={toggleFavourite}
        />
      ))}
    </div>

  </div>
);
}