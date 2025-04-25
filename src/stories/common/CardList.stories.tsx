import type { Meta } from "@storybook/react";
import { useQuery } from "@tanstack/react-query";

import CardList from "@/components/common/CardList";
import fetcher from "@/apis/fetcher";
import { ProductResponse } from "@/libs/type";
import Card, { CardSkeleton } from "@/components/common/Card";

const meta = {
  title: "Common/CardList",
  component: CardList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CardList>;

export default meta;

const GridCardListComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher.get<{ products: ProductResponse[] }>("products"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <CardList type="grid" cols={4}>
      {data.products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          type="grid"
          title={product.title}
          description={product.description}
          thumbnail={product.thumbnail}
          rating={product.rating}
          reviews={product.reviews}
        />
      ))}
    </CardList>
  );
};

export const GridType = {
  render: () => <GridCardListComponent />,
};

const ListCardListComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher.get<{ products: ProductResponse[] }>("products"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <CardList type="list">
      {data.products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          type="list"
          title={product.title}
          description={product.description}
          thumbnail={product.thumbnail}
          rating={product.rating}
          reviews={product.reviews}
        />
      ))}
    </CardList>
  );
};

export const ListType = {
  render: () => <ListCardListComponent />,
};

export const GridTypeSkeleton = {
  render: () => {
    return (
      <CardList type="grid" cols={4}>
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
      </CardList>
    );
  },
};

export const ListTypeSkeleton = {
  render: () => {
    return (
      <CardList type="list">
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
        <CardSkeleton type="list" />
      </CardList>
    );
  },
};
