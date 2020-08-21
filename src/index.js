import { Slider } from "slider";
import "../css/style.css";

$(function() {
  Slider.init();
});

if (module.hot) {
  console.log("✅ HMR Enabled!");
  module.hot.accept("./slider", () => {
    const { Slider: NewSlider } = require("./slider");
    NewSlider.init();
  });
}
