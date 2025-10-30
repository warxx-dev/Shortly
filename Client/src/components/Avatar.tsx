export const Avatar = ({ img }: { img: string | undefined }) => {
  return (
    <div>
      {img ? (
        <img
          src={img}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
          ?
        </div>
      )}
    </div>
  );
};
