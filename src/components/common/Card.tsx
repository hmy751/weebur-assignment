import { memo } from "react";
import Image from "next/image";
import { Review } from "@/libs/type";
import clsx from "clsx";

type CardProps = {
  id: number;
  type: "grid" | "list";
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
};

function Card({
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

const CardSkeletonStyle = "bg-gray-200 rounded-md animate-pulse";

const CardImageBoxStyle = "relative overflow-hidden";
const CardImageHoverStyle = "hover:scale-105 transition-all duration-300";
const CardImageShadowStyle = "shadow-md";

export const CardSkeleton = ({ type }: { type: "grid" | "list" }) => {
  return (
    <>
      {type === "grid" && <GridTypeSkeleton />}
      {type === "list" && <ListTypeSkeleton />}
    </>
  );
};

export const ListTypeSkeleton = () => {
  return (
    <div className="flex flex-row gap-lg cursor-pointer">
      <div
        className={clsx(
          "w-100 h-100 min-w-100 min-h-100",
          CardImageBoxStyle,
          CardSkeletonStyle
        )}
      >
        <div className={clsx("w-full h-full")} />
      </div>
      <div className="flex flex-1 flex-col gap-2 justify-center">
        <div className={clsx(["w-1/2 h-md", CardSkeletonStyle])}></div>
        <div className={clsx(["w-full h-lg", CardSkeletonStyle])}></div>
        <div className={clsx(["w-20 h-md", CardSkeletonStyle])}></div>
        <div className={clsx(["w-20 h-md", CardSkeletonStyle])}></div>
      </div>
    </div>
  );
};

export const GridTypeSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full cursor-pointer">
      <div
        className={clsx(
          "w-full aspect-square",
          CardImageBoxStyle,
          CardSkeletonStyle
        )}
      >
        <div className={clsx("w-full h-full")} />
      </div>
      <div className="flex flex-col gap-2">
        <div className={clsx(["w-1/2 h-md", CardSkeletonStyle])}></div>
        <div className={clsx(["w-full h-lg", CardSkeletonStyle])}></div>
        <div className={clsx(["w-20 h-md", CardSkeletonStyle])}></div>
        <div className={clsx(["w-20 h-md", CardSkeletonStyle])}></div>
      </div>
    </div>
  );
};

export default memo(Card, (prev, next) => {
  if (prev.id !== next.id) {
    return false;
  }

  if (prev.type !== next.type) {
    return false;
  }

  if (prev.title !== next.title) {
    return false;
  }

  return true;
});

type GridCardProps = Omit<CardProps, "type" | "id">;

function GridCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: GridCardProps) {
  return (
    <div className="w-full h-full cursor-pointer">
      <div
        className={clsx(
          "w-full aspect-square",
          CardImageBoxStyle,
          CardImageShadowStyle
        )}
      >
        <Image
          className={clsx("w-full h-full", CardImageHoverStyle)}
          src={thumbnail}
          alt="card"
          width={0}
          height={0}
          sizes="150px"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold line-clamp-1">{title}</div>
        <div className="text-sm text-gray-500 line-clamp-2">{description}</div>
        <div className="flex items-center gap-2"></div>
        <div className="text-sm text-gray-500">평점 {rating}</div>
        <div className="text-sm text-gray-500">후기 {reviews?.length}개</div>
      </div>
    </div>
  );
}

type ListCardProps = Omit<CardProps, "type" | "id">;

function ListCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
}: ListCardProps) {
  return (
    <div className="flex flex-row gap-lg cursor-pointer">
      <div
        className={clsx(
          "w-100 h-100 min-w-100 min-h-100",
          CardImageBoxStyle,
          CardImageShadowStyle
        )}
      >
        <Image
          src={thumbnail}
          className={clsx("w-full h-full", CardImageHoverStyle)}
          alt="card"
          width={0}
          height={0}
          sizes="150px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 justify-center">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
        <div className="text-sm text-gray-500">평점 {rating}</div>
        <div className="text-sm text-gray-500">후기 {reviews?.length}개</div>
      </div>
    </div>
  );
}
