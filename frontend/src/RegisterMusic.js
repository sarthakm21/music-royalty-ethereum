import React, { useState } from "react";
import "./styles/registermusic.css";

const Registermusic = () => {
  const [musicName, setMusicName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistAddresses, setArtistAddresses] = useState("");
  const [artistCuts, setArtistCuts] = useState("");
  const [musicURL, setMusicURL] = useState("");

  const handleSubmit = (e) => {
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

    console.log(final);
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
