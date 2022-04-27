import React, { useState } from "react";
import "./styles/buymusic.css";

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

  const handleChange = (e) => {
    setBuySong(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(buySong);
  };

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
