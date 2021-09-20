
import './App.css';
import Weather from './weatherApi';


function App() {

  
       const Styleing = {
         background:"#ddd"
       }
  return ( 
    <div style={Styleing} >
    <Weather />
    </div>
  );
}

export default App;
