import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";
import RegistrationScreen from "./Screen/RegistrationScreen";
import Home from "./Screen/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Doctor from "./Screen/Doctor";
import Patient from "./Screen/Patient";
import Labchemist from "./Screen/Labchemist";
import Pharmasist from "./Screen/Pharmasist";
import AdministrationLoginScreen from "./Screen/AdministrationLoginScreen";
import Admin from "./Screen/Admin";
import Report from "./Components/Report";
import Reportxx from "./Components/Reqestreport";
import AddItem from "./Components/AddItem";
import AllStockItem from "./Components/AllStock"
import EditItem from "./Components/EditItem";
import AllOrders from "./Components/AllOrders";
import OrderDeliver from "./Components/OrderDelivery";
import AddFeedback from "./Components/Feedback";
import AllFeedbacks from "./Components/AllFeedbacks";
import Phar_notification from "./Components/Phar_notification";


const App = () => {
  return (
    <BRouter>
      <main className="page-body-content">
      
      
      <Header/>
        <Switch>
          <Route exact path="/admin" component={AdministrationLoginScreen} />
        </Switch>
   
        <Switch>
          <Route exact path="/profile/admin" component={Admin} />
        </Switch>
        <Switch>
          <Route exact path="/registration" component={RegistrationScreen} />
        </Switch>
        <Switch>
          <Route exact path="/report" component={Report} />
        </Switch>
        <Switch>
          <Route exact path="/reports" component={Reportxx} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <Route exact path="/profile/doctor" component={Doctor} />
        </Switch>
        <Switch>
          <Route exact path="/profile/patient" component={Patient} />
        </Switch>
        <Switch>
          <Route exact path="/profile/labchemist" component={Labchemist} />
        </Switch>
        <Switch>
          <Route exact path="/profile/pharmasist" component={Pharmasist} />
        </Switch>
        <Switch>
          <Route exact path="/profile/pharmasist/notification" component={Phar_notification} />
        </Switch>
        <Switch>
          <Route path="/pharmacist/stock/add" exact component={AddItem}/>
        </Switch>
        <Switch>
          <Route path="/pharmacist/stock" exact component={AllStockItem}/>
        </Switch>
        <Switch>
          <Route path="/pharmacist/stock/edit/:id" exact component={EditItem}/>
        </Switch>
        <Switch>
          <Route path="/pharmacist/orders" exact component={AllOrders}/>
        </Switch>
        <Switch>
          <Route path="/pharmacist/orders/delivery/:id" exact component={OrderDeliver}/>
        </Switch>
        <Switch>
          <Route path="/feedback/add" exact component={AddFeedback}/>
        </Switch>
        <Switch>
          <Route path="/admin/feedbacks" exact component={AllFeedbacks}/>
        </Switch>
       
     <Footer/>

     
      </main>
      </BRouter>
      
 
      
     
  );
};

export default App;





