import { Route, Routes } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Search /> } />
      <Route path="/about" element={ <About /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
