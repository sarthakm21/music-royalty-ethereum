import React from "react";
import { ethers } from "ethers";
import abi from "./utils/contract.json";

const Claimroyalties = () => {
  const claimRoyalties = async () => {
    const CONTRACT_ADDRESS = "0xC3194cc16fE72b79B6a871036911F66265816f1b";

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
  return (
    <div className="body">
      <div className="claim__container">
        <button className="input button" onClick={handleSubmit}>
          Claim
        </button>
      </div>
    </div>
  );
};

export default Claimroyalties;
