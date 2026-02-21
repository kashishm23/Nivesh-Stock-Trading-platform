import axios from "axios";
import { useEffect, useState } from "react";
import './order.css';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="orders-table">
      <h2>Orders</h2>

      {allOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                <td>{order.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
