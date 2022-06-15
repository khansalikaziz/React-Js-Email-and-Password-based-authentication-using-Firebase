import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from "./Firebase";
import { getDatabase, ref, set  } from "firebase/database";
import NavBar from "./NavBar";



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
    <>
    <NavBar/>
    <div className="container my">
      
      <h3 className="heading my-5">Email and password based authenticcation</h3>
    <input id="email" placeholder="Enter your Email" type="text" className="form-control my-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" style={{width:'400px'}}></input>
     <input type="password" placeholder="Enter your password" className="form-control my-3" id="inputPassword" style={{width:'400px'}}></input>
     <button type="button" className="btn btn-primary my-3" onClick={signin}>Submit</button>

    </div>
         
    </>
    
  );
}

export default App;
