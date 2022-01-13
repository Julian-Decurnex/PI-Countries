import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Activity from './components/Activity/Activity.jsx';
import Detail from './components/Detail/Detail.jsx';
import Music from './components/Music/Music';
import Background from './components/Background/Background';
// import HomeClass from './components/HomeClass';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={[<LandingPage key={1}/>, <Music  key={2}/>]}></Route>
          {/* <Route path='/home' element={[<HomeClass key={1}/>, <Music key={2}/>, <Background key={3}/>]}></Route> */}
          <Route path='/home' element={[<Home key={1}/>, <Music key={2}/>, <Background key={3}/>]}></Route>
          <Route path='/activity' element={[<Activity key={1}/>, <Music key={2}/>]}/>
          <Route path='/home/:id' element={[<Detail key={1}/>, <Music key={2}/>, <Background key={3}/>]}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;