import React, { use, useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "mongoose";


function AppState(props) {
  const url = "https://mern-ecommerce-api.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log("my products",api.data.products);
        setProducts(api.data.products);
        setFilteredData(api.data.products);
        userProfile();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
    userCart();
     getAddress();
     user_Order();
  }, [token, reload]);

  useEffect(() => {
    //userProfile();
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);

    }
  }, []);

  
  //user registration
  const register = async (name, email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API response:", api.data);

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      return api.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );

      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  //user login
  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API response:", api.data);

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      //console.log(api.data);
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);

      return api.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );

      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  //logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    toast.success("Logout successful", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
          Auth: token,
        },
        withCredentials: true,
      });
      //console.log("user profile",api.data.user);
      setUser(api.data.user);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //add to cart

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const api = await axios.post(
        `${url}/cart/add`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      console.log("my title of cart", api.data);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,

      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  //get user cart
    const userCart = async () => {
  try {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth:token
      //  Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    setCart(api.data.cart); 
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

//decrease qty

const decreaseQty = async (productId, qty) => {
  try {
    const api = await axios.post(`${url}/cart/decrease-qty`, { productId, qty }, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setReload(!reload);
    setCart(api.data.cart); 
    toast.success(api.data.message || "Quantity decreased", {
       position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } catch (error) {
    console.error("❌ Error decreasing qty:", error?.response?.data || error.message);
    toast.error("Failed to update cart.");
  }
};

//remove product from cart

const removeFromCart = async (productId) => {
  try {
    const api = await axios.delete(`${url}/cart/remove/${productId}`,  {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setReload(!reload);
   // console.log(api.data);
    setCart(api.data.cart); 
    toast.success(api.data.message || "Product removed from cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } catch (error) {
    console.error("❌ Error removing product from cart:", error?.response?.data || error.message);
    toast.error("Failed to remove product from cart.");
  }
};

//clear cart
const clearCart = async () => {
  try {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setReload(!reload);
    setCart(api.data.cart); 
    toast.success(api.data.message || "Cart cleared", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } catch (error) {
    console.error("❌ Error clearing cart:", error?.response?.data || error.message);
    toast.error("Failed to clear cart.");
  }
};

//add shipping Address

const shippingAddress = async (fullName,address,phoneNumber,city,state,country,pincode) => {
  try {
    const api = await axios.post(`${url}/address/add`, {fullName,address,phoneNumber,city,state,country,pincode}, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    toast.success(api.data.message || "Address added successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  } catch (error) {
    console.error("❌ Error adding address:", error?.response?.data || error.message);
    toast.error("Failed to add address.");
  }
};

//get user latest address
const getAddress = async () => {
  try {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserAddress(api.data.userAddress);
    console.log("my user address",api.data.userAddress);
    //setShippingAddress(api.data.address);
    
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

const user_Order = async () => {
  try {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserOrder(api.data);
 // console.log("my user order",api.data);
    //setShippingAddress(api.data.address);
    
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

console.log("user orders=", userOrder)

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        isAuthenticated,
        token,
        setIsAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
       

      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;

