import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from "./component/Firebase";
import { getDatabase, ref, set  } from "firebase/database";
import NavBar from "./component/NavBar";
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom'



function App() {
 const firebaseConfig = {
  apiKey: "AIzaSyAmVIkak1UMqSvZZCmoOGbBjg881kvbf94",
  authDomain: "authenticationwithreact-e8001.firebaseapp.com",
  databaseURL: "https://authenticationwithreact-e8001-default-rtdb.firebaseio.com",
  projectId: "authenticationwithreact-e8001",
  storageBucket: "authenticationwithreact-e8001.appspot.com",
  messagingSenderId: "132631946667",
  appId: "1:132631946667:web:f045d6dc4d4715cee01eee",
  measurementId: "G-8F1FHE7HYG"
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  function signin(){
    
      var email = document.getElementById("email").value;;
  
      
      var password=document.getElementById("inputPassword").value;
    
      console.log(email)
      console.log(password)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user+" signin successfull")
        let userId=user.uid;
        function writeUserData(userId,email,password) {
          const db = getDatabase();
          set(ref(db, 'users/' + userId), {
            email: email,
            password: password,
            
          });
        }
        writeUserData(userId,email,password)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+" :"+errorMessage )
      });
  
    
    
    
  };
  return (
    <div className="App my-4">
    
    <NavBar/>
    
    <div className="container my-3">
        <div className="card"  >
  <div className="card-body" >
  <h3 className="heading my-3">Email and password based authenticcation</h3>
  
  <input id="email" placeholder="Enter your Email" type="text" className="form-control my-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  ></input>
   <input type="password"  placeholder="Enter your password" className="form-control my-3" id="inputPassword" ></input>
  
  
  <div className="text-center">
  <button type="button" className="btn btn-primary my-3" onClick={signin}>Submit</button>
  </div>
  
   
   </div>
  
    
          
        </div>
      </div>

    
         
    </div>
    
  );
}

export default App;
