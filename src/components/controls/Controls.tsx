import { Button, Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { handleExport } from "../../utils/ImageHandling";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";

export function Controls() {
  const { setRegions } = useGlobalStore();
  return (
    <Flex
      border={"1px solid black"}
      w={"500px"}
      h={"100px"}
      direction={"column"}
    >
      <Heading color={"black"}>Controls</Heading>

      <Flex gap={2}>
        {" "}
        <Button
          onClick={() => setRegions([])}
          variant={"plain"}
          color={"black"}
          outline={"1px solid black"}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
}

export default Controls;
