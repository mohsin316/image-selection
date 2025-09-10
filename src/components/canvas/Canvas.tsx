import { Flex, Heading } from "@chakra-ui/react";
import { Layer, Stage, Rect, Image, Group, Text } from "react-konva";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
} from "../../utils/mouseMovements";
import type Konva from "konva";
import { useRef, useState } from "react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import type { RegionType } from "../../types/regionTypes";
import { CanvasHeading } from "./CanvasHeading";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../utils/common";

export const Canvas = () => {
  const imageRef = useRef<Konva.Image | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);

  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [newRegion, setNewRegion] = useState<RegionType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const {
    regions,
    addRegion,
    isDrawMode,
    stagePos,
    setStagePos,
    scale,
    setScale,
  } = useGlobalStore();

  return (
    <Flex border={"1px solid black"} direction={"column"} w={"100%"}>
      <CanvasHeading
        stageRef={stageRef}
        image={image}
        setImage={setImage}
        setStagePos={setStagePos}
        setScale={setScale}
      />

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
            addRegion,
          });
        }}
        onWheel={(e) => {
          if (!image) return;
          handleWheel({ e, stageRef, setScale, setStagePos });
        }}
        onDragEnd={(e) => {
          if (!image || isDrawMode) return;
          setStagePos({ x: e.target.x(), y: e.target.y() });
        }}
        scaleX={scale}
        scaleY={scale}
        x={stagePos.x}
        y={stagePos.y}
        draggable={!isDrawMode}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={stageRef}
        style={{ cursor: !isDrawMode ? "grab" : "default" }}
      >
        <Layer>
          <Group>
            <Image
              image={image}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              ref={imageRef}
            />
            {regions.map((region) => (
              <Group
                key={region.id}
                draggable={isDrawMode}
                x={region.x}
                y={region.y}
              >
                <Rect
                  width={region.width}
                  height={region.height}
                  stroke={region.color}
                  strokeWidth={1}
                />
                <Group x={0} y={-20}>
                  <Rect
                    fill={region.color}
                    width={region.label ? region.label.length * 8 + 12 : 0}
                    height={20}
                    cornerRadius={4}
                  />
                  <Text
                    text={region.label}
                    fontSize={14}
                    fill="white"
                    x={6}
                    y={3}
                  />
                </Group>
              </Group>
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
