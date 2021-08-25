import React, { useState, useEffect } from "react";
import { Button } from '../Components/Button.js';
import '../Components/HomeSection.css';
import Card from "../Components/Cards"
import axios from "axios";




function Home() {

    const [notices, setallNotices] = useState([]);

    useEffect(() => {
        function getNotice() {
            axios.get("http://localhost:6500/notice/")
                .then((res) => {
                    setallNotices(res.data.data);
                }).catch((error) => {
                    alert(error.message);
                })
        }
        getNotice();
    }, [])

    return (
        <div className='home-container'>
            <video src="/videos/video-4.mp4" autoPlay loop muted />
            <div style={{ paddingTop: "6vh", paddingBottom: "3vh" }}>
                <h1>The best solution for your clinical journey</h1>
                <p><b>Handle your workflow and enable online doctor appointment, medical records and medicine...</b></p>
            </div>
            <div style={{ paddingBottom: "3vh" }}>
                <Button className='btn' buttonStyle='btn--outline'
                    buttonSize='btn--large'
                >
                    Add Doctor Appointment
                </Button>

            </div>
            <div style={{ paddingTop: "1vh", paddingBottom: "6vh" }}>
                <h2><b>Get all services effectively by SignUp to iCross</b></h2>
                <br /><br />
                <h1 style={{ fontFamily: 'Times New Roman' }}>..Notices for You..</h1>
            </div>
            <div container className="noticeDisplay">

                {notices.length > 0 && notices.map((item, index) =>
                (
                    <div key={index} className="singleNotice">
                       <div className="row">
                            <div className="col">
                                <b><label>{item.topic}</label> </b>
                            </div>
                            <div className="col">
                                <label>{item.date}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>{item.description}</label>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">

                <div className="col">
                    <div>
                        <Card
                            title='Doctor'
                            imageUrl='images/image-1.jpg'
                            body='You can get services from a doctor. Put an appoinment and get your treatments.'
                        />
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Card
                            title='Lab Chemist'
                            imageUrl='images/image-2.jpg'
                            body='Highly qualified lab chemist staff to provide your acctual medical tests results. '
                        />
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Card
                            title='Pharmacist'
                            imageUrl='images/image-3.jpg'
                            body='Medicines to your door step. Order medicines and we are await to provide the service'
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home;