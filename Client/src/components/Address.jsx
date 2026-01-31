import React from "react";
import { useState } from "react";
import AppContext from "../context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const { shippingAddress,userAddress } = useContext(AppContext);
  const navigate = useNavigate();
 const [reload, setReload] = useState(false);
  const [formData, setformData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const { fullName, address, phoneNumber, city, state, country, pincode } =
    formData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();

  
    // alert("User Registered Successfully");
    const result = await shippingAddress(
      fullName,
      address,
      phoneNumber,
      city,
      state,
      country,
      pincode
    );

    if (result.success) {
      navigate("/checkout");
    }

 
    setformData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };
  return (
    <>
      <div
        className="container p-3 my-3"
        style={{
          border: "2px solid white",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={onSubmitHandler} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail10" className="form-label">
                Full Name:
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail10" className="form-label">
                Country:
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword10" className="form-label">
                State:
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail10" className="form-label">
                City:
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail10" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword10" className="form-label">
                Phone
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 ">
              <label htmlFor="exampleInputPassword10" className="form-label">
                Address/Near By
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary" style={{fontWeight:"bold", fontSize:"20px"}}>
              Submit
            </button>
          </div>
        </form>
        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
          <button className="btn btn-warning" onClick={()=>navigate("/checkout")} style={{fontWeight:"bold", fontSize:"20px"}}>Use Saved Address</button>
        </div>
        )}
        
      </div>
    </>
  );
}

export default Address;
