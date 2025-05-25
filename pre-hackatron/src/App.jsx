import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx";
import Main from "./pages/Main.jsx";
import MainLoging from "./pages/MainLogin.jsx";
import ProfilePage from "./pages/profile.jsx";
import WatchList from "./pages/watchList.jsx";
import BiddingSystem from "./pages/BiddingSystem.jsx";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login/main" element={<MainLoging />} />
        <Route path="/login/profile" element={<ProfilePage />} />
        <Route path="/login/watchList" element={<WatchList />} />
        <Route path="/login/bidsystem" element={<BiddingSystem/>} />
       
             
      </Routes>
    </BrowserRouter>
  );
}



export default App
