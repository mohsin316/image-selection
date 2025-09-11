import { Flex } from "@chakra-ui/react";

import { Canvas } from "./components/canvas/Canvas";
import Controls from "./components/controls/Controls";
import { Rectangles } from "./components/rectangles/Rectangles";

function App() {
  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      w={"100%"}
      justify={"center"}
      align={"center"}
      bg={"white"}
    >
      <Flex
        w={"90%"}
        bg="white"
        color={"black"}
        direction={"column"}
        borderRadius={8}
        overflow={"hidden"}
      >
        <Flex w={"100%"}>
          <Canvas />
          <Rectangles />
        </Flex>
        <Controls />
      </Flex>
    </Flex>
  );
}

export default App;
