import type Konva from "konva";
import type { RegionType } from "../types/regionTypes";

export const handleMouseDown = ({
  e,
  setNewRegion,
  setIsDrawing,
  stageRef,
  imageRef,
}: {
  e: Konva.KonvaEventObject<MouseEvent>;
  setNewRegion: (region: RegionType) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  imageRef: React.RefObject<Konva.Image | null>;
}) => {
  const stage = stageRef.current;
  const image = imageRef.current;
  // Check if clicked on empty area (the stage itself)
  const clickedOnEmpty = e.target === image;
  if (!clickedOnEmpty) return;

  if (image && stage) {
    const pointerPosition = stage.getRelativePointerPosition();
    if (pointerPosition) {
      const { x, y } = pointerPosition;
      setNewRegion({
        x,
        y,
        width: 0,
        height: 0,
        id: Date.now().toString(),
        color: "#000000",
      });
      setIsDrawing(true);
    }
  }
};

export const handleMouseMove = ({
  setNewRegion,
  newRegion,
  isDrawing,
  stageRef,
}: {
  setNewRegion: (region: RegionType) => void;
  newRegion: RegionType | null;
  isDrawing: boolean;
  stageRef: React.RefObject<Konva.Stage | null>;
}) => {
  if (!newRegion || !isDrawing) return;
  const stage = stageRef.current;
  if (stage) {
    const pointerPosition = stage.getRelativePointerPosition();
    if (pointerPosition) {
      const { x, y } = pointerPosition;
      setNewRegion({
        ...newRegion,
        width: x - newRegion.x,
        height: y - newRegion.y,
      });
    }
  }
};

export const handleMouseUp = ({
  newRegion,
  setNewRegion,
  setIsDrawing,
  setRegions,
  regions,
}: {
  newRegion: RegionType | null;
  setNewRegion: (region: RegionType | null) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setRegions: (regions: RegionType[]) => void;
  regions: RegionType[];
}) => {
  if (newRegion) {
    setRegions([...regions, newRegion]);
  }
  setNewRegion(null);
  setIsDrawing(false);
};
