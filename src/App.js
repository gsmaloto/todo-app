import Todolist from "./components/Todolist";
import Form from "./components/Form";
import "./App.css";
import styled from "styled-components";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState } from "react";
import { auth } from "./firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import Avatar from "@mui/material/Avatar";

function App() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const [user, setUser] = useState(userLogged ? userLogged : "");

  const fbLogin = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        localStorage.setItem("userLogged", JSON.stringify(result.user));
        // console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const logout = () => {
    let text = "Are you sure you want to logout?";
    if (window.confirm(text) == true) {
      localStorage.clear();
      setUser("");
    }
  };

  return (
    <div className="app">
      {!user ? (
        <LoginButton>
          <div className="container">
            <h3>Todo App Login</h3>
            <FacebookLoginButton onClick={fbLogin} />
          </div>
        </LoginButton>
      ) : (
        <>
          <Header>
            <div className="container">
              <h2>Todo List</h2>
              <div className="menu">
                <div className="profile">
                  <Avatar src={user.photoURL} />
                  <p>{user?.displayName}</p>
                </div>

                <p onClick={logout} className="logout">
                  logout
                </p>
              </div>
            </div>
          </Header>
          <Form user={user} />
          <Todolist user={user} />
        </>
      )}
    </div>
  );
}

export default App;

const Header = styled.div`
  background-color: #c21010;

  .container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    color: white;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  .logout {
    cursor: pointer;
  }
  .menu {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;
const LoginButton = styled.div`
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #00000005;

  .container {
    border: 2px solid #00000020;
    padding: 4rem 2rem;
    border-radius: 1rem;
    background-color: white;
  }

  h3 {
    text-align: center;
    color: #00000090;
  }
`;
