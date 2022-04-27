import React, { useEffect, useState } from "react";
import "./styles/buymusic.css";
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

  const [songName, setSongName] = useState(
    `${music[0].musicName} by ${music[0].artistName}`
  );
  const [music, setMusic] = useState([]);
  const [buySong, setBuySong] = useState(0);

  let dropdowns = music.map((song, key) => (
    <option key={key} value={song.index}>
      {song.musicName} by {song.artistName}
    </option>
  ));

  const buyMusic = async (index) => {
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
        const options = { value: ethers.utils.parseEther("0.1") };
        let nftTxn = await connectedContract.buyLicense(index, options);
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
    const { options, selectedIndex } = e.target;
    const text = options[selectedIndex].text;
    setSongName(text);
    const index = Number(e.target.value);
    setBuySong(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let localSongs = JSON.parse(localStorage.getItem("yourSongs"));
    if (localSongs) {
      localSongs.push(songName);
    } else {
      localSongs = [songName];
    }

    localStorage.setItem("yourSongs", JSON.stringify(localSongs));
    await buyMusic(buySong);
  };

  useEffect(async () => {
    const CONTRACT_ADDRESS = "0x4d5a4346A9EC3A95e67CA3504539651745e2c8aA";

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
