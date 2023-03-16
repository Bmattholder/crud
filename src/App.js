import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

function App() {
  return (
    <>
      <PersonForm />
      <PersonList />
    </>
  );
}

export default App;
