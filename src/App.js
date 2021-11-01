import "mapbox-gl/dist/mapbox-gl.css";
import Map from "./components/Map";
import Panel from "./components/Panel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map />
      <Panel />
    </div>
  );
}

export default App;
