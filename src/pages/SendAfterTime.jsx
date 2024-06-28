import React from "react";
import { ReactFlowProvider } from "reactflow";
import { AddNodeOnEdgeDrop } from "../components/AddNodeOnEdgeDrop";
const SendAfterTime = () => {
  return (
    <>
      <div>
        <ReactFlowProvider>
          <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default SendAfterTime;
