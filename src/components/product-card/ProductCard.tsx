import { Rating } from "./rating/Rating";

interface IProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export const ProductCard = (props: IProductCardProps) => {
  const { imageUrl, rating, price, title = "Product Name" } = props;

  return (
    <div className="flex flex-col w-[200px]">
      <div className="relative bg-slate-200 w-[200px] h-[300px] flex justify-center items-center">
        <img
          alt="product"
          src={imageUrl}
          className="w-[80px] h-[120px] object-contain mix-blend-multiply"
        />
        <div className="absolute top-[10px] right-[10px] bg-[#ff8484] text-white px-2 py-[2px] text-sm text-center rounded">
          -10%
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center gap-1">
        <div className="text-sm truncate max-w-[150px] text-ellipsis">
          {title}
        </div>
        <Rating rating={rating} />
        <div className="flex justify-center items-center ">
          <span className="text-sm font-bold">Rs.{price}</span>
          <span className="inline-block mx-1">-</span>
          <span className="text-sm line-through">Rs.{price + 100}</span>
        </div>
      </div>
    </div>
  );
};
