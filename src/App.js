import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Form from './components/Form';
import List from './components/List';

function App() {
  const [items, setItems] = useState([]);

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index) => {
    const itemToUpdate = items[index];
    const updatedItem = prompt(
      `Update item ${index + 1}:`,
      `${itemToUpdate.crud} || ${itemToUpdate.again}`
    );
    if (updatedItem) {
      const newItems = [...items];
      const [crud, again] = updatedItem.split(' || ');
      newItems[index] = { crud, again };
      setItems(newItems);
    }
  };

  return (
    <div className='main'>
      <Card>
        <Form setItems={setItems} />
      </Card>
      <Card>
        <List items={items} deleteItem={deleteItem} updateItem={updateItem} />
      </Card>
    </div>
  );
}

export default App;
