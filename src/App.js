import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import Create from './Create';
import Blog from './Blog';
import NotFound from './NotFound';

function App() {
  const title = 'Lero Bloggg'
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route path='/' element={<Home/>} />
            <Route path="/create" element={<Create/>} />
            <Route path='/blogs/:id' element={<Blog/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App; 
