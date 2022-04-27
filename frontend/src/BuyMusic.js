import React, { useEffect, useState } from "react";
import "./styles/buymusic.css";
import { ethers } from "ethers";
import abi from "./utils/contract.json";

const Buymusic = () => {
  const [music, setMusic] = useState([]);
  const [buySong, setBuySong] = useState(0);

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

  useEffect(async () => {
    const CONTRACT_ADDRESS = "0xC3194cc16fE72b79B6a871036911F66265816f1b";

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
      let count = await connectedContract.count();
      count = count.toString();
      let musicArray = [],
        i;
      for (i = 0; i < count; i++) {
        let music = await connectedContract.musicDirectory(i);
        musicArray.push({
          index: i,
          musicName: music._musicName,
          artistName: music._artistName,
        });
      }
      setMusic(musicArray);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }, []);

  return (
    <div className="body">
      <div className="iphone">
        <form className="form">
          <div className="x">
            <h3>Select the song to buy</h3>
            <select className="input" onChange={handleChange}>
              {dropdowns}
            </select>
          </div>
          <div>
            <input
              className="input button"
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Buymusic;
