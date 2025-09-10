import { Flex, Heading } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import { Rectangle } from "./Rectangle";
import { CANVAS_HEIGHT } from "../../utils/common";

export function Rectangles() {
  const { regions } = useGlobalStore();
  return (
    <Flex
      flexBasis={"40%"}
      bg={"gray.100"}
      direction={"column"}
      w={"100%"}
      overflowY={"scroll"}
      maxH={557}
      p={4}
      gap={4}
    >
      {regions.map((region, index) => (
        <Rectangle key={region.id} region={region} index={index} />
      ))}
    </Flex>
  );
}
