import React, { useState } from "react";

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
    <form>
      <div>
        <label>Song title: </label>
        <input
          type="text"
          value={musicName}
          onChange={(e) => setMusicName(e.target.value)}
        />
      </div>
      <div>
        <label>Artist Name: </label>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </div>
      <div>
        <label>Artist Addresses (space seperated): </label>
        <input
          type="text"
          value={artistAddresses}
          onChange={(e) => setArtistAddresses(e.target.value)}
        />
      </div>
      <div>
        <label>Artist Cuts (space seperated): </label>
        <input
          type="text"
          value={artistCuts}
          onChange={(e) => setArtistCuts(e.target.value)}
        />
      </div>
      <div>
        <label>Music URL: </label>
        <input
          type="text"
          value={musicURL}
          onChange={(e) => setMusicURL(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default Registermusic;
