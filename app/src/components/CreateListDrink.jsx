import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateListDrink() {

  const [listDrink, setListDrink] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('listDrink');
    if (data) {
      setListDrink(JSON.parse(data));
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newDrink = {
      name: event.target.name.value
    };
    const currentDrinks = [...listDrink, newDrink];
    localStorage.setItem('listDrink', JSON.stringify(currentDrinks));
    setListDrink(currentDrinks);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <div>
        <h2>Votre liste de boissons personnalisée</h2>
        {listDrink.map((drink, index) => (
          <div key={index}>
            <p>{drink.name}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <form onSubmit={handleFormSubmit}>
          <label>Boisson:</label>
          <input name="name" required />
  
          <button type="submit">Submit</button>
        </form>
      )}
      
      <button onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}