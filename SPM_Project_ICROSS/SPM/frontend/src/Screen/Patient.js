import { Component } from "react";
import { Button, Form, Container, Image, Col, ButtonGroup, Row, Modal, Dropdown,OverlayTrigger,Tooltip } from "react-bootstrap";
import "../Screen/PatientProfile/PatientProfile.css";
import decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";


class PatientProfile extends Component {
  
  state = {
    //id:'',
    userId: '',
    user: '',
    Modal: false,
    address: '',
    bloodGroup: '',
    email: '',
    fullname: '',
    gender: '',
    nicNumber: '',
    password: '',
    phone: '',
    role: '',
    username: '',
    zipcode: '',
    
  }

  componentDidMount = async () => {

    if (localStorage.getItem("authToken")) {
      const hasToken = localStorage.getItem("authToken");
      const id = decode(hasToken).id;
      await this.setState({ userId: id });
      console.log(this.state.userId);
      console.log(localStorage.getItem("authToken"));

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      }

      
      


      // get patient details 
      await axios.get(`http://localhost:6500/patient/getPatientDetails/${this.state.userId}`, config).then(res => {
        if (res.data.success) {
          this.setState({ user: res.data.data })
          this.setState({ address: this.state.user.address })
          this.setState({ bloodGroup: this.state.user.bloodGroup })
          this.setState({ email: this.state.user.email })
          this.setState({ fullname: this.state.user.fullname })
          this.setState({ gender: this.state.user.gender })
          this.setState({ nicNumber: this.state.user.nicNumber })
          this.setState({ password: this.state.user.password })
          this.setState({ phone: this.state.user.phone })
          this.setState({ role: this.state.user.role })
          this.setState({ username: this.state.user.username })
          this.setState({ zipcode: this.state.user.zipcode })
          console.log(this.state.user);
        }
      }
      )
    }

