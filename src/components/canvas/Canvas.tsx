import { Button, FileUpload, Flex, Heading, Input } from "@chakra-ui/react";
import { Layer, Stage, Rect, Image } from "react-konva";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../../utils/mouseMovements";
import type Konva from "konva";
import { useRef, useState } from "react";
import useImage from "use-image";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import type { RegionType } from "../../types/regionTypes";
import { handleExport, handleFileChange } from "../../utils/ImageHandling";
import { HiUpload } from "react-icons/hi";

export const Canvas = () => {
  const imageRef = useRef<Konva.Image | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  const { regions, setRegions } = useGlobalStore();
  const [newRegion, setNewRegion] = useState<RegionType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <Flex border={"1px solid black"} direction={"column"}>
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Heading color={"black"}>Canvas</Heading>
        <Button
          ml={"auto"}
          onClick={() => handleExport({ stageRef })}
          variant={"plain"}
          color={"black"}
          outline={"1px solid black"}
        >
          Export
        </Button>
        <FileUpload.Root maxWidth={"fit-content"} accept={["image/png"]}>
          <FileUpload.HiddenInput
            onChange={(e) => handleFileChange({ e, setImage })}
          />
          <FileUpload.Trigger asChild>
            <Button
              variant={"plain"}
              color={"black"}
              outline={"1px solid black"}
            >
              <HiUpload /> Upload file
            </Button>
          </FileUpload.Trigger>
        </FileUpload.Root>
      </Flex>
      <Stage
        onMouseDown={(e) => {
          if (!image) return;
          handleMouseDown({
            e,
            setNewRegion,
            setIsDrawing,
            stageRef,
            imageRef,
          });
        }}
        onMouseMove={() =>
          handleMouseMove({ setNewRegion, newRegion, isDrawing, stageRef })
        }
        onMouseUp={() =>
          handleMouseUp({
            newRegion,
            setNewRegion,
            setIsDrawing,
            setRegions,
            regions,
          })
        }
        width={500}
        height={300}
        ref={stageRef}
      >
        <Layer>
          <Image image={image} width={500} height={300} ref={imageRef} />
        </Layer>
        <Layer>
          {regions.map((region) => (
            <Rect
              key={region.id}
              {...region}
              stroke={region.color}
              strokeWidth={1}
              draggable
            />
          ))}

          {newRegion && (
            <Rect {...newRegion} stroke={"black"} strokeWidth={1} />
          )}
        </Layer>
      </Stage>
    </Flex>
  );
};
