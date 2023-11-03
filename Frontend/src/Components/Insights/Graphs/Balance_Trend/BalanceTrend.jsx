import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import "./BalanceTrend.css";

const BalanceTrend = ({ balanceTrend }) => {
  // Ensure the value doesn't exceed the maximum value
  const sanitizedValue = Math.min(Math.max(balanceTrend, 0), 100000);

  return (
    <>
      <div className="speedometer">
        <ReactSpeedometer
          height={120}
          width={180}
          value={sanitizedValue}
          maxValue={100000} // Set the maximum value to 100000
          segments={3}
          currentValueText="Balance Health"
          customSegmentStops={[0, 30000, 70000, 100000]}
          segmentColors={["red", "yellow", "green"]}
          customSegmentLabels={[
            {
              text: "Bad",
              color: "white",
              fontSize: ".7rem",
            },
            {
              text: "Okay",
              color: "white",
              fontSize: ".7rem",
            },
            {
              text: "Good",
              color: "white",
              fontSize: ".7rem",
            },
          ]}
        />
      </div>
    </>
  );
};

export default BalanceTrend;
