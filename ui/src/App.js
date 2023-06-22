import './App.css';
import { useState } from 'react';
import { Link, Outlet} from 'react-router-dom';
import Alert from './components/Alert';


function App() {
  const [jwtToken, setJwtToken] = useState("abc");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Welcome to ATI Intranet Portal</h1>
        </div>
        <div className="col text-end">
          {jwtToken === ""
            ? <Link to="/login"><span className="badge bg-success">Login </span></Link>
            : <a href="#!" ><span className="badge bg-danger">Logout</span></a>
          }
        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/FileUploadPage" className="list-group-item list-group-item-action">My Documents</Link>             
            </div>
          </nav>
        </div> 
        <div className="col-md-10">
        <Alert
            message={alertMessage} className={alertClassName} />
          <Outlet context={{
            jwtToken, 
            setAlertClassName,
            setAlertMessage,            
            setJwtToken          
          }}/>
        </div>     
      </div>
     
    </div>
  );
}

export default App;
