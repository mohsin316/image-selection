import { Button, Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { handleExport } from "../../utils/ImageHandling";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";

export function Controls() {
  const {
    setRegions,
    isDrawMode,
    setIsDrawMode,
    setStagePos,
    setScale,
    stagePos,
  } = useGlobalStore();
  return (
    <Flex
      border={"1px solid black"}
      w={"500px"}
      h={"100px"}
      direction={"column"}
    >
      <Heading color={"black"}>Controls</Heading>

      <Flex gap={2}>
        {stagePos.x !== 0 && stagePos.y !== 0 && (
          <Button
            onClick={() => {
              setStagePos({ x: 0, y: 0 });
              setScale(1);
            }}
            variant={"plain"}
            color={"black"}
            outline={"1px solid black"}
          >
            Fit to screen
          </Button>
        )}
        <Button
          onClick={() => {
            setRegions([]);
            setStagePos({ x: 0, y: 0 });
            setScale(1);
          }}
          variant={"plain"}
          color={"black"}
          outline={"1px solid black"}
        >
          Reset
        </Button>
        <Button
          onClick={() => setIsDrawMode(!isDrawMode)}
          variant={"plain"}
          color={isDrawMode ? "green" : "black"}
          outline={isDrawMode ? "1px solid green" : "1px solid black"}
        >
          Draw Mode
        </Button>
      </Flex>
    </Flex>
  );
}

export default Controls;
