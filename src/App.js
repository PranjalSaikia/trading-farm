import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';
import Login from './auth_components/js/Login';
import HomePage from './Containers/HomePage';
import FetchingH from './Containers/FetchingH';
import Backup from './Containers/Backup';
import ChangePassword from './Containers/ChangePassword';
import BarcodeContainer from './Containers/BarcodeContainer';
import BarcodePrinter from './Containers/BarcodePrinter';
import Bills from './Containers/Bills';
import ViewBills from './Containers/ViewBills';
import PrintBills from './Containers/PrintBills';
import EditBillContainer from './Containers/EditBillContainer';
import Loading from './Containers/Loading';
import ViewChallan from './Containers/ViewChallan';
import PrintChallans from './Containers/PrintChallans';
import EditChallanContainer from './Containers/EditChallanContainer';
import OffLoad from './Containers/OffLoad';
import Tracking from './Containers/Tracking';
import ViewChallanOff from './Containers/ViewChallanOff';
import Delivery from './Containers/Delivery';
import Reports from './Containers/Reports';
import NotFound from './Containers/NotFound';
import TrucksContainer from './Containers/TrucksContainer';
import Test from './Containers/Test';


class App extends Component {
  render() {
    return (
      <Router history={history} >
      
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
            <Route path="/fetch" component={FetchingH} />
            <Route path="/backup" component={Backup} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/barcode" component={BarcodeContainer} />
            <Route path="/barcode/:id/:st" component={BarcodePrinter} />
            <Route path="/bills" component={Bills} />
            <Route path="/loading" component={Loading} />
            <Route path="/viewchallan" component={ViewChallan} />
            <Route path="/viewbills" component={ViewBills} />
            <Route path="/printbill/:id" component={PrintBills} />
            <Route path="/editbill/:id" component={EditBillContainer} />
            <Route path="/editchallan/:id" component={EditChallanContainer} />
            <Route path="/printchallan/:id" component={PrintChallans} />
            <Route path="/offloading" component={OffLoad} />
            <Route path="/tracking" component={Tracking} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/reports" component={Reports}/>
            <Route path="/viewchallanoff" component={ViewChallanOff} />
            <Route path="/trucks" component={TrucksContainer} />
            <Route path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </div>
       
      </Router>
    );
  }
}

export default App;
