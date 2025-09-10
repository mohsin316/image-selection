import { Button, Flex, Text, HStack, Box, Heading } from "@chakra-ui/react";
import type Konva from "konva";
import { useRef, useState } from "react";
import { Layer, Rect, Stage, Text as KonvaText, Image } from "react-konva";
import useImage from "use-image";
type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};

function App() {
  const [rects, setRects] = useState<RectType[]>([]);
  const [newRect, setNewRect] = useState<RectType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function downloadURI(uri: string, name: string): void {
    const link: HTMLAnchorElement = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const stageRef = useRef<Konva.Stage | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    const image = imageRef.current;
    // Check if clicked on empty area (the stage itself)
    const clickedOnEmpty = e.target === image;

    if (!clickedOnEmpty) return;

    if (image && stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const { x, y } = pointerPosition;
        setNewRect({ x, y, width: 0, height: 0, id: Date.now().toString() });
        setIsDrawing(true);
      }
    }
  };

  const handleMouseMove = () => {
    if (!newRect || !isDrawing) return;
    const stage = stageRef.current;
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const { x, y } = pointerPosition;
        setNewRect({
          ...newRect,
          width: x - newRect.x,
          height: y - newRect.y,
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (newRect) {
      setRects([...rects, newRect]);
    }
    setNewRect(null);
    setIsDrawing(false);
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    const link: HTMLAnchorElement = document.createElement("a");
    const uri = stageRef.current.toDataURL();

    link.download = "stage.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [vaderImage] = useImage(
    "https://konvajs.org/assets/darth-vader.jpg",
    "anonymous"
  );

  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      bg="white"
      color={"black"}
      justify={"center"}
      align={"center"}
    >
      <Flex border={"1px solid black"} direction={"column"}>
        <Heading color={"black"}>Canvas</Heading>
        <Stage
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          width={500}
          height={300}
          style={{
            background: "#f0f0f0",
          }}
          ref={stageRef}
        >
          <Layer>
            <Image image={vaderImage} width={500} height={300} ref={imageRef} />
          </Layer>
          <Layer>
            {rects.map((rect) => (
              <Rect
                key={rect.id}
                {...rect}
                stroke={"black"}
                strokeWidth={1}
                draggable
              />
            ))}

            {newRect && <Rect {...newRect} stroke={"black"} strokeWidth={1} />}
          </Layer>
        </Stage>{" "}
      </Flex>
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
            onClick={() => setRects([])}
            variant={"plain"}
            color={"black"}
            outline={"1px solid black"}
          >
            Reset
          </Button>
          <Button
            onClick={() => handleExport()}
            variant={"plain"}
            color={"black"}
            outline={"1px solid black"}
          >
            Export
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
