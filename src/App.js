import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import PersonForm from './components/PersonForm';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<PersonForm />} />
      </Routes>
    </Router>
  );
}

export default App;
