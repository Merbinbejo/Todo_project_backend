import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const ProductsDetails = ({
  searchProduct,
  error,
  setProductdetails,
  ProductDetails,
  formData,
  setFormData,
  EditID,
  setEditid
}) => {
  const [Error, setError] = useState(null);
  const [message,setMessage]=useState("")

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((res) => setProductdetails(res.data))
      .catch((error) => setError(error.message));
  }, []);

  // Decide which data to show: searched product or all products
  const dataToShow = searchProduct
  ? [searchProduct]
  : ProductDetails || [];
  const handleEdit = (id) => {
    const data = ProductDetails.find((p) => {
      return p.id === id;
    });
    setFormData({
      name: data.name,
      description:data.description,
      price: data.price,
      quantity: data.quantity,
    });
    setEditid(id)
  };

  const handleDelete=async (id)=>{
    try{
      const res=await axios.delete(
      `http://127.0.0.1:8000/delete/${id}`
    )
    setProductdetails((prev)=>{return prev.filter((p)=>p.id !== id)})
    }catch(error){
      setMessage(error.message)
    }
    
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h2>Product Details</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>Product ID not Found</p>}
      {Error && <p style={{ color: "red" }}>Fail To Fetch Data</p>}

      <TableContainer
        style={{
          border: "2px solid",
          width: "100%",
          boxShadow: "5px 10px 10px 10px",
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToShow.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  No Products Found
                </TableCell>
              </TableRow>
            ) : (
              dataToShow
                .sort((a, b) => a.id - b.id)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          handleEdit(product.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined" color="error"onClick={()=>{handleDelete(product.id)}}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
