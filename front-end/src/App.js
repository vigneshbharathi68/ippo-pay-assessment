import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/table/table"

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [listObj, setListObj] = useState([]);

  const minimumStepsToMakeStrongPassword = (password) => {
    let steps = 0;
    if (password.length === 0) {
      setStrength("")
      setError("Please enter a password to validate strength");
      return;
    } else {
      setError("");
    }

    // Check password length
    if (password.length < 6) {
      steps += 6 - password.length;
      setStrength(steps);
      return;
    } else if (password.length > 20) {
      steps += password.length - 20;
      setStrength(steps);
      return;
    }

    // Check lowercase, uppercase, and digit presence
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasLowercase) {
      steps++;
    }
    if (!hasUppercase) {
      steps++;
    }
    if (!hasDigit) {
      steps++;
    }

    // Check for three repeating characters in a row
    for (let i = 0; i < password.length - 2; i++) {
      if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
        steps++;
        break;
      }
    }

    setStrength(steps);
  };
const listObjects = async () => {
   
   let reqOptions = {
     url: "https://nodejs-rest-api-byno.onrender.com/list-all",
     method: "GET",
     headers: { "Accept": "*/*" }
   }
   
   let response = await axios.request(reqOptions);
   setListObj(response.data.map(data => {
    const {password, strength} = data
    return {password, strength}
   }));
}
useEffect(() => {
  listObjects()
}, [])

  const savePassword = async () => {
    if (error.length) return;
    var options = {
      method: "POST",
      url: "https://nodejs-rest-api-byno.onrender.com/register",
      params: { password, strength },
      headers: { Accept: "*/*" },
    };

    axios
      .request(options)
      .then(function (response) {
        setResponse(response.data);
        listObjects()
      })
      .catch(function (error) {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="password-input">
          <h1>Password Strength validation</h1>
          <div className="app-body">
            <div className="input-wrapper">
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  minimumStepsToMakeStrongPassword(e.target.value)
                }}
                className={error.length > 0 ? "error" : ""}
              />
              <p className="input-error">{error}</p>
            </div>

            {/* <button onClick={() => }>
              Check Strength
            </button> */}
            <button onClick={savePassword} className="save-btn">
              Save to mongodb
            </button>
            <p>Strength: {strength}</p>
          </div>
        </div>
        <div className="password-list">
          
          <h1>List of passwords</h1>
          <Table data={listObj}/>
        </div>
      </div>
    </div>
  );
}

export default App;
