import React, { useState } from "react";
import type { RegionType } from "../../types/regionTypes";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import { FiTrash2 } from "react-icons/fi";

export function Rectangle({
  region,
  index,
}: {
  region: RegionType;
  index: number;
}) {
  const { updateRegion, deleteRegion } = useGlobalStore();
  const [label, setLabel] = useState(region.label || "");
  const [color, setColor] = useState(region.color);

  return (
    <Flex gap={2} alignItems="center">
      <Text fontSize={"md"} fontWeight={"bold"}>
        {index + 1}
      </Text>
      <Input
        value={label}
        w={"250px"}
        type="text"
        onChange={(e) => setLabel(e.target.value)}
      />
      <Input
        ml={"auto"}
        value={color}
        w={"50px"}
        p={0}
        borderRadius={2}
        type="color"
        onChange={(e) => setColor(e.target.value)}
      />
      <Button
        _hover={{ bg: "gray.100" }}
        bg="white"
        size="md"
        color="black"
        outline="1px solid grey"
        aria-label="Save"
        p={0}
        borderRadius={2}
        onClick={() => {
          updateRegion({ ...region, label, color });
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => deleteRegion(region)}
        _hover={{ bg: "gray.100" }}
        bg="white"
        size="md"
        color="red.500"
        outline="1px solid red"
        aria-label="Delete"
        p={0}
        borderRadius={2}
      >
        <Icon as={FiTrash2} boxSize={5} />
      </Button>
    </Flex>
  );
}
