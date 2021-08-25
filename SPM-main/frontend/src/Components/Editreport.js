import React, { useState, useEffect } from "react";

import { Row, Col ,Container ,Card} from "react-bootstrap";

import axios from "axios";
import Editreportreq from "./Editreportreq";
const DocReport = () => {
  const [reports, setreports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  
  useEffect(() => {
    setLoading(true);
    const getReportData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/getProfile",
            config
          )
          
          .then((res) => {
            setreports(res.data.doctor);            
            

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
        } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getReportData();
  }, []);
  return (
    <div >     
      <Row>
        <Col >
          <Row>
            <Container>
           <h3>Added Reports</h3>
          {reports.Report && reports.Report.length > 0
                ? reports.Report.map((item,report) => {
            return <div key={report}>
           
              <Card border="secondary" style={{ width: '40rem' }}  >
              
                <Card.Header><h5>Patient Name:  {item.patient} </h5>
          
         </Card.Header>
                <Card.Body>
               <Card.Title>Description:</Card.Title>
              <Card.Text>
              {item.patientsdescription}
             </Card.Text>
             <Editreportreq
                       respatientsdescription={item.patientsdescription} 
                       resdocnote={item.docnote}
                       resreporttype1={item.reporttype1}
                       resreporttype2={item.reporttype2}
                       resid={item._id}
                       resothertype={item.othertype}
                      />
            </Card.Body>
            
              </Card>
              <br/>                                           
              </div>
          })
        : "Loading..."}   
            </Container>
          </Row>
        </Col>   
      </Row>   
    </div>
  );
};

export default DocReport;
