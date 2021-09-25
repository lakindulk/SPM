import React, { useState, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import '../Components/Labreports.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import axios from "axios";

const Labreport = () => {
    const [labreports, setLabReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    const handlepdf = (testId, testName, patientName, date, patientEmail, description, chemistName, docName) => {
        createPDF(testId, testName, patientName, date, patientEmail, description, chemistName, docName);
    };

    const createPDF = (testId, testName, patientName, date, patientEmail, description, chemistName, docName) => {
        console.log(testId);
        console.log(patientName);
        console.log(date);

        const unit = "pt";
        const size = "A4"; //page size
        const orientation = "landscape";
        const doc = new jsPDF(orientation, unit, size); //create document


        const title = `| iCross  - Lab Report Details |-     Patient's Name: ${patientName} `;
        const testRName = ` Test Name: ${testName} `;
        const testRId = `Test ID: ${testId} `;
        const dateR = `Tested Date: ${date} `;
        const reResult = `Test Result: ${description} `;
        const pemail = `Patient's Email: ${patientEmail} `;
        const chemist = `Test done by Chemist :  ${chemistName}`;
        const doctr = `Doctor :  ${docName}`;
        const image = "https://res.cloudinary.com/iplus/image/upload/v1627568386/SPM/logo_nmawad.png";
        const back = "https://res.cloudinary.com/iplus/image/upload/v1631632248/SPM/setescope_vqtewp.png";
        const left = 30;
        const top = 8;
        const imgWidth = 100;
        const imgHeight = 100;

        const lefts = 500;
        const tops = 300;
        const imgWidths = 300;
        const imgHeights = 300;
        doc.setFontSize(15);
        doc.text(150, 40, title);
        doc.text(150, 80, chemist);
        doc.text(150, 100, doctr);
        doc.text(60, 160, testRId);
        doc.text(60, 190, testRName);
        doc.text(60, 220, dateR);
        doc.text(60, 270, reResult);
        doc.text(60, 300, pemail);
        doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);
        doc.addImage(back, 'PNG', lefts, tops, imgWidths, imgHeights);
        doc.save("Lab Report.pdf")
    }

    const deletereport = async (id) => {

        try {
            alert('Do you confirm the deletion?');
            axios.delete('http://localhost:6500/labreport/delete/' + id)
                .then((res) => {
                    alert(" Report Deleted Successfully!");
                    window.location.reload();

                })
                .catch((err) => {
                    alert(err);
                });
        } catch (error) {
            alert("Error Occured-" + error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const getReportData = async () => {

            try {
                await axios.get('http://localhost:6500/labreport/')

                    .then((res) => {
                        console.log(res.data.labreports);
                        setLabReports(res.data.labreports);

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
        <div>
            <div style={{ paddingTop: "1vh" }}>
                <div className="row row-cols-1 row-cols-md-3 g-4">

                    <div className="col">
                        <Link to="/labchemist/labreports/reportAdd">
                            <Button className="btn" variant="secondary">Add Lab Reports</Button>
                        </Link>
                    </div>
                    <Link to="/labchemist/labreports/requests">
                        <div className="col">
                            <Button className="btnr" variant="secondary">Report Requests</Button>
                        </div>
                    </Link>


                </div>

            </div>

            {/* <div >
                <input className="searchtext" onChange ={(e) =>{setSearch(e.target.value);}} name="searchQuery" value={search} type="search" placeholder="  Search Lab Report" />
            </div> */}


            <div className="topics">Previous Lab Reports</div>
            <div container className="testDisplay">

                {labreports && labreports.length > 0
                    ? labreports.map((item, report) => {
                        return <div key={report} className="singleTest">
                            <div style={{ marginTop: 20, marginLeft: 20, marginRight: 50 }}>



                                <div className="noticeContainer">
                                    <tr>
                                        <td>
                                            <div className="row">
                                                <div className="col">
                                                    <b><label>Test Id : {item.testId}</label> </b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="rowcolumn">
                                                    <div className="col">
                                                        <label>Test : {item.testName}</label>
                                                    </div></div>
                                                <div className="col">
                                                    <label>Patient Name : {item.patientName}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="rowcolumn">
                                                    <div className="col">
                                                        <DateTimePickerComponent value={item.date} style={{ fontSize: "19px" }} readOnly />
                                                    </div>
                                                </div>
                                                <div className="rowcolumn">
                                                    <div className="col">
                                                        <label>Patient Email : {item.patientEmail}</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="uppermargin">
                                                    <div className="col">
                                                        <label>Test Result : {item.description}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="uppermargin">
                                                    <div className="col">
                                                        <label>Lab test done by chemist {item.chemistName}.</label>
                                                    </div></div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label>Patient will diagnose by doctor {item.docName}.</label>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: 20, paddingTop: "3vh" }} className="row">
                                                <div className="col">

                                                    <Link to={"/labchemist/labreports/edit/" + item._id}><button className="actionbtnE" > Edit</button></Link>
                                                </div>
                                                <div className="col">
                                                    <button onClick={() => handlepdf(item.testId, item.testName, item.patientName, item.date, item.patientEmail, item.description, item.chemistName, item.docName)} className="actionbtnE">Report PDF</button>
                                                </div>
                                                <div className="col">
                                                    <button onClick={() => deletereport(item._id)} className="actionbtnR">Remove</button>
                                                </div>
                                            </div>


                                        </td>
                                    </tr>

                                </div>
                            </div>
                        </div>


                    })
                    : <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />{"     "}
                        No Data Added or Network Error...
                    </Button>}


            </div>
        </div>
    );
};

export default Labreport;