import { Button, FileUpload, Flex, Input } from "@chakra-ui/react";
import { Layer, Stage, Rect, Image, Group } from "react-konva";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../../utils/mouseMovements";
import type Konva from "konva";
import { useRef, useState } from "react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import type { RegionType } from "../../types/regionTypes";
import { Heading } from "./Heading";

export const Canvas = () => {
  const imageRef = useRef<Konva.Image | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  const {
    regions,
    setRegions,
    isDrawMode,
    stagePos,
    setStagePos,
    scale,
    setScale,
  } = useGlobalStore();
  const [newRegion, setNewRegion] = useState<RegionType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
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
      x:
        -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
      y:
        -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale,
    });
  };
  return (
    <Flex border={"1px solid black"} direction={"column"}>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Heading
          stageRef={stageRef}
          setImage={setImage}
          setStagePos={setStagePos}
          setScale={setScale}
        />
      </Flex>
      <Stage
        onMouseDown={(e) => {
          if (!image || !isDrawMode) return;
          handleMouseDown({
            e,
            setNewRegion,
            setIsDrawing,
            stageRef,
            imageRef,
          });
        }}
        onMouseMove={() => {
          handleMouseMove({ setNewRegion, newRegion, isDrawing, stageRef });
        }}
        onMouseUp={() => {
          handleMouseUp({
            newRegion,
            setNewRegion,
            setIsDrawing,
            setRegions,
            regions,
          });
        }}
        scaleX={scale}
        scaleY={scale}
        x={stagePos.x}
        y={stagePos.y}
        draggable={!isDrawMode}
        onDragEnd={(e) => {
          if (!image || isDrawMode) return;
          setStagePos({ x: e.target.x(), y: e.target.y() });
        }}
        onWheel={(e) => {
          if (!image) return;
          handleWheel(e);
        }}
        width={500}
        height={300}
        ref={stageRef}
      >
        <Layer>
          <Group>
            <Image image={image} width={500} height={300} ref={imageRef} />
            {regions.map((region) => (
              <Rect
                key={region.id}
                {...region}
                stroke={region.color}
                strokeWidth={1}
                draggable={isDrawMode}
              />
            ))}

            {newRegion && (
              <Rect {...newRegion} stroke={"black"} strokeWidth={1} />
            )}
          </Group>
        </Layer>
      </Stage>
    </Flex>
  );
};
