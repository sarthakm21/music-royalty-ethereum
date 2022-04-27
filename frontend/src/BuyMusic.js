import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/contract.json";

const Buymusic = () => {
  let music = [
    {
      index: 10,
      musicName: "Sham",
      artistName: "Amit Trivedi",
    },
    {
      index: 20,
      musicName: "Killshot",
      artistName: "Eminem",
    },
  ];

  const [buySong, setBuySong] = useState(music[0].index);

  let dropdowns = music.map((song, key) => (
    <option key={key} value={song.index}>
      {song.musicName} by {song.artistName}
    </option>
  ));

  const buyMusic = async (index) => {
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
        let nftTxn = await connectedContract.buyLicense(index);
        await nftTxn.wait();
        alert("Bought the music");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  const handleChange = (e) => {
    const index = Number(e.target.value);
    setBuySong(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await buyMusic(buySong);
  };

  return (
    <form>
      <div>
        <label>Select the song to buy: </label>
        <select onChange={handleChange}>{dropdowns}</select>
        <input type="submit" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default Buymusic;
