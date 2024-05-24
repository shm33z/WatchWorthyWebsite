import React, { useState } from "react";
import "./style.css";
import NewUser from "./NewUser";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Homepage from "./Homepage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  return <div>{currentUser ? <Homepage />: <NewUser />}</div>;
}

export default App;
