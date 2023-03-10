import Form from "./components/Form";

function App() {
  const [people, setPeople] = useState([]);
  const [editPerson, setEditPerson] = useState(null);

  const peopleHandler = async (person) => {
    if (editPerson) {
      const editedPeople = people.map(p => p === editPerson ? person : p);
      setPeople(editedPeople);
      setEditPerson(null);
    } else {
      await axios.post('http://localhost:8080/api/v1/people', {person})
      setPeople((prevState) => [...prevState, person]);
    }
  };

  const handleDelete = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
  };

  const handleEdit = (index) => {
    const person = people[index];
    setEditPerson(person);
  };

  return (
   <div>
    <Form />
   </div>
  );
}

export default App;
