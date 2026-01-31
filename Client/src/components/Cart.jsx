import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
      setQty(qty);
      setPrice(price);
    }
  }, [cart]);

  // console.log("🛒 Cart data:", cart);

  return (
    <>
      {cart?.items?.length === 0 ? (
        <>
        <div className="my-5 text-center">
          <button
            className="btn btn-warning mx-3"
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
          </div>
        </>
      ) : (
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "15px" }}
            >
              Total Qty: {qty}
            </button>
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "15px" }}
            >
              Total Price: ₹{price}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => {
        //  console.log("🔍 Product item debug:", product);

        // Determine correct productId
        const idToSend =
          typeof product.productId === "object"
            ? product.productId._id
            : product.productId;

        return (
          <div
            key={product._id}
            className="container bg-dark my-5 p-3 text-center"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div className="cart_img">
                <img
                  src={product.imgSrc}
                  alt=""
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "7px",
                    border: "2px solid magenta ",
                  }}
                />
              </div>
              <div className="cart_des">
                <h4>{product.title}</h4>
                <h6>Rs {product.price}</h6>
                <h6>Qty: {product.qty}</h6>
              </div>
              <div className="cart_action">
                <div
                  className="button btn btn-warning mx-3"
                  onClick={() => decreaseQty(idToSend, 1)}
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  -
                </div>
                <div
                  className="button btn btn-info mx-3"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                  onClick={() =>
                    addToCart(
                      idToSend,
                      product.title,
                      product.price,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  +
                </div>
                <div
                  className="button btn btn-danger mx-3"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    if (confirm("Are you sure you want to remove this item?")) {
                      removeFromCart(idToSend);
                    }
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold", fontSize: "15px" }}
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold", fontSize: "15px" }}
            onClick={() => {
              if (confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
