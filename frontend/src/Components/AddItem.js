import React,{useState} from "react";
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios";
import "./PFoarm.css"



function AddItem(){
    const[Medi_Name,setMediName] = useState("");
    const[Amount,setAmount] = useState("");
    const[Cost,setCost] = useState("");
    const[Company_Name,setCompanyName] = useState("");

    function sendData(e){
        e.preventDefault();
       
        const newItem = {Medi_Name,Amount,Cost,Company_Name}
        console.log(newItem)

        axios.post("http://localhost:6500/item/add/",newItem).then(()=>{
            console.log(newItem)
            alert("Item Added")
            window.location.reload();
           
           
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
    
        <div className="container">
             <Pharmacist_Navbar/>
             <div className="formAllign">
            <div className="container"> <h4 align="middle">Add Item</h4>
            
            <form onSubmit={sendData}>
                <div className="form-group">
                <label for="drugName">Medicine Name</label>
                <input type="text" class="form-control" id="drugName" required placeholder="Enter the drug name" 
                onChange={(e)=>{
                    setMediName(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="Amount">Amount</label>
                <input type="number" className="form-control" id="Amount" required  placeholder="Enter Amount"
                 onChange={(e)=>{
                    setAmount(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="cost">Cost (Rs.)</label>
                <input type="number" className="form-control" id="cost" required placeholder="Enter Cost"
                 onChange={(e)=>{
                    setCost(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="Cname">Company Name</label>
                <input type="text" className="form-control" id="Cname" required placeholder="Enter Company Name"
                 onChange={(e)=>{
                    setCompanyName(e.target.value);
                }}/>
                </div>
  
                <br/><button type="submit" className="btn btn-primary">Add</button>
            </form>
            </div>
                    </div></div>
    )
}
export default AddItem;