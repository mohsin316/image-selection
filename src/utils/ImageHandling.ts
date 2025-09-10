import type Konva from "konva";

export const handleExport = ({
  stageRef,
}: {
  stageRef: React.RefObject<Konva.Stage | null>;
}) => {
  if (!stageRef.current) return;
  const link: HTMLAnchorElement = document.createElement("a");
  const uri = stageRef.current.toDataURL();

  link.download = "stage.png";
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleFileChange = ({
  e,
  setImage,
}: {
  e: React.ChangeEvent<HTMLInputElement>;
  setImage: (image: HTMLImageElement) => void;
}) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new window.Image();
    img.src = reader.result as string;
    img.onload = () => setImage(img);
  };
  reader.readAsDataURL(file);
};
