import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Order() {

  const [listOrders, setListOrders] = useState([]);

  useEffect (() => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    if (orders !== null) {
      setListOrders(orders)
    } else {
      setListOrders([]);
    }
  }, []);

  const participants = JSON.parse(localStorage.getItem('participants')) || [];
  
  if (participants.length === 0) {
    return (
      <div className="OrderPage">
        <h2 className="errorOrder">Veuillez créer un <Link to="/">évènement!</Link></h2>
      </div>
    )
  }

  return (
    <div className="OrderPage">
      <h2>Dernières commandes:</h2>
      {listOrders && listOrders.length === 0 ? (
        <div>
          <h2 className="errorOrder">Vous n&apos;avez pas encore effectué de commande!</h2>
        </div>
      ) : (
        <div className="orders">
          {listOrders.map((order) => {
            const orderDate = new Date(order.orderNumber);
            const hours = orderDate.getHours();
            const minutes = orderDate.getMinutes();

            return (
              <div className="tableOrders" key={order.orderNumber}>
                <h3>À {hours}:{minutes}</h3>
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