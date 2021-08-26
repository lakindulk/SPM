import React,{useState,useEffect} from "react"
import Pharmacist_Navbar from "./Pharmacist_header";
import {Link} from 'react-router-dom';
//import { Container, Tabs,Tab,Row, Col, Table} from "react-bootstrap";
import axios from "axios";
import "./PFoarm.css"

function AllStockItem(){
    
    const[stockItems,setStockItems] = useState([]);
    useEffect(()=>{
        function getItems(){
            axios.get("http://localhost:6500/item/").then((res)=>{
                console.log(res.data)
                setStockItems(res.data);

            }).catch((err)=>{
                alert(err.message)
            })
        }
        getItems();
    } , [])
    function DeleteIteme(id){
            const item_id = id;
            console.log(item_id)
            axios.delete("http://localhost:6500/item/delete/"+item_id).then(()=>{
             alert("Item deleted")
             window.location.reload();
           
           
            }).catch((err)=>{
                alert(err)
             })
    }
  

    const renderTable = () => {
        return stockItems.map(item => {
          return (
            <tr>
              <td>{item.MediName}</td>
              <td>{item.Amount}</td>
              <td>{item.Cost}</td> 
              <td>{item.CompanyName}</td> 
              <div class="btn-toolbar"><td> <Link to={"/pharmacist/stock/edit/"+item._id}> <button type="button" className="btn btn-primary">Edit</button></Link>
                  <button type="button"  class="btn btn-danger" onClick={()=>{DeleteIteme(item._id)}}>Delete</button>  
              </td></div>
            </tr>
          )
        })
      }


    return(
        <div className="container">
             <Pharmacist_Navbar/>
             <div className="StockTable">
             <h4 align="middle">Stock Item</h4><br/>
             <Link to="/pharmacist/stock/add">
                    <button type="button" className="btn btn-primary">Add New Item</button>
            </Link>
           
            <table className="table"> 
        <thead className="thead-dark">
          <tr>
            <th>Madicine Name</th>
            <th>Amount</th>
            <th>Cost</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>

        </div> </div>
    )
}

export default AllStockItem;

