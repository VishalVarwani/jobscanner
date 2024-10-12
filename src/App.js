import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/components/headerreact/headerpage';
import Home from './pages/components/homereact/homepage';
import Search from './pages/components/homereact/Searchbarpage/searchbar';
import Particless from './pages/components/homereact/Searchbarpage/particlesbackground';
import ParticlesComponent from './pages/components/homereact/Searchbarpage/particles';
import News from './pages/components/featured/newspage';
import RainbowCursorTrail from './pages/components/testfolder/test2';

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





        
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
