
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Components/LoginRegisterContainer/Login";
import Register from './Components/LoginRegisterContainer/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Header from "./Components/Header/Header";

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path ="/Register" element ={<Register />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
