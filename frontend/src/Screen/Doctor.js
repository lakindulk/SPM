import React from "react";
import { Button } from 'react-bootstrap';
import {  Tabs,Tab } from "react-bootstrap";

const Doctor = () => {
  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
        <h1>HELLO HOW ARE YOU</h1>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="hey" title="Hey">
  <h1>HEY</h1>
  </Tab>
  <Tab eventKey="hi" title="Watsup">
  <h1>WHATS UP DOC</h1>

  </Tab>
  
</Tabs>
<h1>HELLO HOW ARE YOU</h1>
<h1>I AM THE DOC</h1>


        <Button variant="secondary">Secondary</Button>   </div>
  );
};

export default Doctor;