import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function FormExample({ Id, setId, setSearchproduct, setError }) {
  const handlesearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://127.0.0.1:8000/products/${Id}`);
      setSearchproduct(res.data); // update search product
      setError(null); // clear any previous error
    } catch (error) {
      setError(error.message); // update error in parent
      setSearchproduct(null); // clear previous search result
    }
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between px-3">
      <Form className="d-flex" onSubmit={handlesearch}>
        <Row className="g-2 align-items-center">
          <Col xs="auto">
            <Form.Control
              type="number"
              placeholder="Search By ID"
              value={Id}
              onChange={(e) => setId(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default FormExample;