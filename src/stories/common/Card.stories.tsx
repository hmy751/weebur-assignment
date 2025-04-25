import type { Meta } from "@storybook/react";

import Card from "@/components/common/Card";
import { ProductResponse } from "@/libs/type";
import fetcher from "@/apis/fetcher";
import { useQuery } from "@tanstack/react-query";

const meta = {
  title: "Common/Card",
  component: Card,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="w-full h-full p-lg ">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

const GridTypeStoryComponent = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher.get<{ products: ProductResponse[] }>("products"),
  });

  if (!data) return null;

  return (
    <Card
      id={data?.products[0].id}
      type="grid"
      title={data?.products[0].title}
      description={data?.products[0].description}
      thumbnail={data?.products[0].thumbnail}
      rating={data?.products[0].rating}
      reviews={data?.products[0].reviews}
    />
  );
};

export const GridType = {
  parameters: {
    layout: "centered",
  },
  render: () => <GridTypeStoryComponent />,
};

const ListTypeStoryComponent = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher.get<{ products: ProductResponse[] }>("products"),
  });

  if (!data) return null;

  return (
    <Card
      id={data?.products[0].id}
      type="list"
      title={data?.products[0].title}
      description={data?.products[0].description}
      thumbnail={data?.products[0].thumbnail}
      rating={data?.products[0].rating}
      reviews={data?.products[0].reviews}
    />
  );
};

export const ListType = {
  parameters: {
    layout: "centered",
  },
  render: () => <ListTypeStoryComponent />,
};
