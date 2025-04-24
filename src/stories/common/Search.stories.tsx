import type { Meta } from "@storybook/react";

import Search from "@/components/common/Search";

const meta = {
  title: "Common/Search",
  component: Search,
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
} satisfies Meta<typeof Search>;

export default meta;

export const Primary = {
  render: () => <Search />,
};
