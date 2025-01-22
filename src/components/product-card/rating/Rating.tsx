import { CiStar } from "react-icons/ci";

const TOTAL = 5;

interface IRatingProps {
  rating: number;
}

export const Rating = (props: IRatingProps) => {
  const { rating } = props;
  const filledRating = Math.round(rating);
  const emptyRating = TOTAL - filledRating;

  const filledStars = Array(filledRating)
    .fill(0)
    .map((_, index) => <CiStar key={index} color="#fcb900" size={20} />);
  const emptyStars = Array(emptyRating)
    .fill(0)
    .map((_, index) => <CiStar key={index} size={20} />);

  return <div className="flex">{filledStars.concat(emptyStars)}</div>;
};
