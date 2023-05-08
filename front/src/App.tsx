import React from "react";
import { Container } from "@mui/material";
import FormToggle from "./components/FormToggle";
import { useAppSelector } from "./hooks/state";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
  const {user} = useAppSelector(state => state)
  return (
    <div className="App">
      <Header />
      <Container>
        {
          user.isAuth ? <Profile /> : <FormToggle />  
        }
      </Container>
    </div>
  );
}

export default App;
