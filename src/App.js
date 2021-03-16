import { useState } from 'react'
import PieChart from './pieChart/pieChart'
import Sectors from './sectors'
import './app.css'
function App() {
  const onSubmit = (e) => {

    e.preventDefault();
    setSectors(new Sectors(e.target[0].value.split(',').map(iter => +iter), +e.target[1].value, +e.target[2].value))
  };
  const [sectors, setSectors] = useState(new Sectors([1, 1, 1, 1, 1, 1, 1, 1], 120, 60));
  return (
    <div className="App">
      <main>
        <h1>PieChart</h1>
        <form
          onSubmit={onSubmit}>
          <p>
            <input type='text' required placeholder='Array value' ></input> Array </p>
          <p>
            <input type='range' min='120' max={600} placeholder='Radius'
              onChange={e => console.log(e.target.nextSibling.textContent = `Radius ${e.target.value}`)}>

            </input>Radius</p>
          <p>
            <input type='range' min='30' max={sectors.radius} placeholder='Displacement'
              onChange={e => console.log(e.target.nextSibling.textContent = `Displacement ${e.target.value}`)}>
            </input> Displacement
          </p>
          <button type='submit'>OK</button>
        </form>
        <PieChart sectors={sectors.getSectors()} colorLine='black' />
      </main>
    </div>
  );
}

export default App;
