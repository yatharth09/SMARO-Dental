import React, { useState } from "react";
import Detection from "../components/Detection";
import Layout from "../shared/Layout";
import TestImage from "../assets/test.jpeg";

const Canvas: React.FC = () => {
  const [predictions] = useState([
    { x: 388.0, y: 204.0, width: 76.0, height: 147.0, teeth_number: 1 },
    { x: 307.0, y: 198.0, width: 77.0, height: 131.0, teeth_number: 2 },
    { x: 744.0, y: 251.0, width: 56.0, height: 170.0, teeth_number: 3 },
    { x: 1151.0, y: 362.0, width: 95.0, height: 149.0, teeth_number: 4 },
    { x: 271.0, y: 336.0, width: 100.0, height: 125.0, teeth_number: 5 },
    { x: 1167.0, y: 198.0, width: 77.0, height: 144.0, teeth_number: 6 },
    { x: 1093.0, y: 215.0, width: 69.0, height: 150.0, teeth_number: 7 },
    { x: 807.0, y: 247.0, width: 56.0, height: 175.0, teeth_number: 8 },
    { x: 762.0, y: 438.0, width: 36.0, height: 141.0, teeth_number: 9 },
    { x: 512.0, y: 229.0, width: 58.0, height: 159.0, teeth_number: 10 },
    { x: 630.0, y: 230.0, width: 54.0, height: 176.0, teeth_number: 11 },
    { x: 987.0, y: 229.0, width: 49.0, height: 170.0, teeth_number: 12 },
    { x: 870.0, y: 253.0, width: 50.0, height: 157.0, teeth_number: 13 },
    { x: 927.0, y: 234.0, width: 52.0, height: 175.0, teeth_number: 14 },
    { x: 943.0, y: 426.0, width: 50.0, height: 161.0, teeth_number: 15 },
    { x: 887.0, y: 429.0, width: 51.0, height: 166.0, teeth_number: 16 },
    { x: 1059.0, y: 397.0, width: 85.0, height: 165.0, teeth_number: 17 },
    { x: 842.0, y: 436.0, width: 39.0, height: 150.0, teeth_number: 18 },
    { x: 718.0, y: 437.0, width: 39.0, height: 146.0, teeth_number: 19 },
    { x: 803.0, y: 438.0, width: 35.0, height: 142.0, teeth_number: 20 },
    { x: 999.0, y: 417.0, width: 55.0, height: 169.0, teeth_number: 21 },
    { x: 665.0, y: 427.0, width: 48.0, height: 172.0, teeth_number: 22 },
    { x: 1039.0, y: 223.0, width: 48.0, height: 165.0, teeth_number: 23 },
    { x: 689.0, y: 245.0, width: 51.0, height: 164.0, teeth_number: 24 },
    { x: 462.0, y: 396.0, width: 83.0, height: 165.0, teeth_number: 25 },
    { x: 573.0, y: 229.0, width: 49.0, height: 169.0, teeth_number: 26 },
    { x: 380.0, y: 369.0, width: 77.0, height: 150.0, teeth_number: 27 },
    { x: 611.0, y: 429.0, width: 47.0, height: 162.0, teeth_number: 28 },
    { x: 550.0, y: 420.0, width: 53.0, height: 160.0, teeth_number: 29 },
  ]);

  return (
    <Layout>
      <Detection imageSrc={TestImage} predictions={predictions} />
    </Layout>
  );
};

export default Canvas;
