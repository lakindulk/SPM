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
import adminNotices from "./Screen/AdminaddNotice";
import EditAdminNotice from "./Components/EditAdminNotice";
import ContactUs from "./Screen/ContactUs";
import adminContactMsgs from "./Components/adminContactMsgs";
import labreports from "./Screen/Labreports";
import labreportAdd from "./Screen/LabreportAdd";
import EditLabReport from "./Components/EditLabReport";
import allRequests from "./Screen/AllRequestsLab"
import chemistNotifications from "./Screen/chemistNotifications";




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
          <Route exact path="/contactus" component={ContactUs} />
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
          <Route exact path="/admin/notices" component={adminNotices} />
        </Switch>
        <Switch>
          <Route exact path="/admin/contactus" component={adminContactMsgs} />
        </Switch>
        <Switch>
          <Route exact path="/admin/notices/edit/:id" component={EditAdminNotice} />
        </Switch>
        <Switch>
          <Route exact path="/labchemist/labreports" component={labreports} />
        </Switch>
        <Switch>
          <Route exact path="/labchemist/labreports/reportAdd" component={labreportAdd} />
        </Switch>
        <Switch>
          <Route exact path="/labchemist/labreports/edit/:id" component={EditLabReport} />
        </Switch>
        <Switch>
          <Route exact path="/labchemist/labreports/requests" component={allRequests} />
        </Switch>
        <Switch>
          <Route exact path="/labchemist/notifications" component={chemistNotifications} />
        </Switch>
        <Footer/>
      </main>
      
    </BRouter>
    
  );
};

export default App;
