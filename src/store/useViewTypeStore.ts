import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ViewType = "grid" | "list";

type ViewTypeStore = {
  viewType: ViewType | null;
  timestamp: number;
  setViewTypeData: (viewType: ViewType, timestamp: number) => void;
};

const getRandomViewType = (): ViewType => {
  return Math.random() < 0.5 ? "grid" : "list";
};

const isExpired = (timestamp: number) => {
  return timestamp < Date.now() - 1000 * 60 * 60 * 24;
};

export const useViewTypeStore = create<ViewTypeStore>()(
  persist(
    (set) => ({
      viewType: null,
      timestamp: Date.now(),
      setViewTypeData: (viewType, timestamp) =>
        set({
          viewType,
          timestamp,
        }),
    }),
    {
      name: "viewType-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ viewType: state.viewType, timestamp: state.timestamp }),
      onRehydrateStorage: () => (state) => {
        if (!state?.viewType) {
          state?.setViewTypeData(getRandomViewType(), Date.now());
          return;
        }

        if (isExpired(state.timestamp)) {
          state.setViewTypeData(getRandomViewType(), Date.now());
        }
      },
    }
  )
);