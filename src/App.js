import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/components/headerreact/headerpage';
import Home from './pages/components/homereact/homepage';
import Search from './pages/components/homereact/Searchbarpage/searchbar';

import News from './pages/components/featured/newspage';
import RainbowCursorTrail from './pages/components/curserpage/curser';
import Results from './pages/components/searchresults/results';
import JobResults from './pages/components/searchresults/results';
import Searchagain from './pages/components/searchresults/searchagain';
import SavedJobs from './pages/components/searchresults/save';

function App() {
  return (
    <div className="App">
      <RainbowCursorTrail/>
      <BrowserRouter>
      <Header/>
      <Routes>
       
    <Route path='/' element={<Home/>}/>
    <Route path='search' element={<Search/>}/>

    <Route path='news' element={<News/>}/>
    <Route path='jobresults' element={<JobResults/>}/>
    <Route path='searchagain' element={<Searchagain/>}/>

    <Route path='/savedjobs' element={<SavedJobs/>}/>


    




        
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
