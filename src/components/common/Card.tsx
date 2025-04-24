import Image from "next/image";
import { Review } from "@/libs/type";

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

type GridCardProps = Omit<CardProps, "type">;

function GridCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: GridCardProps) {
  return (
    <div className="w-full h-full">
      <Image
        className="w-full h-full"
        src={thumbnail}
        alt="card"
        width={100}
        height={100}
      />
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

function ListCard({ title, description, thumbnail }: ListCardProps) {
  return <div>ListCard</div>;
}
