import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { State, Actions } from "../../types/zustandTypes";

export const useGlobalStore = create<State & Actions>()(
  immer((set) => ({
    regions: [],
    isDrawMode: false,
    stagePos: { x: 0, y: 0 },
    scale: 1,
    setRegions: (regions) => {
      return set((state) => {
        state.regions = regions;
      });
    },
    setIsDrawMode: (isDrawMode) => {
      return set((state) => {
        state.isDrawMode = isDrawMode;
      });
    },
    setStagePos: (stagePos) => {
      return set((state) => {
        state.stagePos = stagePos;
      });
    },
    setScale: (scale) => {
      return set((state) => {
        state.scale = scale;
      });
    },
  }))
);
