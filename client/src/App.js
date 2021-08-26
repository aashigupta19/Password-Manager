import {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";

function App() {

  const [pwd, setPwd] = useState('');
  const [account, setAccount] = useState('');

  const [pwdList, setPwdList] = useState([]);

  function onSubmit(){
    // make post request
    axios.post('http://localhost:5000/db', {
      pwd: pwd,
      account: account,
    }).then((response)=>{
      console.log(response);

    });
    
  }
  

    function requestDecrypt(encryption){
      axios.post('http://localhost:5000/dec', {
        pwd: encryption.pwd,
        iv: encryption.iv
      }).then((response)=>{
        console.log(response.data);
        setPwdList(pwdList.map((val)=>{
          return encryption.id === val.id? {
            id: val.id,
            iv: val.iv,
            account: response.data,
            pwd: val.pwd,
          } : val;
        }))
      })

    }
  useEffect(()=>{
    axios.get('http://localhost:5000/db').then((response)=>{
      console.log(response);
      setPwdList(response.data);

    })

  }, []);

  return (
    <div>
      <div className="AddingPassword">
      <h1>Enter your password</h1>
      <input type="text" placeholder="eg: Facebook123"
      name={pwd}
      onChange={(event) =>{ setPwd(event.target.value)}}
      ></input>
      <br/>
      <input type="text" placeholder="eg: Facebook"
      name={account}
       onChange={(event) =>{ setAccount(event.target.value)}}></input>
      <br/>
      <button onClick={onSubmit}>Add Password</button>
    </div>
      <br/>
      <br/>

      <div className="Passwords">
        {pwdList.map((value)=>{
          return <div key={value.id} className="password" onClick={()=>{
            requestDecrypt({pwd: value.pwd, iv: value.iv, id: value.id});
          }}>
            <h3>{value.account}</h3>
          </div>
        })}

      </div>
    
    </div>
    
  );
}

export default App;
