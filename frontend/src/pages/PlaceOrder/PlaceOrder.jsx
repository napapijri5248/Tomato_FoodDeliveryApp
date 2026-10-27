import React, { useContext } from "react";
import "./PlaceOrder.css";
import { storeContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(storeContext);

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  // const placeOrder = async (e) => {
  //   e.preventDefault();
  //   let orderItems = [];
  //   food_list.map((item) => {
  //     if (cartItems[item._id] > 0) {
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id];
  //       orderItems.push(itemInfo);
  //     }
  //   });
  //   let orderData = {
  //     address: data,
  //     items: orderItems,
  //     amount: getTotalCartAmount() + 2,
  //   };

  //   let response = await axios.post(url + "/api/order/place", orderData, {
  //     headers: { token },
  //   });
  //   if (response.data.success) {
  //     const { session_url } = response.data;
  //     window.location.replace(session_url);
  //   } else {
  //     alert("error");
  //   }
  // };

  const placeOrder = async (e) => {
    e.preventDefault();

    // 1. Gather all items in the cart
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems && cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20, // 2 is delivery fee
    };

    // 2. Call backend placeOrder endpoint
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { order, orderId } = response.data;

      // 3. Configure Razorpay popup options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Put your rzp_test_... Key ID here
        amount: order.amount,
        currency: order.currency,
        name: "Food Delivery",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (paymentResponse) {
          // This runs automatically when test payment succeeds in the popup
          navigate(`/verify?success=true&orderId=${orderId}`);
        },
        modal: {
          ondismiss: function () {
            // If user closes popup without paying:
            navigate(`/verify?success=false&orderId=${orderId}`);
          },
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#ff4c24", // Tomato / orange theme color
        },
      };

      // 4. Open Razorpay Popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Error placing order");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            required
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            required
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          required
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="street"
          required
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            name="city"
            required
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            required
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            required
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            required
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          required
          onChange={onChangeHandler}
          value={data.phone}
          type="number"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Card totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p> &#8377; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>  &#8377; {getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                 &#8377; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
