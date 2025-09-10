import { Button, Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";

export function Controls() {
  const {
    setRegions,
    isDrawMode,
    setIsDrawMode,
    setStagePos,
    setScale,
    stagePos,
    scale,
  } = useGlobalStore();
  return (
    <Flex direction={"column"} w={"100%"} p={2} gap={4}>
      <Heading color={"black"}>Controls (Scroll to zoom in/out)</Heading>

      <Flex gap={4}>
        {(stagePos.x !== 0 || stagePos.y !== 0 || scale !== 1) && (
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
