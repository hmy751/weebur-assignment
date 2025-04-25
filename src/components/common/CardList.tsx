import clsx from "clsx";
import { CardSkeleton } from "./Card";

type CardListProps = {
  type: "grid" | "list";
  cols?: number;
  children: React.ReactNode;
};

function CardList({ type, cols = 1, children }: CardListProps) {
  return (
    <>
      {type === "grid" && <GridCardList cols={cols}>{children}</GridCardList>}
      {type === "list" && <ListCardList>{children}</ListCardList>}
    </>
  );
}

function Skeleton({ type, cols }: { type: "grid" | "list"; cols?: number }) {
  return (
    <>
      {type === "grid" && <GridCardListSkeleton cols={cols!} />}
      {type === "list" && <ListCardListSkeleton />}
    </>
  );
}

CardList.Skeleton = Skeleton;

export default CardList;

type GridCardListProps = Omit<CardListProps, "type">;

const GridCardList = ({ cols, children }: GridCardListProps) => {
  return (
    <div
      className={clsx(`grid  gap-lg`, "w-full")}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

const GridCardListSkeleton = ({ cols }: { cols: number }) => {
  return (
    <div
      className={clsx(`grid  gap-lg`, "w-full")}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
      <CardSkeleton type="grid" />
    </div>
  );
};

type ListCardListProps = Omit<CardListProps, "type">;

const ListCardList = ({ children }: ListCardListProps) => {
  return (
    <div className={clsx(`flex flex-col gap-lg`, "w-full")}>{children}</div>
  );
};

const ListCardListSkeleton = () => {
  return (
    <div className={clsx(`flex flex-col gap-lg`, "w-full")}>
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
      <CardSkeleton type="list" />
    </div>
  );
};
