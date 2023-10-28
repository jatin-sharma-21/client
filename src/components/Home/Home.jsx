import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import axios from "axios";
const Home = () => {
  const { products, setProducts, categories, setCategories } =
    useContext(Context);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/products?populate=*",
        {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
            },
          }
      );
      setProducts(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/categories?populate=*",
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
          },
        }
      );
      setProducts(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []); //[]

  // const getProducts = () => {
  //     fetchDataFromApi("/api/products?populate=*").then((res) => {
  //         setProducts(res);
  //     });
  // };
  // const getCategories = () => {
  //     fetchDataFromApi("/api/categories?populate=*").then((res) => {
  //         setCategories(res);
  //     });
  // };
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products headingText="Popular Products" products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
