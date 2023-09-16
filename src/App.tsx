import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import BandForm from "./BandForm";
import { IBand } from "./types";

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  return (
    <div className="App">
      {bands.map((band: IBand) => <BandForm band={band} />)}
    </div>
  );
}

export default App;
