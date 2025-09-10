import { Button, Heading, FileUpload, Flex } from "@chakra-ui/react";
import type Konva from "konva";
import { handleExport, handleFileChange } from "../../utils/ImageHandling";
import { HiUpload } from "react-icons/hi";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
export function CanvasHeading({
  stageRef,
  setImage,
  image,
  setStagePos,
  setScale,
}: {
  stageRef: React.RefObject<Konva.Stage | null>;
  setImage: (image: HTMLImageElement) => void;
  image: HTMLImageElement | undefined;
  setStagePos: (stagePos: { x: number; y: number }) => void;
  setScale: (scale: number) => void;
}) {
  const { setRegions } = useGlobalStore();
  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"} p={2} gap={4}>
      <Heading color={"black"}>Image Modifier</Heading>
      <Button
        ml={"auto"}
        disabled={!image}
        onClick={() => handleExport({ stageRef })}
        variant={"plain"}
        color={"black"}
        outline={"1px solid black"}
      >
        Export
      </Button>
      <FileUpload.Root maxWidth={"fit-content"} accept={["image/png"]}>
        <FileUpload.HiddenInput
          onChange={(e) => {
            setRegions([]);
            setStagePos({ x: 0, y: 0 });
            setScale(1);
            handleFileChange({ e, setImage });
          }}
        />
        <FileUpload.Trigger asChild>
          <Button variant={"plain"} color={"black"} outline={"1px solid black"}>
            <HiUpload /> Upload file
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Root>
    </Flex>
  );
}
