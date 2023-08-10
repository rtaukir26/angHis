// import React, { useState } from "react";
// // import "./App.css";

// const DraggComp = () => {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragStart = (event) => {
//     event.dataTransfer.setData("text/plain", "Hello, drag me!");
//     setIsDragging(true);
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="App">
//       <div
//         className={`draggable-box ${isDragging ? "dragging" : ""}`}
//         draggable="true"
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//       >
//         Drag Me
//       </div>
//       <div className="drop-area">Drop Area</div>
//     </div>
//   );
// };

// export default DraggComp;
