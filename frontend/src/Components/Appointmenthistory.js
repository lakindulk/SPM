import React, { useState, useEffect } from "react";

import { Row, Col ,Container ,Card} from "react-bootstrap";

import axios from "axios";
const Appointmenthistory = () => {
  const [treatments, settreatment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  
  useEffect(() => {
    setLoading(true);
    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/treatment/gettreatments",
          )
          
          .then((res) => {
            settreatment(res.data.treatment);                        

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
    getTreatments();
  }, []);
  return (
    <div >     
     
          
    </div>
  );
};

export default Appointmenthistory;
