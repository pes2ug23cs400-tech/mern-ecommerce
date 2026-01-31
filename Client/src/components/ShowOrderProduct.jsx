import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShowOrderProduct({ items }) {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
      setQty(qty);
      setPrice(price);
    }
  }, [items]);

  // Helper to normalize productId
  const getProductId = (product) =>
    typeof product.productId === "object"
      ? product.productId._id
      : product.productId;

  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th className="bg-dark text-light">Product Img</th>
            <th className="bg-dark text-light">Title</th>
            <th className="bg-dark text-light">Price</th>
            <th className="bg-dark text-light">Qty</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => {
            const idToSend = getProductId(product);

            return (
              <tr key={product._id}>
                <td className="bg-dark text-light">
                  <img
                    src={product.imgSrc}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td className="bg-dark text-light">{product.title}</td>
                <td className="bg-dark text-light">{product.price}</td>
                <td className="bg-dark text-light">{product.qty}</td>
              </tr>
            );
          })}

          {/* Total Summary */}
          <tr>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light">
              <button className="btn btn-primary">Total</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-warning">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info">{qty}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ShowOrderProduct;
