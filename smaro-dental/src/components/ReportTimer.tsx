import React, { useEffect, useState } from "react";

interface Props {
  insertedTime:Date|string;
}

const ReportTimer: React.FC<Props> = ({ insertedTime }) => {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const calculateTimeElapsed = () => {
       const now = new Date().getTime();
      const startTime = new Date(insertedTime).getTime();
      const differenceInSeconds = Math.floor((now - startTime) / 1000);

      const hours = (Math.floor(differenceInSeconds / 3600));
      const minutes = (Math.floor((differenceInSeconds % 3600) / 60));
      const seconds = (differenceInSeconds % 60);
        setTimeElapsed(
        `${hours}h ${minutes}m ${seconds}s`
      );
    };

    // Calculate immediately and then every second
    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [insertedTime]);

  return <span className="animate-pulse text-red-500">{timeElapsed}</span>;
};

export default ReportTimer;
