// Libraries
import { useEffect, useState } from "react";


export default function SearchDrink() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listDrink, setListDrink] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('listDrink');
    if (data) {
      setListDrink(JSON.parse(data));
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDrinks = listDrink.filter(drink =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredDrinks.map((drink, index) => (
        <div key={index}>
          <p>{drink.name}</p>
        </div>
      ))}
    </div>
  )
}