import React,{Component,useEffect,useState} from "react"
import { useParams } from "react-router";
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios"
import "./PFoarm.css"



// const initialstate = {
//     _id: '',
//     PatientName: '',
//     MediList: '',
//     Address: '',
//     TeleNo:'',
//     Status:''
// }

// export default class OrderDeliver extends Component {

//     constructor(props) {
//         super(props);
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.state = initialstate;
//         this.state = {
//             Orders: []
//         }
//     }

//     componentDidMount() {
//         console.log(this.props.match.params.id);
//         axios.get(`http://localhost:6500/order/get/${this.props.match.params.id}`)
//             .then((response) => {


//                 this.setState({ Orders: response.data, PatientName: response.data.PatientName });
//                 console.log(response.data);
//                 console.log(response.data.fitem.PatientName);

//                 this.setState({ MediList: response.data.forder.MediList })
//                 this.setState({ Address: response.data.forder.Address })
//                 this.setState({ TeleNo: response.data.forder.TeleNo })
//                 this.setState({ Status: response.data.forder.Status })


//             })
//             .catch(function (error) {
//                 alert('error in get Order to deliver');
//                 console.log(error);
//             })

//     }




//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     onSubmit(e) {
//         e.preventDefault();
//         const id = this.props.match.params.id;

//         let Order = {
//             PatientName: this.state.PatientName,
//             MediList: this.state.MediList,
//             Address: this.state.Address,
//             TeleNo: this.state.TeleNo,
//             Status: this.state.Status,

//         }
//         console.log('Data', Order);

//         axios.put(`http://localhost:6500/order/deliver/${id}`, Order)
//             .then(response => {
//                 alert('Order Delivered successfully')
//                 window.location = "/pharmacist/orders";
//             })
//             .catch(error => {
//                 console.log(error.message);
//                 alert(error.message)
//             })

//     }


//     render() {
//         return (
//             <div>
//             <Pharmacist_Navbar/>
//             <div className="item-edit-container">
//                 <br/>
                
//                 <h4 align="middle">Edit Order</h4>
//                 <form onSubmit={this.onSubmit} className="container">
//                     <div className="mb-3">
//                         <label htmlFor="formGroupExampleInput" className="form-label"> Patient Name</label>
//                         <input type="text"
//                             className="form-control"
//                             id="PatientName"
//                             name="PatientName"
//                             placeholder=""
//                             required
//                             value={this.state.PatientName}
//                             onChange={this.onChange} />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
//                         <input type="text"
//                             className="form-control"
//                             id="Address"
//                             name="Address"
//                             placeholder=""
//                             required
//                             value={this.state.Address}
//                             onChange={this.onChange} />
//                     </div>
//                     {/* <div className="mb-3">
//                         <label htmlFor="formGroupExampleInput2" className="form-label">Cost</label>
//                         <input type="Number"
//                             className="form-control"
//                             id="Cost"
//                             name="Cost"
//                             placeholder=""
//                             required
//                             value={this.state.Cost}
//                             onChange={this.onChange} />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="formGroupExampleInput2" className="form-label">Company Name</label>
//                         <input type="text"
//                             className="form-control"
//                             id="CompanyName"
//                             name="CompanyName"
//                             placeholder=""
//                             required
//                             value={this.state.CompanyName}
//                             onChange={this.onChange} />
//                     </div> */}
//                     <div className="mb-3">
//                         <button type="submit" className="btn btn-primary">Deliver</button>
//                     </div>
//                 </form>
//                 <br />

//             </div>
//             </div>
//         )
//     }

// }




function OrderDeliver(e){
    const[name,setname] = useState("");
    const[address,setaddress] = useState("");
    const[photo,setphoto] = useState("");
    const[telephone,settelephone] = useState("");
    const[status,setstatus] = useState("");
    const [age,setage]= useState("");
    const [email,setemail]= useState("");
    const [gender,setgender]= useState("");
    const [allergies,setallergies]= useState("");
    const [currentlyTakingMedications,setcurrentlyTakingMedications]= useState("");
    const [existingMedicalProblems,setexistingMedicalProblems]= useState("");
    const [userID,setuserID]= useState("");
    const [signature,setsignature]= useState("");
  
    
    const order_id = useParams();
    //console.log(order_id)

    // useEffect(()=>{
        getOrder();
        function getOrder(){
          // console.log(order_id);
           
            axios.get(`http://localhost:6500/order/get/${order_id.id}`).then((res)=>{
                
                setname(res.data.forder.name)
                setaddress(res.data.forder.address)
                settelephone(res.data.forder.telephone)
                setstatus("Delivered")
                setphoto(res.data.forder.photo)
                setage(res.data.forder.age)
                setallergies(res.data.forder.allergies)
                setcurrentlyTakingMedications(res.data.forder.currentlyTakingMedications)
                setemail(res.data.forder.email)
                setgender(res.data.forder.gender)
                setexistingMedicalProblems(res.data.forder.existingMedicalProblems)
                setuserID(res.data.forder.userID)
                setsignature(res.data.forder.signature)

                //  setStatus("Pending")
                // console.log(Status)
               

            }).catch((err)=>{
                alert(err.message)
               // console.log(err)
            })
        }
        // function UpdateItem(e){
        //     e.preventDefault();
           
        //     const updatedItem = {Medi_Name,Amount,Cost,Company_Name}
        //     console.log(updatedItem)
    
        //     axios.put(`http://localhost:6500/item/update/${item_id.id}`,updatedItem).then(()=>{
        //         console.log(updatedItem)
        //         alert("Item Updated")
               
               
        //     }).catch((err)=>{
        //         alert(err)
        //     })
        // }
        
        
    // })
    
        function StatusChange(e){
            e.preventDefault();
           
            // setStatus("Delivered")
            // console.log(Status);
            const deliveredOrder={status,name,age,email,gender,address,allergies,currentlyTakingMedications,existingMedicalProblems,userID,signature,photo,telephone}
            console.log(deliveredOrder)
            axios.put(`http://localhost:6500/order/deliver/${order_id.id}`,deliveredOrder).then(()=>{
                
                alert("Order Delivered")
                window.location = "/pharmacist/orders";
               
               
            }).catch((err)=>{
                alert(err)
            })
        }
   

return(
    <div className="container">
             <Pharmacist_Navbar/>
             <h4 align="middle">Order Deliver</h4>
            <form  onSubmit={StatusChange}>
                <div className="form-group">
                <label for="PatientName">Patient Name</label>
                <input type="text" class="form-control" id="PatientName" required placeholder="" value={name}
                onChange={(e)=>{
                    setname(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="Address">Address</label>
                <input type="text" className="form-control" id="Address" required  placeholder="" value={address}
                 onChange={(e)=>{
                    setaddress(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="TeleNo">Telephone Number</label>
                <input type="number" className="form-control" id="TeleNo"  placeholder="" defaultValue={telephone}
                 onChange={(e)=>{
                    settelephone(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="bill">Bill Amount</label>
                <input type="number" className="form-control" id="Bill" required placeholder="Insert the bill amount" 
                 onChange={(e)=>{
                    setstatus("Delivered");
                }}/><br/>
                </div>
  
                <button type="submit" className="btn btn-primary">Deliver</button>
            </form>
                    </div>
)
}
export default OrderDeliver;