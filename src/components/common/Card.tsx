import Image from "next/image";
import { Review } from "@/libs/type";
import clsx from "clsx";

type CardProps = {
  type: "grid" | "list";
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
};

export default function Card({
  type,
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: CardProps) {
  return (
    <>
      {type === "grid" && (
        <GridCard
          title={title}
          description={description}
          thumbnail={thumbnail}
          rating={rating}
          reviews={reviews}
        />
      )}
      {type === "list" && (
        <ListCard
          title={title}
          description={description}
          thumbnail={thumbnail}
          rating={rating}
          reviews={reviews}
        />
      )}
    </>
  );
}

const CardHoverStyle = "hover:scale-105 transition-all duration-300";

type GridCardProps = Omit<CardProps, "type">;

function GridCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: GridCardProps) {
  return (
    <div className="w-full h-full cursor-pointer">
      <div className={clsx("w-full relative aspect-square", CardHoverStyle)}>
        <Image
          className="w-full h-full"
          src={thumbnail}
          alt="card"
          width={0}
          height={0}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
        <div className="flex items-center gap-2"></div>
        <div className="text-sm text-gray-500">평점 {rating}</div>
        <div className="text-sm text-gray-500">후기 {reviews?.length}개</div>
      </div>
    </div>
  );
}

type ListCardProps = Omit<CardProps, "type">;

function ListCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: ListCardProps) {
  return (
    <div className="flex flex-row gap-2 cursor-pointer">
      <div
        className={clsx(
          "w-100 h-100 relative min-w-100 min-h-100",
          CardHoverStyle
        )}
      >
        <Image src={thumbnail} alt="card" width={0} height={0} fill />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
        <div className="text-sm text-gray-500">평점 {rating}</div>
        <div className="text-sm text-gray-500">후기 {reviews?.length}개</div>
      </div>
    </div>
  );
}
