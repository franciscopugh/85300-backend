import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;