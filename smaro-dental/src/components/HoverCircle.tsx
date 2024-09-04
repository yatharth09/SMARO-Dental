import React, { Fragment, useState } from "react";
import { Circle, Text, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface CircleWithTextProps {
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
    teeth_number: number;
  };
  onClick: (_x: number, _y: number, e: any) => void;
}

const HoverCircle: React.FC<CircleWithTextProps> = ({ data, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y, width, height, teeth_number } = data;

  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = 25;
  const tx = cx;
  const ty = cy - radius / 4;

  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    setIsHovered(true);
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    setIsHovered(false);
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "default";
    }
  };

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    onClick(x, y, e);
  };

  return (
    <Fragment>
      <Circle
        x={cx}
        y={cy}
        radius={radius}
        fill="rgba(203, 203, 203, 0.8)"
        stroke="rgba(203, 203, 203, 0.8)"
        strokeWidth={2}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <Text
        x={tx}
        y={ty}
        text={teeth_number?.toString()}
        fontSize={20}
        width={radius * 2}
        align="center"
        verticalAlign="middle"
        fill="black"
        offsetX={radius}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      {isHovered && (
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="rgba(203, 203, 203, 0.6)"
          strokeWidth={2}
          listening={false}
        />
      )}
    </Fragment>
  );
};

export default HoverCircle;
