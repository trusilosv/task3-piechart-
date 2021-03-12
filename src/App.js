import { useState } from 'react'
import PieChart from './pieChart/pieChart'
import Sectors from './sectors'
import './app.css'
function App() {
  const onSubmit = (e) => {

    e.preventDefault();
    setSectors(new Sectors(e.target[0].value.split(',').map(iter => +iter), +e.target[1].value))
  };
  const [sectors, setSectors] = useState(new Sectors([1, 2, 3, 4], 200));
  return (
    <div className="App">
      <main>
        <h1>PieChart</h1>
        <form
          onSubmit={onSubmit}>
          <input type='text' placeholder='Array value' ></input>
          <input type='number' min='120' placeholder='Radius' ></input>
          <button type='submit' >OK</button>
        </form>
        <PieChart sectors={sectors.getSectors()} colorLine='black' />
      </main>
    </div>
  );
}

export default App;
