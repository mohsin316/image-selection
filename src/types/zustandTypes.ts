import type { RegionType } from "./regionTypes";

export type State = {
  regions: RegionType[];
  isDrawMode: boolean;
  stagePos: { x: number; y: number };
  scale: number;
};

export type Actions = {
  setRegions: (regions: RegionType[]) => void;
  setIsDrawMode: (isDrawMode: boolean) => void;
  setStagePos: (stagePos: { x: number; y: number }) => void;
  setScale: (scale: number) => void;
};
