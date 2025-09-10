import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { State, Actions } from "../../types/zustandTypes";

export const useGlobalStore = create<State & Actions>()(
  immer((set) => ({
    regions: [],

    setRegions: (regions) => {
      return set((state) => {
        state.regions = regions;
      });
    },
  }))
);
