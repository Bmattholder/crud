import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Header';
import Home from './components/Home';
import Form from './components/Form'

function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
        </Routes>
    </Router>
  );
}

export default App;
