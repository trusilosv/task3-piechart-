
import PieChart from './pieChart/pieChart'
import Sectors from './sectors'
import './app.css'
function App() {
  const sectors = new Sectors([35,12,24,19],200);
  return (
    <div className="App">
       <main>
         <h1>PieChart</h1>
         <PieChart sectors={sectors.getSectors()} colorLine='black'/>
       </main>
    </div>
  );
}

export default App;
