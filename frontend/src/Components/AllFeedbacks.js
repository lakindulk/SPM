import React,{useState,useEffect} from "react"
import axios from "axios";
import "./PFoarm.css"

function AllFeedbacks(){
    
    const[feedbacks,setFeedbacks] = useState([]);
    useEffect(()=>{
        function getFeedbacks(){
            axios.get("http://localhost:6500/feedback").then((res)=>{
                console.log(res.data)
                setFeedbacks(res.data)

            }).catch((err)=>{
                alert(err.message)
            })
        }
        getFeedbacks();
    } , [])
 

    const renderTable = () => {
        return feedbacks.map(feedback => {
          return (
            <tr>
              <td>{feedback.Name}</td>
              <td>{feedback.Comment}</td>
             
            </tr>
          )
        })
      }


    return(
        <div className="Allfeedcontainer">
            
             <div className="StockTable">
             <h4 align="middle">All Feedbacks</h4><br/>
        
           
            <table className="table"> 
        <thead className="thead-dark">
          <tr>
            <th style={{paddingRight:50}}>Name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>

        </div> </div>
    )
}

export default AllFeedbacks;

