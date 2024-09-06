import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div id="container">
      <Canvas camera={{ fov: 45, position: [10, 600, 10], far: 3500 }}>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
