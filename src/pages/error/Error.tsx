import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex grow-[2] items-center">
        <span className="text-2xl text-red-600">Page not found!</span>
      </div>
      <div className="grow-[2]">
        <button
          type="button"
          className="bg-slate-950 text-white px-4 py-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
