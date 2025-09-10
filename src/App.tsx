import { Flex } from "@chakra-ui/react";

import { Canvas } from "./components/canvas/Canvas";
import Controls from "./components/controls/Controls";

function App() {
  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      bg="white"
      color={"black"}
      justify={"center"}
      align={"center"}
    >
      <Canvas />
      <Controls />
    </Flex>
  );
}

export default App;
