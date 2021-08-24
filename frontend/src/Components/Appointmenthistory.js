import React, { useState, useEffect } from "react";

import { Card, Button} from "react-bootstrap";

import axios from "axios";
const Appointmenthistory = () => {
  const [treatments, settreatment] = useState([]);
  const [fullname, setfullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



 
  
  useEffect(() => {
    setLoading(true);

    const GetDoctorName = async () => {
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
            setfullname(res.data.doctor.fullname);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };

    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/treatment/gettreatments",
          )
          
          .then((res) => {
            settreatment(res.data.Treatment);                        

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
    GetDoctorName();
    getTreatments();
  }, []);
  return (
    <div style={{paddingBottom:"4vh"}}>

    {treatments.map((Treatment,index)=>
    (
      <div  key={index}>
{Treatment.docname === fullname && (
        <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>
<Card 
border="secondary" style={{ width: '42rem' }} 
style={{paddingLeft:"2vh",paddingTop:"1vh"}}
>
<Card.Title as="h3" style={{paddingLeft:"2vh",paddingTop:"1vh",color:"darkblue"}} >Patient Name: {Treatment.patientname}</Card.Title>
<Card.Body>
  <Card.Text as="h4">Suggesions: {Treatment.suggesions}</Card.Text>
  <Card.Text as="h5" style={{paddingTop:"0.1vh"}}>Medicines: {Treatment.medicines}</Card.Text>
  
  <Card.Text as="p">
  Other Notes: {Treatment.othernotes}
  </Card.Text>
  <Card.Text as="p">
  Note Due to Report : {Treatment.noteduetoreport}
  </Card.Text>
  <Button variant="outline-danger"  style={{paddingTop:"1.5vh"}}>Delete</Button>{"   "}

  <Button variant="outline-dark" >Generate Report</Button>
</Card.Body>
</Card>

</div>





)}
      </div>

      
    )
    )}



  </div>
  );
};

export default Appointmenthistory;
