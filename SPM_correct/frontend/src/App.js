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
          <Route exact path="/admin/notices/edit/:id" component={EditAdminNotice} />
        </Switch>
        <Footer/>
      </main>
      
    </BRouter>
    
  );
};

export default App;
