import React from "react";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
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
      <button onClick={() => navigate("/addProducts")}>
        Create new product
      </button>
      <h2 className="p-title">Dashboard - Proizvodi</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.naziv}</h3>
            <p>Kategorija: {p.kategorija}</p>
            <p>Cena: {p.cena}</p>
            <p>Količina: {p.kolicina}</p>
            <p>Dobavljač: {p.dobavljac}</p>
            <p>Datum Dodavanja:{new Date(p.datumDodavanja).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
