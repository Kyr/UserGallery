import React from "react";
import { render } from "react-dom";
import UserGallery from "./UserGallery";
import "./RegionsStorage";
import Region from "./Region";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const rs = new window.RegionsStorage(onDestroyRegion);

rs.add(new Region("first"));
rs.add(new Region("second"));
rs.add(new Region("thirtd"));

window.data = [];

rs.forEach(function(region) {
  window.data.push(region);
});

const App = () => (
  <div style={styles}>
    <h1>
      User Gallery
      <PurgeGallery />
    </h1>
    <UserGallery data={window.data} />
  </div>
);

render(<App />, document.getElementById("root"));

function PurgeGallery(props) {
  return (
    <button type="button" onClick={purgeGallery}>
      purge
    </button>
  );

  function purgeGallery() {
    rs.reset();
    window.data.length = 0;
  }
}

function onDestroyRegion(region) {
  console.log(`Deleting region: ${region.name}`);

  const index = window.data.findIndex(r => r.id !== region.id);

  if (~index) {
    console.log(`Index for ${region.id} - ${index}`);
    window.data.splice(index, 1);
    return;
  }

  console.log(`Region #${region.id} does not found`);
}
