import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id || index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items &&
                    order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                </p>
                <p className="order-item-name">
                  {(order.address?.firstName || "") + " " + (order.address?.lastName || "")}
                </p>
                <div className="order-item-address">
                  <p>{order.address?.street ? order.address.street + ", " : ""}</p>
                  <p>{order.address?.city ? order.address.city + ", " : ""}</p>
                  <p>{order.address?.state ? order.address.state + ", " : ""}</p>
                  <p>{order.address?.country ? order.address.country + ", " : ""}</p>
                  <p>{order.address?.zipcode || ""}</p>
                </div>
                <p className="order-item-phone">{order.address?.phone || ""}</p>
              </div>
              <p>Items: {order.items ? order.items.length : 0}</p>
              <p> &#8377; {order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
