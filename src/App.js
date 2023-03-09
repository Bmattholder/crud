import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <Router>
      <Container className='mt-3'>
        <Routes>
          <Route
            path='/'
            element={<ItemList items={items} addItem={addItem} />}
          />
          <Route path='/items/new' element={<ItemForm addItem={addItem} />} />
          <Route path='/items/:id' element={<ItemDetail items={items} />} />
          <Route
            path='/items/:id/edit'
            element={<ItemForm items={items} addItem={addItem} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
