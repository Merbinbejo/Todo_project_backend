import React from "react";
import Home from "../components/Todo_home";
import FormExample from "../components/NavBAr";
import { Add } from "../components/Add";
import { ProductsDetails } from "../components/ProductsDetails";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [Id, setId] = useState("");
  const [searchProduct, setSearchproduct] = useState(null);
  const [error, setError] = useState("");
  const [ProductDetails, setProductdetails] = useState([]);
  const [EditID, setEditid] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });  
  return (
    <div className="app">
      <Home></Home>
      <FormExample
        Id={Id}
        setId={setId}
        searchProduct={searchProduct}
        setSearchproduct={setSearchproduct}
        error={error}
        setError={setError}
      ></FormExample>
      <Add
        setProductdetails={setProductdetails}
        ProductDetails={ProductDetails}
        formData={formData}
        setFormData={setFormData}
        EditID={EditID}
        setEditid={setEditid}
      ></Add>
      <ProductsDetails
        Id={Id}
        setId={setId}
        searchProduct={searchProduct}
        setSearchproduct={setSearchproduct}
        error={error}
        ProductDetails={ProductDetails}
        setProductdetails={setProductdetails}
        formData={formData}
        setFormData={setFormData}
        EditID={EditID}
        setEditid={setEditid}
      ></ProductsDetails>
    </div>
  );
};

export default App;
