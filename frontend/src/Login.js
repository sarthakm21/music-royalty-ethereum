import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicLogo from "./assets/music.svg";

const Login = () => {
  const history = useNavigate();
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      localStorage.setItem("account", account);
      history("/home");
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      localStorage.setItem("account", accounts[0]);
      history("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const elemStyle = {
    position: "absolute",
    left: "50%",
    top: "20%",
    width: "200px",
    transform: "translateX(-45%)",
  };
  return (
    <div className="body">
      <img src={MusicLogo} style={elemStyle} alt="music" />
      <div className="claim__container">
        <button className="input button" onClick={connectWallet}>
          Login with MetaMask
        </button>
      </div>
    </div>
  );
};

export default Login;
