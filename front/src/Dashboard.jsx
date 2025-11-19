import React from "react";
import axios from "axios";
import "./Dashboard.css";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <h2 className="p-title">Dashboard - Proizvodi</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.naziv}</h3>
            <p>Kategorija: {p.kategorija}</p>
            <p>Cena: {p.cena}</p>
            <p>Količina: {p.kolicina}</p>
            <p>Dobavljač: {p.dobavljac}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
