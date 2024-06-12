import { faArrowsRotate, faCheck, faXmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';

export default function Order() {

  const [listOrders, setListOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const toggleModal = (order) => {
    if (showModal) {
      setCurrentOrder(null);
    } else {
      setCurrentOrder(order);
    }
    setShowModal(!showModal);
  }

  useEffect (() => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    if (orders !== null) {
      setListOrders(orders)
    } else {
      setListOrders([]);
    }
  }, []);

  const navigate = useNavigate();

  const reorder = () => {
    let drinks = JSON.parse(localStorage.getItem('drinks'));
  
    currentOrder.drinks.forEach(orderDrink => {
      let drink = drinks.find(d => d.name === orderDrink.name);
  
      if (drink) {
        // If the drink already exists in the drinks array, increment its quantity
        drink.quantity += orderDrink.quantity;
      } else {
        // If the drink does not exist in the drinks array, add it
        drinks.push({
          name: orderDrink.name,
          price: orderDrink.price,
          quantity: orderDrink.quantity
        });
      }
    });
  
    localStorage.setItem('drinks', JSON.stringify(drinks));
    navigate('/drinks');
  }

  return (
    <div className="OrderPage">
      <h2>Dernières commandes:</h2>
      {listOrders && listOrders.length === 0 ? (
        <div>
          <h2 className="errorOrder">Vous n&apos;avez pas encore effectué de commande! Veuillez effectuez une commande afin d&apos;avoir accès à votre historique</h2>
        </div>
      ) : (
        <div className="orders">
          {listOrders.map((order) => {
            const orderDate = new Date(order.orderNumber);
            const hours = orderDate.getHours();
            const minutes = orderDate.getMinutes();

            return (
              <div className="tableOrders" key={order.orderNumber}>
                <div className="reorder">
                  <h3>À {hours}:{minutes}</h3>
                  <button className="reorderButton" onClick={() => toggleModal(order)}>
                    <FontAwesomeIcon icon={faArrowsRotate} />
                  </button>
                </div>

                <ReactModal 
                  isOpen={showModal}
                  onRequestClose={toggleModal}
                  contentLabel="Validate Reorder"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(2px)',
                    },
                    content: {
                      color: 'lightsteelblue',
                      width: '50%',
                      height: '35%',
                      margin: 'auto',
                      padding: '20px',
                      border: '10px solid rgba(233, 233, 233, 1)',
                      borderRadius: '25px',
                      position: 'absolute',
                      top: '0',
                      marginTop: '40vw'
                    },
                  }}
                >
                  <div className="modalContent">
                    <button className="closeModal">
                      <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
                    </button>
                  </div>
                  <div>
                    <p className="deleteConfirmation">Souhaitez-vous refaire cette commande?</p>
                    <div className="deleteOrNotDelete">
                      <button className="cancel">
                        <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
                      </button>
                      <button onClick={reorder} className="validateDelete">
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                  </div>
                </ReactModal>

                <div className="detailOrder">
                  {order.drinks.map((drink) => (
                    <div key={drink.name} className="listOrder">
                      <p>{drink.name}: </p>
                      <p>{drink.quantity} x {drink.price}€</p>
                    </div>
                  ))}
                  <div className="totalOrder">
                    <p>Total: </p>
                    <p>{order.totalPrice}€</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}