import { Component } from "react";
import { Button, Form, Dropdown, Container, Col, ButtonGroup, Row } from "react-bootstrap";
import "./MedicineOrder.css";

class MedicineOrder extends Component {
    render() {
        return (
            <div className="home">
                <h3 className="medicineOrder-top-title " textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Medicine Order Form</h3>
                <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
                    <Container>
                        <Form style={{ marginLeft: "40%" }}>
                            <div className="medicineOrder-form-body">
                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicName">
                                    <Form.Label style={{ marginTop: "20px", font:" bold 20px/20px Times New Roman,serif" }}>Full Name</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Full Name" style={{ maxHeight: "100%", marginTop: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAge">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Age</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Age" style={{ maxHeight: "100%", marginTop: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" style={{ maxHeight: "100%", marginTop: "10px" }} />
                                </Form.Group>


                                <Dropdown as={Col} md={10}>
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}> Gender</Form.Label>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "100%", maxHeight: "100%", marginTop: "8px" }}>
                                        Select One
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: "100%" }}>
                                        <Dropdown.Item href="#/action-1">Female</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Male</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>



                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAddress">
                                    <Form.Label style={{ marginTop: "10px", font:" bold 20px/20px Times New Roman,serif" }}>Address</Form.Label>
                                    <Form.Control type="address" placeholder="Enter Address" style={{ maxHeight: "100%", marginTop: "8px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Do you have any allergies ? </Form.Label>
                                    <Form.Check
                                        type={"checkbox"}
                                       
                                        label="Food "
                                       
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Are you currently tajing any medications ? </Form.Label>
                                    <Form.Control as="textarea" rows={3} style={{ marginTop: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif" }}>Existing Medical Problems / Conditions</Form.Label>
                                    <Form.Control as="textarea" rows={3} style={{ marginTop: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3"  controlId="formFile" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Medicine List</Form.Label>
                                    <Form.Control type="file" style={{ marginLeft: "10%" }}  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Signature</Form.Label>
                                    <Form.Control as="textarea"  style={{ marginTop: "10px" }} />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" type="submit" style={{ marginTop: "20px", width: "200%" }}>
                                                Order Medicine
                                            </Button>
                                            <Col>
                                                <Button variant="warning" type="reset" style={{ marginTop: "20px", marginLeft: "80%", width: "200%" }}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                            </div>
                        </Form>
                    </Container>
                </div>
            </div>


        )
    }
}

export default MedicineOrder;