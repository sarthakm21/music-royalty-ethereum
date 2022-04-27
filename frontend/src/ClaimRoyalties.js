import React from "react";
import { ethers } from "ethers";
import abi from "./utils/contract.json";
import MusicLogo from "./assets/music.svg";

const Claimroyalties = () => {
  const claimRoyalties = async () => {
    const CONTRACT_ADDRESS = "0x4d5a4346A9EC3A95e67CA3504539651745e2c8aA";

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi.abi,
          signer
        );
        console.log("run");
        let nftTxn = await connectedContract.claimRoyalties();
        await nftTxn.wait();
        alert("claimed the royality");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert("No amount to claim");
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    await claimRoyalties();
  };

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
        <button className="input button" onClick={handleSubmit}>
          Claim Royalties
        </button>
      </div>
    </div>
  );
};

export default Claimroyalties;
