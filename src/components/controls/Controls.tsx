import { Button, Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useGlobalStore } from "../../hooks/zustand/useGlobalStore";
import * as Sentry from "@sentry/react";
import { handleDummyApiCall, handleDummyFetchRequest } from "../../api/dummy";
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

  const callDummyPromise = async () => {
    try {
      const response = await handleDummyApiCall();
      console.log(response);
    } catch (error: any) {
      // // Send a log before throwing the error
      Sentry.logger.info("User called dummy promise call", {
        action: "test_error_button_click",
      });
      throw new Error(error); // // Send a log before throwing the error
    }
  };

  const callDummyFetchRequest = async () => {
    try {
      const response = await handleDummyFetchRequest();
      console.log(response);
    } catch (error: any) {
      Sentry.logger.info("User called dummy fetch request", {
        action: "test_error_button_click",
      });
      throw new Error(error); // // Send a log before throwing the error
    }
  };

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      p={2}
      pb={4}
      pl={4}
      gap={4}
      bg={"gray.100"}
      borderTop={"1px solid lightgray"}
    >
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
        <button
          onClick={() => {
            // // Send a log before throwing the error
            // Sentry.logger.info('User triggered test error', {
            //   action: 'test_error_button_click',

            // });
            throw new Error("This is your first error!");
          }}
        >
          Break the world
        </button>
        <Button
          onClick={() => {
            // setRegions([]);
            // setStagePos({ x: 0, y: 0 });
            // setScale(1);
            throw new Error("This is your second error!");
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
        <Button
          onClick={() => {
            callDummyPromise();
          }}
        >
          {" "}
          Dummy promise Call
        </Button>
        <Button
          onClick={() => {
            callDummyFetchRequest();
          }}
        >
          {" "}
          Dummy Fetch Request
        </Button>
      </Flex>
    </Flex>
  );
}

export default Controls;
