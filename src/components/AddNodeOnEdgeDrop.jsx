import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { BiLogoGmail } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "send mail" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

export const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [modalVisible, setModalVisible] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    To: "",
    Subject: "",
    body: "",
    afterTime: "",
  });
  const [newNodePosition, setNewNodePosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        setNewNodePosition(
          screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          })
        );
        setModalVisible(true);
      }
    },
    [screenToFlowPosition]
  );

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://backend-email-4.onrender.com/api/v1/email/sendmail",
        {
          to: newNodeData.To,
          subject: newNodeData.Subject,
          text: newNodeData.body,
          time: parseInt(newNodeData.afterTime),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const id = getId();
      console.log(res);

      const newNode = {
        id,
        position: newNodePosition,
        data: { label: `Email sent after ${newNodeData.afterTime} minute(s)` },
        origin: [0.5, 0.0],
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id, source: connectingNodeId.current, target: id })
      );

      setNewNodeData({ To: "", Subject: "", body: "", afterTime: "" });
      setModalVisible(false);

      // Show toast notification
      toast.success("Email scheduled successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to schedule email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen bg-gray-100" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      />

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <form
            onSubmit={handleModalSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
          >
            <h2 className="text-2xl font-bold mb-4">Add Node</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-1">To:</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  type="email"
                  value={newNodeData.To}
                  onChange={(e) =>
                    setNewNodeData((prevData) => ({
                      ...prevData,
                      To: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">
                  Subject:
                </label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  type="text"
                  value={newNodeData.Subject}
                  onChange={(e) =>
                    setNewNodeData((prevData) => ({
                      ...prevData,
                      Subject: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">
                  Body:
                </label>
                <textarea
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  value={newNodeData.body}
                  onChange={(e) =>
                    setNewNodeData((prevData) => ({
                      ...prevData,
                      body: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">
                  After Time (minutes):
                </label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  type="number"
                  value={newNodeData.afterTime}
                  onChange={(e) =>
                    setNewNodeData((prevData) => ({
                      ...prevData,
                      afterTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <BiLogoGmail size={24} />
                <span>Add Node</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
