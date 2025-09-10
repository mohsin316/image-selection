import type { RegionType } from "./regionTypes";

export type State = {
  regions: RegionType[];
};

export type Actions = {
  setRegions: (regions: RegionType[]) => void;
};
