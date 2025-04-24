type ViewTypeData = {
  viewType: "grid" | "list";
  timestamp: number;
};

const getRandomViewType = (): "grid" | "list" => {
  return Math.random() < 0.5 ? "grid" : "list";
};

const isExpired = (timestamp: number) => {
  return timestamp < Date.now() - 1000 * 60 * 60 * 24;
};

export const getViewType = (): "grid" | "list" => {
  const viewTypeData = localStorage.getItem("viewType");

  if (!viewTypeData) {
    const newViewType = getRandomViewType();
    localStorage.setItem(
      "viewType",
      JSON.stringify({
        viewType: newViewType,
        timestamp: Date.now(),
      })
    );

    return newViewType;
  }

  const parsedViewTypeData = JSON.parse(viewTypeData) as ViewTypeData;
  const { viewType, timestamp } = parsedViewTypeData;

  if (isExpired(timestamp)) {
    const newViewType = getRandomViewType();
    localStorage.setItem(
      "viewType",
      JSON.stringify({
        viewType: newViewType,
        timestamp: Date.now(),
      })
    );

    return newViewType;
  }

  return viewType;
};
