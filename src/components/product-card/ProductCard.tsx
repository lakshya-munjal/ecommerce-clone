import { memo } from "react";
import { Rating } from "./rating/Rating";

interface IProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
}

const RawProductCard = (props: IProductCardProps) => {
  const { imageUrl, rating, price, title = "Product Name" } = props;

  const originalPrice = (price + 25).toFixed(2);
  const discount = ((+originalPrice - price) / +originalPrice) * 100;

  return (
    <div className="flex flex-col w-48 h-80">
      <div className="relative bg-slate-200 w-48 h-60 flex justify-center items-center">
        <img
          alt="product"
          src={imageUrl}
          className="w-20 h-40 object-contain mix-blend-multiply"
        />
        <div className="absolute top-2.5 right-2.5 bg-[#ff8484] text-white px-2 py-[2px] text-sm text-center rounded">
          -{discount.toFixed(0)}%
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center gap-1">
        <div className="text-sm truncate max-w-40 text-ellipsis">{title}</div>
        <Rating rating={rating} />
        <div className="flex justify-center items-center ">
          <span className="text-sm font-bold">Rs.{price.toFixed(2)}</span>
          <span className="inline-block mx-1">-</span>
          <span className="text-sm line-through">Rs.{originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = memo(RawProductCard, (prev, next) => {
  return prev.imageUrl === next.imageUrl;
});
