import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Exam from './components/Exam';
import Result from './components/Result';
import Navbar from './components/Navbar';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Exam" exact element={<Exam />} />
          <Route path="/Result" exact element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
