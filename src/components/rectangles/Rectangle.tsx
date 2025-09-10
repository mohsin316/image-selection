import React, { useState } from "react";
import type { RegionType } from "../../types/regionTypes";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";

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
    <Flex>
      {index + 1}
      <Input
        value={label}
        type="text"
        onChange={(e) => setLabel(e.target.value)}
      />
      <Input
        value={color}
        type="color"
        onChange={(e) => setColor(e.target.value)}
      />
      <Button
        onClick={() => {
          updateRegion({ ...region, label, color });
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          deleteRegion(region);
        }}
      >
        Delete
      </Button>
    </Flex>
  );
}
