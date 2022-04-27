import React, { useState } from "react";
import "./styles/registermusic.css";
import { ethers } from "ethers";
import abi from "./utils/contract.json";

const Registermusic = () => {
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistAddresses, setArtistAddresses] = useState("");
  const [artistCuts, setArtistCuts] = useState("");
  const [musicURL, setMusicURL] = useState("");

  const registerMusic = async ({
    musicName,
    artistName,
    artistAddresses,
    artistCuts,
    musicURL,
  }) => {
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
        let nftTxn = await connectedContract.registerNewMusic(
          musicName,
          artistName,
          artistAddresses,
          artistCuts,
          musicURL
        );
        await nftTxn.wait();
        alert("registered the music");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let artistAddressesArray = artistAddresses.split(" ");
    let artistCutsArray = artistCuts.split(" ");

    let final = {
      musicName,
      artistName,
      artistAddresses: artistAddressesArray,
      artistCuts: artistCutsArray,
      musicURL,
    };

    await registerMusic(final);
  };

  return (
    <div className="body">
      <div className="iphone">
        <form className="form">
          <div>
            <input
              className="input"
              placeholder="Song title"
              type="text"
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Artist name"
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Artist Addresses (space seperated)"
              type="text"
              value={artistAddresses}
              onChange={(e) => setArtistAddresses(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Artist Cuts (space seperated)"
              type="text"
              value={artistCuts}
              onChange={(e) => setArtistCuts(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Music URL"
              type="text"
              value={musicURL}
              onChange={(e) => setMusicURL(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              className="input button"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registermusic;
