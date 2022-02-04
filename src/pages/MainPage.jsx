import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Stage, Layer } from "react-konva";
import Rectangle from "../components/shapes/Square";
function MainPage() {
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "black",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };
 
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const removeShape = () => {

    const lastId = shapes[shapes.length - 1];
    let index = rectangles.findIndex(r => r.id === lastId);
    if (index !== -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
    }
      shapes.pop();
      setShapes(shapes);
      forceUpdate();
  }

  return (
    <div className="home-page">
      <h1>React Whiteboard Application</h1>
      <Button variant="secondary" onClick={ addRectangle }>Add Rectangle</Button>
      <Button variant="secondary" onClick={ () => removeShape() } style = {{marginLeft: "10px"}}>Delete Rectangle</Button>
      <Stage
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 150}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
export default MainPage;