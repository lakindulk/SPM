import React, { useState } from "react";
import {  Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";

const Reqestreport = (props) => {
  const [patient, setpatient] = useState("");
  const [patientsdescription, setpatientsdescription] = useState("");
  const [docnote, setdocnote] = useState("");
  const [reporttype1, setreporttype1] = useState("");
  const [reporttype2, setreporttype2] = useState("");
  const [othertype, setothertype] = useState("");
  const handleOk2 = () => {
    requestreport();
    
  };

  
  const requestreport = async () => {
  
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
        patient,
        patientsdescription,
        docnote,
        reporttype1,
        reporttype2,
        othertype
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/doctorpvt/addreportrequest",
          dataObject,
          config
        )
        .then((res) => {
          alert("report data added Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  


  return (
    <div  style={{ paddingTop: "3vh", paddingBottom: "25vh" }}>
      <Form>
   
      <Form.Group as={Row} className="mb-3" controlId="topic">
    <Form.Label column sm="2" className="labelstyle" >
    Patient : 
    </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter Patient Name" onChange={(e) => {
                        setpatient(e.target.value);
                      }} />
    </Col>
  </Form.Group>


  <Form.Group as={Row} className="mb-3" controlId="authors">
    <Form.Label column sm="2" className="labelstyle" >
   Description :
        </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter Paper Description"  onChange={(e) => {
                        setpatientsdescription(e.target.value); }}/>
    </Col>
  </Form.Group>
 
  <Form.Group as={Row} className="mb-3" controlId="subject">
    <Form.Label column sm="2" className="labelstyle" >
    Doctor note :
            </Form.Label>
    <Col sm="10">
    <Form.Control as="textarea"
                rows="7" placeholder="Enter Doctor Note"  onChange={(e) => {
                        setdocnote(e.target.value); }}/>
    </Col>
  </Form.Group>

  <Form.Label column  className="lklabelstyle" >
Reports               </Form.Label>
  <Form.Group as={Row}  controlId="abstract">
    <Form.Label column  className="lklabelstyle" >
    Type 1:
                </Form.Label>
    <Col sm="10">
    <Form.Control
          as="select"
          custom
          onChange={(e) => {
            setreporttype1(e.target.value); }}>
            <option value="not selected">No type 1 report</option>
          <option value="Shugar Reports">Shugar Reports</option>
          <option value="Presure Reports">Presure Reports</option>
          <option value="Cholesterol reports">Cholesterol reports</option>
          <option value="Thyroid Stimulating Hormone">Thyroid Stimulating Hormone</option>
        </Form.Control>   
    </Col>
  </Form.Group>

  <Form.Group as={Row}  controlId="abstract">
    <Form.Label column  className="lklabelstyle" >
    Type 2:
                </Form.Label>
    <Col sm="10">
    <Form.Control
          as="select"
          custom
          onChange={(e) => {
            setreporttype2(e.target.value); }}
        >
          <option value="not selected">No type 2 report</option>
          <option value="Complete Blood Count">Complete Blood Count</option>
          <option value="Prothrombin Time">Prothrombin Time</option>
          <option value="Basic Metabolic Panel">Basic Metabolic Panel</option>
          <option value="Lipid Panel">Lipid Panel</option>
          <option value="Liver Panel">Liver Panel</option>
          <option value="Prothrombin Time">Prothrombin Time</option>

        </Form.Control>   
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="abstract">
    <Form.Label column sm="2" className="lklabelstyle" >
    Other :
                </Form.Label>
    <Col sm="10">
    <Form.Control type="text" placeholder="Enter Other report types" onChange={(e) => {
                        setothertype(e.target.value); }}/>
    </Col>
  </Form.Group>



  <Button onClick={handleOk2} variant="primary" type="submit" >
    Submit
  </Button>
</Form>
    </div>
  );
};

export default Reqestreport;
