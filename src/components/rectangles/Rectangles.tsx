import { Flex, Heading } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import { Rectangle } from "./Rectangle";
import { CANVAS_HEIGHT } from "../../utils/common";

export function Rectangles() {
  const { regions } = useGlobalStore();
  return (
    <Flex
      border={"1px solid black"}
      direction={"column"}
      w={"100%"}
      overflowY={"scroll"}
      maxH={540}
    >
      {regions.map((region, index) => (
        <Rectangle key={region.id} region={region} index={index} />
      ))}
    </Flex>
  );
}
