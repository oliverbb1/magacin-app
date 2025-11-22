import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addProduct.css";
import Modal from "./Modal";
import axios from "axios";

const AddProducts = () => {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    naziv: "",
    kategorija: "",
    cena: "",
    kolicina: "",
    dobavljac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        formData
      );
      setFormData({
        naziv: "",
        kategorija: "",
        cena: "",
        kolicina: "",
        dobavljac: "",
      });
      setShowModal(true);
      setError("");
      console.log(data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Došlo je do greške. Pokušajte ponovo.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard");
  };
  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <form onSubmit={handleClick}>
          <h1>Add Products</h1>
          <input
            type="text"
            name="naziv"
            value={formData.naziv}
            onChange={handleChange}
            placeholder="Naziv proizvoda"
          />
          <input
            type="text"
            name="kategorija"
            value={formData.kategorija}
            onChange={handleChange}
            placeholder="Kategorija"
          />
          <input
            type="number"
            name="cena"
            value={formData.cena}
            onChange={handleChange}
            placeholder="Cena"
          />
          <input
            type="number"
            name="kolicina"
            value={formData.kolicina}
            onChange={handleChange}
            placeholder="Količina"
          />
          <input
            type="text"
            name="dobavljac"
            value={formData.dobavljac}
            onChange={handleChange}
            placeholder="Dobavljač"
          />
          <button type="submit">Create Product</button>
        </form>
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          message="You have successfully added a new product!"
        />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AddProducts;
