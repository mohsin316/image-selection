import { Button, Heading as ChakraHeading, FileUpload } from "@chakra-ui/react";
import type Konva from "konva";
import { handleExport, handleFileChange } from "../../utils/ImageHandling";
import { HiUpload } from "react-icons/hi";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
export function Heading({
  stageRef,
  setImage,
  setStagePos,
  setScale,
}: {
  stageRef: React.RefObject<Konva.Stage | null>;
  setImage: (image: HTMLImageElement) => void;
  setStagePos: (stagePos: { x: number; y: number }) => void;
  setScale: (scale: number) => void;
}) {
  const { setRegions } = useGlobalStore();
  return (
    <>
      <ChakraHeading color={"black"}>Canvas</ChakraHeading>
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
          onChange={(e) => {
            setRegions([]);

            handleFileChange({ e, setImage });
          }}
        />
        <FileUpload.Trigger asChild>
          <Button variant={"plain"} color={"black"} outline={"1px solid black"}>
            <HiUpload /> Upload file
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Root>
    </>
  );
}
