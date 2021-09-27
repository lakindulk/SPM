import React,{useState,useEffect} from "react"
import Pharmacist_Navbar from "./Pharmacist_header";
import {Link} from 'react-router-dom';

import axios from "axios";
import { Image } from "cloudinary-react";
import "./PFoarm.css"

function AllOrders(){
    
    const[Orders,setOrders] = useState([]);
  
    useEffect(()=>{
        function getOrders(){
            axios.get("http://localhost:6500/order/").then((res)=>{
               // console.log(res.data)
                setOrders(res.data)
                 
            }).catch((err)=>{
                alert(err.message)
            })
        }
        getOrders();
    } , [])
    

    const renderTable = () => {
        return Orders.map(Order => {
          return (
            <tr>
              
              <td>{Order.name}</td>
              {/* <td>{Order.MediList}</td> */}
              <td>{Order.address}</td> 
              <td>{Order.telephone}</td>
              <td><Image className="img"
                  cloudName="/iplus/image/upload/" publicId={Order.photo}
                  />
              </td> 
              <td>{Order.status}</td> 
              <div className="btn-toolbar"><td> <Link to={"/pharmacist/orders/delivery/"+Order._id}> <button type="button" className="btn btn-primary">Deliver</button></Link>
                  
              </td></div>
            </tr>
            
          )
        })
      }


    return(
        <div className="container">
             <Pharmacist_Navbar/>
             <div className="OrderTable">
             <h4 align="middle">All Orders</h4><br/>
        
           
            <table className="table"> 
        <thead className="thead-dark">
          <tr>
            <th>Patient Name</th>
            <th>Address</th>
            <th>Telephone No.</th>
            <th>Drug List</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="data">{renderTable()}</tbody>
      </table>
     

        </div> </div>
        
    )
}

export default AllOrders;

