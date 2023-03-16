import { useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

function App() {
  const [triggered, setTriggered] = useState(false);

  const [editPerson, setEditPerson] = useState();

  const triggeredHandler = () => {
    setTriggered(!triggered);
  };

  const editPersonHandler = (data) => {
    setEditPerson(data);
  };

  return (
    <>
      <PersonForm triggeredHandler={triggeredHandler} editPerson={editPerson} />
      <PersonList triggered={triggered} editPersonHandler={editPersonHandler} />
    </>
  );
}

export default App;
