import React from "react";

import { Button } from "react-bootstrap";

function SearchDoctor({title,imageSource,text}){
  return(
    <div className="card text-center bg-dark">
      <div className="overflow">
      <img src={imageSource} alt="" className="card-img-center"/>
      </div>
      <div className="card-body text-light">
        
        <h4 className="my-title">{title}</h4>
        <p className="card-text text-secondary">{text}</p>
        <Button variant="secondary" className="btn btn-outline-warning">Read More..</Button>
      </div>
    </div>
  )
}
export default SearchDoctor;