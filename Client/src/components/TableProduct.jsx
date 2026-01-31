// import React from "react";
// import { useContext, useState, useEffect } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// function TableProduct({ cart }) {
//   const { decreaseQty, addToCart, removeFromCart, clearCart } =
//     useContext(AppContext);

//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let qty = 0;
//     let price = 0;

//     if (cart?.items) {
//       for (let i = 0; i < cart.items.length; i++) {
//         qty += cart.items[i].qty;
//         price += cart.items[i].price;
//       }
//       setQty(qty);
//       setPrice(price);
//     }
//   }, [cart]);

 

//   return (
//     <>
//       <table className="table table-bordered border-primary bg-dark text-center">
//         <thead>
//           <tr>
//             <th scope="col" className="bg-dark text-light">
//               Product Img
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Title
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Price
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Qty
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Qty++
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Qty--
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               remove
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart?.items?.map((product) => (
//             <tr key={product._id}>
//               <th scope="row" className="bg-dark text-light">
//                 <img
//                   src={product.imgSrc}
//                   style={{ width: "50px", height: "50px" }}
//                 />
//               </th>

//               <td className="bg-dark text-light">{product.title}</td>
//               <td className="bg-dark text-light">{product.price}</td>
//               <td className="bg-dark text-light">{product.qty}</td>
//               <td className="bg-dark text-light">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="24px"
//                   viewBox="0 -960 960 960"
//                   width="24px"
//                   fill="#e3e3e3"
//                   onClick={() => addToCart(product?.productId,
//                     product?.title,
//                     product?.price/product?.qty,
//                     product?.qty,
//                     product?.imgSrc
//                   )}
//                 >
//                   <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
//                 </svg>
//               </td>
//               <td className="bg-dark text-light">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="24px"
//                   viewBox="0 -960 960 960"
//                   width="24px"
//                   fill="#e3e3e3"
//                   onClick={() => decreaseQty(product?.productId, product?.qty)}
//                 >
//                   <path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
//                 </svg>
//               </td>
//               <td className="bg-dark text-light">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="24px"
//                   viewBox="0 -960 960 960"
//                   width="24px"
//                   fill="#e3e3e3"
//                   onClick={() => removeFromCart(product?.productId)}
//                 >
//                   <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
//                 </svg>
//               </td>
//             </tr>
//           ))}

//           <tr>
//             <th scope="row" className="bg-dark text-light"></th>

//             <td className="bg-dark text-light">
//               <button
//                 className="btn btn-primary"
//                 style={{ fontWeight: "bold", fontSize: "15px" }}
//               >
//                 Total{" "}
//               </button>
//             </td>
//             <td className="bg-dark text-light">
//               <button
//                 className="btn btn-warning"
//                 style={{ fontWeight: "bold", fontSize: "15px" }}
//               >
//                 {price}
//               </button>
//             </td>
//             <td className="bg-dark text-light">
//               <button
//                 className="btn btn-info"
//                 style={{ fontWeight: "bold", fontSize: "15px" }}
//               >
//                 {qty}
//               </button>
//             </td>
//             <td className="bg-dark text-light">{}</td>
//             <td className="bg-dark text-light">{}</td>
//             <td className="bg-dark text-light">{}</td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default TableProduct;



import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function TableProduct({ cart }) {
  const { decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);

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

  // Helper to normalize productId
  const getProductId = (product) =>
    typeof product.productId === "object" ? product.productId._id : product.productId;

  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th className="bg-dark text-light">Product Img</th>
            <th className="bg-dark text-light">Title</th>
            <th className="bg-dark text-light">Price</th>
            <th className="bg-dark text-light">Qty</th>
            <th className="bg-dark text-light">Qty++</th>
            <th className="bg-dark text-light">Qty--</th>
            <th className="bg-dark text-light">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => {
            const idToSend = getProductId(product);

            return (
              <tr key={product._id}>
                <td className="bg-dark text-light">
                  <img src={product.imgSrc} style={{ width: "50px", height: "50px" }} />
                </td>
                <td className="bg-dark text-light">{product.title}</td>
                <td className="bg-dark text-light">{product.price}</td>
                <td className="bg-dark text-light">{product.qty}</td>

                {/* Increase Qty */}
                <td className="bg-dark text-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                   onClick={() => addToCart(idToSend,
                    product?.title,
                    product?.price/product?.qty,
                    1,
                    product?.imgSrc
                  )}
                  >
                    <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </td>

                {/* Decrease Qty */}
                <td className="bg-dark text-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                    onClick={() => decreaseQty(idToSend,1)}
                  >
                    <path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </td>

                {/* Remove Product */}
                <td className="bg-dark text-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                    onClick={() =>
                      {  if(confirm("Are you sure you want to remove this product?")){
                        removeFromCart(idToSend)}
                    }}
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </td>
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
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;


