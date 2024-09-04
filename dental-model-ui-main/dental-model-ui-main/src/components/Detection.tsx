import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Line, Text } from "react-konva";
import HoverCircle from "./HoverCircle";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaEye, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import IconButton from "./IconButton";
import SliderButton from "./SliderButton";
import Konva from "konva";
import useImage from "use-image";
import ReportModal from "./RepotModal";

type PredictionTypes = {
  x: number;
  y: number;
  width: number;
  height: number;
  teeth_number: number;
};

type Props = {
  imageSrc: string; // Change from `image: any` to `imageSrc: string`
  predictions: PredictionTypes[];
};

interface PredictionType {
  x: number;
  y: number;
  width: number;
  height: number;
  teeth_number: number;
}

const Detection: React.FC<Props> = ({ imageSrc, predictions }) => {
  const [image] = useImage(imageSrc);
  const stageRef = useRef<Konva.Stage>(null);
  const imageRef = useRef<Konva.Image>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [contrast, setContrast] = useState(0);
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findings] = useState([]);
  const [recommendations] = useState([]);
  const [selected, setSelected] = useState<PredictionType>({
    height: 0,
    teeth_number: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const handleCircleClick = (_x: number, _y: number, e: any, _value: any) => {
    const zoomLevel = 4;
    setScale(zoomLevel); // Adjust the zoom level as needed
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    setPosition({
      x: -pointerPosition.x * zoomLevel + window.innerWidth / 2,
      y: -pointerPosition.y * zoomLevel + window.innerHeight / 2,
    }); // Center the clicked point
    setSelected(_value);
    setIsModalOpen(true);
  };

  const handleStageClick = (e: any) => {
    if (e.target.attrs.name !== "circle") {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleDragEnd = (e: any) => {
    setPosition({ x: e.target.x(), y: e.target.y() });
  };

  const handleDragMove = (e: any) => {
    setPosition({ x: e.target.x(), y: e.target.y() });
  };

  const handleZoom = (zoomIn: boolean) => {
    const stage = stageRef.current;
    if (stage) {
      const oldScale = stage.scaleX();
      const newScale = zoomIn ? oldScale * 1.2 : oldScale / 1.2;
      setScale(newScale);

      const mousePointTo = {
        x: stage.width() / 2 / oldScale - stage.x() / oldScale,
        y: stage.height() / 2 / oldScale - stage.y() / oldScale,
      };

      const newPos = {
        x: -(mousePointTo.x - stage.width() / 2 / newScale) * newScale,
        y: -(mousePointTo.y - stage.height() / 2 / newScale) * newScale,
      };

      stage.scale({ x: newScale, y: newScale });
      stage.position(newPos);
      stage.batchDraw();
    }
  };

  const renderScale = () => {
    const scaleLines = [];
    const unitLength = 50; // Length of each unit in pixels
    const numUnits = Math.floor(imageWidth / unitLength);

    console.log(imageWidth);

    for (let i = 0; i <= numUnits; i++) {
      const x = i * unitLength;
      scaleLines.push(
        <Line
          key={`line-${i}`}
          points={[x, imageHeight, x, imageHeight - 10]}
          stroke="black"
          strokeWidth={5}
        />,
      );
      scaleLines.push(
        <Text
          key={`text-${i}`}
          x={x}
          y={imageHeight - 25}
          text={`${i}`}
          fontSize={12}
          fill="black"
          align="center"
        />,
      );
    }
    return scaleLines;
  };

  useEffect(() => {
    if (image) {
      setImageWidth(image.width);
      setImageHeight(image.height);
      setIsImageLoaded(true);
    }
  }, [image]);

  useEffect(() => {
    if (isImageLoaded && imageRef.current) {
      imageRef.current.cache();
      imageRef.current.filters([Konva.Filters.Contrast]);
      imageRef.current.contrast(contrast);
      imageRef.current.getLayer()?.batchDraw();
    }
  }, [isImageLoaded, contrast]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full content-center justify-center">
        <div className="flex flex-row gap-x-3 absolute rounded top-[4.5rem] self-center justify-center text-white font-bold px-3 w-fit h-[45px] bg-[#17161680] z-40 items-center">
          <span>Female</span>
          <span>10Y</span>
          <span>XRay</span>
          <FaArrowLeftLong className="text-white" size={15} />
          <span>Tooth 27</span>
          <FaArrowRightLong className="text-white" size={15} />
          <IoCloseSharp className="text-white" size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 absolute top-[5rem] right-0 w-[100px] h-[500px] bg-transparent z-40 items-center">
        <IconButton>
          <FaEye className="text-white" size={15} />
        </IconButton>
        <SliderButton value={contrast} setValue={setContrast} />
        <IconButton onClick={() => handleZoom(true)}>
          <FaPlus className="text-white" size={15} />
        </IconButton>
        <IconButton onClick={() => handleZoom(false)}>
          <FaMinus className="text-white" size={15} />
        </IconButton>
      </div>
      <Stage
        ref={stageRef}
        draggable
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onClick={handleStageClick}
      >
        <Layer>
          <KonvaImage
            image={image}
            width={imageWidth}
            height={imageHeight}
            ref={imageRef}
          />
          {predictions.map((prediction, index) => (
            <HoverCircle
              key={index}
              data={prediction}
              onClick={(_x, _y, e) => handleCircleClick(_x, _y, e, prediction)}
            />
          ))}
        </Layer>
        <Layer>{imageWidth > 0 && renderScale()}</Layer>
      </Stage>
      <ReportModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        closeModal={() => setIsModalOpen(false)}
        prediction={selected}
        findings={findings}
        recommendations={recommendations}
      />
    </div>
  );
};

export default Detection;
