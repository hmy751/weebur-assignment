import clsx from "clsx";

type CardListProps = {
  type: "grid" | "list";
  cols?: number;
  children: React.ReactNode;
};

export default function CardList({ type, cols = 1, children }: CardListProps) {
  return (
    <>
      {type === "grid" && <GridCardList cols={cols}>{children}</GridCardList>}
    </>
  );
}

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
