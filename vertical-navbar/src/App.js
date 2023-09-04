import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import Products from './pages/Products';
import Services from './pages/Services';

function App() {
  return (
    <BrowserRouter>
    <Sidebar>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/careers' element={<Careers/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/services' element={<Services/>}/>
    </Routes>
    </Sidebar>
    </BrowserRouter>
  );
}

export default App;
