import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/main/home';
import {Login} from './pages/login';
import {Navbar} from './components/navbar';
import {CreatePost} from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createposts" element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
