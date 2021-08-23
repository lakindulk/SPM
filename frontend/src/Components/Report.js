import React, { useState, useEffect } from "react";
import { Container, Tabs,Tab,Row, Col } from "react-bootstrap";
import Reportdetails from "../Components/Reportdetails";
import Reqestreport from "../Components/Reqestreport";
import Editreport from "../Components/Editreport";
import axios from "axios";

const Report = () => {
  const [username, setUsername] = useState(" ");
  const [profileImage, setProfilePic] = useState(" ");
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    //Get doctor details
    const GetDoctorDetails = async () => {
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
            setUsername(res.data.doctor.username);
            setEmail(res.data.doctor.email);
            setfullname(res.data.doctor.fullname);
            setProfilePic(res.data.doctor.profileImage.imagePublicId);

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    GetDoctorDetails();
  }, []);

  return (
    <div className="custom-body" style={{ paddingBottom: "0.001vh" }}>
       <h1 style={{ paddingLeft:"2vh"}} >Hello Dr.{username}</h1> 
      <Row style={{ paddingTop: "3vh" }}>
        <Col span={7}>
          <Row>
            <Container>
              <Reportdetails
                resUsername={username}
                resEmail={email}
                cusPP={profileImage}
                resfullname={fullname}
              
              />
            </Container>
          </Row>
        </Col>
        <Col span={17}>
        <Container className="custom-content-body">
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  
  <Tab eventKey="REQUEST REPORTS" title="REQUEST REPORTS">
      <Reqestreport/>
  </Tab>
  <Tab eventKey="EDIT REPORTS" title="EDIT REPORTS">
      <Editreport/>
  </Tab>
 
</Tabs>

          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