   // delete profile
//    onDelete = async (id) => {

//     console.log(id);
//     try {
//         await axios.delete(`http://localhost:6500/patient/deletePatientProfile/${id}`)
//             .then((res) => {
//                 alert("Successfully Deleted");
//                 window.location.reload();
//             })
//             .catch((err) => {
//                 alert("Error occurred" + err);
//             });
//     } catch (error) {
//         alert("Error occurred" + error);
//     }
// };
  }

  openModal = () => {
    this.setState({ Modal: true })
  }

  closeModal = () => {
    this.setState({ Modal: false })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(e.target.value)
   
  }

  submitDetails = (e) => {
    e.preventDefault();

    
    const patient = {
      userId: this.state.userId,
      address: this.state.address,
      bloodGroup: this.state.bloodGroup,
      email: this.state.email,
      fullname: this.state.fullname,
      gender: this.state.gender,
      nicNumber: this.state.nicNumber,
      password: this.state.password,
      phone: this.state.phone,
      username: this.state.username,
      zipcode: this.state.zipcode
    }


    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    }

    // update patient details
    axios.put('http://localhost:6500/patient/updatePatientDetails', patient, config).then(res => {
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload(false);
        //window.location.reload();

      }
    })
  }


  selectGender = (e) => {
    console.log(e);
    this.setState({ gender: e })
  }

  selectBloodGroup = (e) => {
    console.log(e);
    this.setState({ bloodGroup: e })
  }


  render() {
    return (
     
      <div className="home">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Link to="/profile/patient/getServices">
            <div className="col">  
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled"><strong><h5>By clicking this button you can make a doctor appointment and get pharmacy services , provided by the ICROSS!</h5></strong></Tooltip>}>            
              <Button className="btnr" variant="primary" style={{ marginLeft: "80%", width: "150%", marginTop: "20px" }}> Click Here To Get Our Services</Button>                   
              </OverlayTrigger>
            </div>
          </Link>

        </div>
        <Container>
          <div style={{ position: "absolute" }}>
            <Image style={{ marginTop: "90px", width: "20%", height: "80%", marginLeft: "10%" }} src="../123456.jpg" />
          </div>
        </Container>
        <h3 className="patient-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Patient Profile</h3>
        <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
          <Container >
            <Form style={{ marginLeft: "40%", width: "55%" }} >
              <div className="patient-form-body">
                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>Full Name</Form.Label>
                  <Form.Control type="text" value={this.state.user.fullname} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Gender</Form.Label>
                  <Form.Control type="text" value={this.state.user.gender} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Email</Form.Label>
                  <Form.Control type="email" value={this.state.user.email} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Blood Group</Form.Label>
                  <Form.Control type="text" value={this.state.user.bloodGroup} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Address</Form.Label>
                  <Form.Control type="text" value={this.state.user.address} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "8px", font: " bold 20px/20px Times New Roman,serif" }}>Zip Code</Form.Label>
                  <Form.Control type="text" value={this.state.user.zipcode} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "8px", font: " bold 20px/20px Times New Roman,serif" }}>NIC Number</Form.Label>
                  <Form.Control type="text" value={this.state.user.nicNumber} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Phone Contact</Form.Label>
                  <Form.Control type="number" value={this.state.user.phone} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>
                <Row>
                  <ButtonGroup aria-label="Basic example" >
                    <Button variant="primary" onClick={this.openModal} style={{ marginTop: "20px", marginLeft: "10%", marginRight: "30%" }}>
                      Update Profile
                    </Button>
                   
                  </ButtonGroup>
                </Row>
              </div>
            </Form>
          </Container>
        </div>

        <Modal
          show={this.state.Modal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          closable={false}
        >
          <Modal.Body >
         
              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }} >
                  Full Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control size="30" value={this.state.fullname} name="fullname" required onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} required />
                </Col>
              </Form.Group>
             

              <Dropdown style={{ marginLeft: "5%", width: "90%" }} onSelect={this.selectGender}>
                <Form.Label style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Gender</Form.Label>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ maxHeight: "100%", marginLeft: "12%", width: "70%" }} required>
                  {this.state.gender}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "70%" }}>
                  <Dropdown.Item eventKey=" Select One" > Select One</Dropdown.Item>
                  <Dropdown.Item eventKey="Male" >Male</Dropdown.Item>
                  <Dropdown.Item eventKey="Female" >Female</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" value={this.state.email} name="email" required onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} readOnly />
                </Col>
              </Form.Group>
            

              <Dropdown style={{ marginLeft: "5%", width: "90%" }} onSelect={this.selectBloodGroup}>
                <Form.Label style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Blood Group</Form.Label>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ maxHeight: "100%", marginLeft: "5%", width: "70%" }} required>
                  {this.state.bloodGroup}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "70%" }}>
                  <Dropdown.Item eventKey=" Select One" > Select One</Dropdown.Item>
                  <Dropdown.Item eventKey="A+">A+</Dropdown.Item>
                  <Dropdown.Item eventKey="B+">B+</Dropdown.Item>
                  <Dropdown.Item eventKey="AB">AB</Dropdown.Item>
                  <Dropdown.Item eventKey="B-">B-</Dropdown.Item>
                  <Dropdown.Item eventKey="A-">A-</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                  Address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control value={this.state.address} name="address" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} required />
                </Col>
              </Form.Group>
             

              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                  Zip Code
                </Form.Label>
                <Col sm={10}>
                  <Form.Control value={this.state.zipcode} name="zipcode" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} required />
                </Col>
              </Form.Group>
             

              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                  NIC Number
                </Form.Label>
                <Col sm={10}>
                  <Form.Control value={this.state.nicNumber} name="nicNumber" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} required />
                </Col>
              </Form.Group>
            

              <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                  Phone Contact
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="number" size="10" value={this.state.phone} name="phone" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} required />
                </Col>
              </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={this.submitDetails}>Update</Button>{' '}
            <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default PatientProfile;




