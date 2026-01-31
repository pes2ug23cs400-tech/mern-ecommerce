import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext.jsx";
import ShowOrderProduct from "./ShowOrderProduct.jsx";

function OrderConfirmation() {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);
  console.log("latest order", latestOrder);
  return (
    <>
      <div className="conatiner my-3">
        <h1 className="text-center">Your Order has been Confirm,</h1>
        <h3 className="text-center">It will delevired soon</h3>
        <table className="table table-dark table-hover table-bordered table-striped"></table>
      </div>

      <div className="container ">
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Order Items
              </th>
              <th scope="col" className="bg-dark text-light text-start">
                {" "}
                {/* <-- Changed from text-center to text-start */}
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light text-start">
                {" "}
                {/* <-- Added text-start here */}
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderId:{latestOrder?.orderId}</li>
                  <li>PaymentId:{latestOrder?.paymentId}</li>
                  <li>PaymentStatus:{latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li>PinCode : {latestOrder?.userShipping?.pincode}</li>
                  <li>
                    Near By/Address : {latestOrder?.userShipping?.address}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
        >
          Proceed To Pay
        </button>
      </div> */}
    </>
  );
}

export default OrderConfirmation;
