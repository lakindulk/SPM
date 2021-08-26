import { Component } from "react";
import { Button, Form, Dropdown,Col, Modal, Table } from "react-bootstrap";
import "./MyAppointment.css"
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import decode from "jwt-decode";


class MyAppointments extends Component {

    state = {
        id: '',
        Modal: false,
        appointmentDate: '',
        appointmentTime: '',
        physician: '',
        gender: '',
        fullname: '',
        appointmentNote: '',
        selectedAppointment: '',
        appointments: []
    };

    componentDidMount = async () => {
        this.setState({ dateValue: new Date(new Date().getFullYear(), new Date().getMonth(), 14) })
        this.setState({ timeValue: new Date("01/01/2021 11:00 AM") })
        this.setState({ minTime: new Date("01/02/2021 11:00 AM") })
        this.setState({ maxTime: new Date("01/02/2021 10:00 PM") })

        if (localStorage.getItem("authToken")) {
            const hasToken = await localStorage.getItem("authToken");
            const id = decode(hasToken).id;
            this.setState({ userId: id });
            console.log(this.state.userId);
            console.log(localStorage.getItem("authToken"));
        }

        // get appointments
        axios.get(`http://localhost:6500/codebusters/api/patientpvt/appointment/getapointments/${this.state.userId}`).then(res => {
            if (res.data.success) {
                this.setState({
                    appointments: res.data.apointment
                });
                console.log(this.state.appointments);
            }
        })
    }

    openModal = async (appoinment) => {
        this.setState({selectedAppointment:appoinment})
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
    appointmentDate = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    appointmentTime = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    physician = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    appointmentNote = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    selectPhysician = (e) => {
        console.log(e);
        this.setState({ physician: e })
    }

    Appointment = () => {
        const appointment = {
            appointmentDate: this.state.selectedAppointment.appointmentDate,
            appointmentTime: this.state.selectedAppointment.appointmentTime,
            physician: this.state.selectedAppointment.physician,
            gender: this.state.selectedAppointment.gender,
            userId: this.state.selectedAppointment.userId,
            fullname: this.state.selectedAppointment.fullname,
            appointmentNote: this.state.selectedAppointment.appointmentNote

        }
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        }

        // update appointments
        axios.put('http://localhost:6500/codebusters/api/patientpvt/appointment/updateapointments', appointment, config).then(res => {
            if (res.data.success) {
                alert(res.data.message);
                window.location.reload(false);
            }
        });
    }
             
    
    // delete appointments
    onDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:6500/codebusters/api/patientpvt/appointment/deleteapointments/${id}`)
                .then((res) => {
                    if(window.confirm('Are you sure to delete this record?')){
                    alert("Successfully Deleted");
                    }
                    window.location.reload();
                })
                
                .catch((err) => {
                    alert("Error occurred" + err);
                });
        } catch (error) {
            alert("Error occurred" + error);
        }
    };

    // search appointment by doctor name
    filterData(appointments, searchKey) {
        const result = appointments.filter((Apointment) =>
            Apointment.physician.toLowerCase().includes(searchKey)
        )
        this.setState({ appointments: result })
    }
    handleSearchArea = (e) => {
        //console.log(e.currentTarget.value);
        const searchKey = e.currentTarget.value;

        axios.get(`http://localhost:6500/codebusters/api/patientpvt/appointment/getapointments/${this.state.userId}`).then(res => {
            if (res.data.success) {
                this.filterData(res.data.apointment, searchKey)
            }
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row" >
                    <div className="col-lg-9 mt-2 mb-2">
                        <h3 className="myappointment-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>My Appointments</h3>
                    </div>
                    <div className="input-group rounded" style={{ marginTop: "30px", marginLeft: "30%", marginBottom: "30px" }}>
                        <input type="search"
                            style={{ maxWidth: "50%" }}
                            className="form-control rounded"
                            placeholder="Search your appointment by Doctor Name"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={this.handleSearchArea} />
                        <span className="input-group-text border-0" id="search-addon"  >
                            <i class="fas fa-search"></i>
                        </span>
                    </div>

                </div>
                <div className="home">

                    <div style={{ paddingTop: "5vh", paddingBottom: "5vh", marginTop: "20px" }}></div>
                    <div className="myappointment-form-body">
                        <Table striped bordered hover >
                            <thead >
                                <tr >
                                    <th >#</th>
                                    <th >Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Physician</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>Appointment Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointments.map((appointments, index) => (
                                    <tr>
                                        <th scope="row" style={{ width: "15%" }}>{index + 1}</th>
                                        <td >{appointments.appointmentDate}</td>
                                        <td>{appointments.appointmentTime}</td>
                                        <td>{appointments.physician}</td>
                                        <td>{appointments.fullname}</td>
                                        <td>{appointments.gender}</td>
                                        <td>{appointments.appointmentNote}</td>

                                        <th scope="col">
                                            <a className="btn btn-warning" href="#" style={{ marginTop: "5px" }} onClick={this.openModal.bind(this,appointments)}>
                                                <i className="far fa-edit" ></i>&nbsp; Edit
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-danger" href="#" style={{ marginTop: "10px" }}onClick={this.onDelete.bind(this,appointments._id)} >
                                                <i className="far fa-trash-alt"></i>&nbsp; Delete
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-primary" href="#" style={{ marginTop: "10px" }}>
                                                <i className="fa fa-download"></i>&nbsp; Generate PDF
                                            </a>
                                        </th>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal
                    show={this.state.Modal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    closable={false}
                >
                    <Modal.Body >
                        <Form>
                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicDate">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Date</Form.Label>
                                <div>
                                    <DatePickerComponent placeholder="Enter Date"
                                        //value={this.state.selectedAppointment.appointmentDate} name="appointmentDate" format="dd - MMM - yy" style={{ marginTop: "20px" }}
                                        value={this.state.selectedAppointment.appointmentDate} name="appointmentDate" format="dd - MMM - yy" style={{ marginTop: "20px" }}
                                        onChange={this.appointmentDate}>
                                    </DatePickerComponent>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicTime">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Time</Form.Label>
                                <div>
                                    <TimePickerComponent placeholder="Select a Time"
                                        value={this.state.selectedAppointment.appointmentTime} min={this.state.minTime} max={this.state.maxTime}
                                        //value={this.state.appointmentTime} min={this.state.minTime} max={this.state.maxTime}
                                        name="appointmentTime"
                                        format="HH:mm" step={60}
                                        style={{ marginTop: "20px" }}
                                        onChange={this.appointmentTime}>
                                    </TimePickerComponent>
                                </div>
                            </Form.Group>
                            <Dropdown style={{ marginLeft: "5%", width: "90%" }} onSelect={this.selectPhysician}>
                                <Form.Label style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif"}}> Physician</Form.Label>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ maxHeight: "100%", marginLeft: "12%", width: "70%" }}>
                                    {this.state.selectedAppointment.physician}
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ width: "100%" }}>
                                    <Dropdown.Item eventKey="Mr. Silva">Mr. Silva</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mr. Perera">Mr. Perera</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mrs. Amarasinghe">Mrs. Amarasinghe</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mrs. Gamage">Mrs. Gamage</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dr. Namal Gamage">Dr. Namal Gamage</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Note</Form.Label>
                                <Form.Control as="textarea" name="appointmentNote" rows={3} style={{ marginTop: "10px" }} onChange={this.appointmentNote} value={this.state.selectedAppointment.appointmentNote} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.Appointment}>Update</Button>{' '}
                        <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MyAppointments;