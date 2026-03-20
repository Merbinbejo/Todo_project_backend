import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

export const Add = ({
  setEditid,
  EditID,
  ProductDetails = [],
  setProductdetails,
  formData,
  setFormData,
}) => {
  const [message, setMessage] = useState("");

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ POST API
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.quantity
    ) {
      setMessage("All fields are required ❌");
      return;
    }

    try {
      if (EditID) {
        const res = await axios.put(
          `http://127.0.0.1:8000/products/${EditID}`,
          formData,
        );
        console.log("Updated", res.data);

        const updated = await axios.get("http://127.0.0.1:8000/products");
        setProductdetails(updated.data);
        setMessage("Product updated successfully ✅");
        setEditid(null);
      } else {
        const res = await axios.post(
          "http://127.0.0.1:8000/products",
          formData
        );

        console.log("Saved:", res.data);

        // ✅ update UI instantly
        setProductdetails((prev) => [...prev, res.data]);

        setMessage("Product added successfully ✅");

        // reset form
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      setMessage("Error adding product ❌");
    }
  };

  return (
    <div>
      <section style={{ display: "flex", gap: "10px" }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          size="small"
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          size="small"
          type="text"
        />

        <TextField
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          size="small"
        />

        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          size="small"
        />

        <Button variant="contained" onClick={handleSubmit}>
          {EditID ? "Update" : "Add"}
        </Button>
      </section>

      {message && <p>{message}</p>}
    </div>
  );
};
