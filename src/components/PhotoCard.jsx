export default function PhotoCard({
  photo,
  isFavourite,
  onToggle,
}) {
  return (
    <div  className={`bg-white rounded-lg shadow overflow-hidden transition-all duration-200 ${
    isFavourite ? "border-4 border-red-500" : ""
  }`}>
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 flex justify-between items-center">
        <p className="font-medium">
          {photo.author}
        </p>

          <button
  onClick={() => onToggle(photo.id)}
  className="text-2xl hover:scale-125 transition-transform duration-200"
>
  {isFavourite ? "❤️" : "🤍"}
</button>
      </div>
    </div>
  );
}