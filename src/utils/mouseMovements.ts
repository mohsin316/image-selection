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
        label: "",
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
  addRegion,
}: {
  newRegion: RegionType | null;
  setNewRegion: (region: RegionType | null) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  addRegion: (region: RegionType) => void;
}) => {
  if (newRegion) {
    addRegion(newRegion);
  }
  setNewRegion(null);
  setIsDrawing(false);
};

export const handleWheel = ({
  e,
  stageRef,
  setScale,
  setStagePos,
}: {
  e: Konva.KonvaEventObject<WheelEvent>;
  stageRef: React.RefObject<Konva.Stage | null>;
  setScale: (scale: number) => void;
  setStagePos: (stagePos: { x: number; y: number }) => void;
}) => {
  e.evt.preventDefault();

  const stage = stageRef.current;
  if (!stage) return;

  const scaleBy = 1.05;
  const oldScale = stage.scaleX();

  // mouse position relative to stage
  const mousePointTo = {
    x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
    y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
  };

  // zoom in or out
  const direction = e.evt.deltaY > 0 ? -1 : 1;
  const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  setScale(newScale);

  // adjust position so zoom is focused on mouse pointer
  setStagePos({
    x: -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
    y: -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale,
  });
};
