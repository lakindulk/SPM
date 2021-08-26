import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import "./doctorDetails.css";
import { Image } from "cloudinary-react";


const Reportdetails = (props) => {

  return (
    <div className="navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="lkcustom-pp">
          <Image
            className="lkcustom-pp-img "
            cloudName="iplus"
            publicId={props.cusPP}
          />
        </ListGroup.Item>
        <ListGroup.Item>{props.resfullname}</ListGroup.Item>       
      </ListGroup>     
    </div>
  );
};

export default Reportdetails;
