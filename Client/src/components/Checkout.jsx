import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import TableProduct from "./TableProduct.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Checkout() {
  const { cart,userAddress,url,user,clearCart  } = useContext(AppContext);
   const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const navigate=useNavigate();

  
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

    const handlePayment= async ()=>{
      try{
        const orderResponse = await axios.post(`${url}/payment/checkout`,{
          amount:price,
          qty:qty,
          cartItems:cart?.items,
          userShipping:userAddress,
          userId:user._id
        });
       console.log("🛒 orderResponse:",orderResponse );
        // if(orderResponse.data.success){
        //   toast.success(orderResponse.data.message);
        // }

        const {orderId,amount:orderAmount}=orderResponse.data;

        const options = {
        key: 'rzp_test_opnMurrNCztpDn', // Replace with your Razorpay key_id
        amount: orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Web Dev Mastery',
        description: 'Web Dev Mastery',
        order_id: orderId, // This is the order_id created in the backend
          handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          }
          const api= await axios.post(`${url}/payment/verify-payment`,paymentData);
          console.log("razorpay response",api.data)
          if(api.data.success){
            clearCart();
            console.log("🛒 api.data.message:",api.data.message );
            // toast.success(api.data.message);
            navigate("/orderConfirmation");
          }
          
          
          
          },
        prefill: {
          name: 'Web Dev Mastery',
          email: 'webdevmastery@gmail.com',
          contact: '8296697478'
        },
        theme: {
          color: '#F37254',
          
        },
       notes: {
        address:"KHDC Nekar Coluny ILKAL"
        }
        
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

      }catch(error){

      }
    }

 // console.log("🛒 user address:",userAddress );

  return (
//     <>
//      <div className="container text-center my-3">
//       <h1>Order Summary</h1>

//     <table className="table table-bordered border-primary">
//   <thead className="table-dark text-light">
//     <tr>
//       <th scope="col"className="text-light bg-dark" >#</th>
//       <th scope="col"  className="text-light bg-dark">First</th>
//       <th scope="col"  className="text-light bg-dark">Last</th>
//       <th scope="col"  className="text-light bg-dark">Handle</th>
//     </tr>
//   </thead>
//   <tbody className="table-dark text-light">
//     <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//   </tbody>
// </table>



//       {cart?.items?.map((product) => {
//         //  console.log("🔍 Product item debug:", product);

//         // Determine correct productId
//         const idToSend =
//           typeof product.productId === "object"
//             ? product.productId._id
//             : product.productId;

//         return (
//           <div
//             key={product._id}
//             className="container bg-dark my-5 p-3 text-center"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 alignItems: "center",
//               }}
//             >
//               <div className="cart_img">
//                 <img
//                   src={product.imgSrc}
//                   alt=""
//                   style={{
//                     height: "100px",
//                     width: "100px",
//                     borderRadius: "7px",
//                     border: "2px solid magenta ",
//                   }}
//                 />
//               </div>
//               <div className="cart_des">
//                 <h4>{product.title}</h4>
//                 <h6>Rs {product.price}</h6>
//                 <h6>Qty: {product.qty}</h6>
//               </div>
//               <div className="cart_action">
//                 <div
//                   className="button btn btn-warning mx-3"
//                   onClick={() => decreaseQty(idToSend, 1)}
//                   style={{ fontWeight: "bold", fontSize: "20px" }}
//                 >
//                   -
//                 </div>
//                 <div
//                   className="button btn btn-info mx-3"
//                   style={{ fontWeight: "bold", fontSize: "20px" }}
//                   onClick={() =>
//                     addToCart(
//                       idToSend,
//                       product.title,
//                       product.price,
//                       1,
//                       product.imgSrc
//                     )
//                   }
//                 >
//                   +
//                 </div>
//                 <div
//                   className="button btn btn-danger mx-3"
//                   style={{ fontWeight: "bold" }}
//                   onClick={() => {
//                     if (confirm("Are you sure you want to remove this item?")) {
//                       removeFromCart(idToSend);
//                     }
//                   }}
//                 >
//                   Remove
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//      </div>
//     </>

// <>
//       <div className="container  my-3">
//         <h1 className="text-center">Order Summary</h1>

//         <table className="table table-bordered border-primary bg-dark">
//           <thead className="bg-dark">
//             <tr>
//               <th scope="col" className="bg-dark text-light text-center">
//                 Product Details
//               </th>

//               <th scope="col" className="bg-dark text-light text-start">
//                 Shipping Address
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-dark">
//             <tr>
//               <td className="bg-dark text-light">
//                 <TableProduct cart={cart} />
//               </td>
//               <td className="bg-dark text-light">
//                 <ul style={{ fontWeight: "bold" }}>
//                   <li>Name : {userAddress?.fullName}</li>
//                   <li>Phone : {userAddress?.phoneNumber}</li>
//                   <li>Country : {userAddress?.country}</li>
//                   <li>State : {userAddress?.state}</li>
//                   <li>PinCode : {userAddress?.pincode}</li>
//                   <li>Near By : {userAddress?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
      
//       <div className="container text-center my-5">
//         <button
//           className="btn btn-secondary btn-lg"
//           style={{ fontWeight: "bold" }}
         
//         >
//           Procced To Pay
//         </button>
//       </div>
//     </>
   

<>
  <div className="container my-3">
    <h1 className="text-center">Order Summary</h1>

    <table className="table table-bordered border-primary bg-dark">
      <thead className="bg-dark">
        <tr>
          <th scope="col" className="bg-dark text-light text-center">
            Product Details
          </th>
          <th scope="col" className="bg-dark text-light text-start"> {/* <-- Changed from text-center to text-start */}
            Shipping Address
          </th>
        </tr>
      </thead>
      <tbody className="bg-dark">
        <tr>
          <td className="bg-dark text-light">
            <TableProduct cart={cart} />
          </td>
          <td className="bg-dark text-light text-start"> {/* <-- Added text-start here */}
            <ul style={{ fontWeight: "bold" }}>
              <li>Name : {userAddress?.fullName}</li>
              <li>Phone : {userAddress?.phoneNumber}</li>
              <li>Country : {userAddress?.country}</li>
              <li>State : {userAddress?.state}</li>
              <li>PinCode : {userAddress?.pincode}</li>
              <li>Near By/Address : {userAddress?.address}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="container text-center my-5">
    <button className="btn btn-secondary btn-lg" style={{ fontWeight: "bold" }}
      onClick={handlePayment}>
      Proceed To Pay
    </button>
  </div>
</>

  );
}

export default Checkout;
