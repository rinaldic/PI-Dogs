import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
//import DogDetails from './pages/DogDetails.jsx';
//import CreateDog from './pages/CreateDog.jsx';

function App() {
  return (
    <BrowserRouter>
      
       <div>
       <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/home" component={Home}/>
        </Switch>
       </div>

    </BrowserRouter>
  );
}

export default App;
