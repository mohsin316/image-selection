import type { RegionType } from "./regionTypes";

export type State = {
  regions: RegionType[];
  isDrawMode: boolean;
  stagePos: { x: number; y: number };
  scale: number;
};

export type Actions = {
  setRegions: (regions: RegionType[]) => void;
  addRegion: (region: RegionType) => void;
  updateRegion: (region: RegionType) => void;
  deleteRegion: (region: RegionType) => void;
  setIsDrawMode: (isDrawMode: boolean) => void;
  setStagePos: (stagePos: { x: number; y: number }) => void;
  setScale: (scale: number) => void;
};
