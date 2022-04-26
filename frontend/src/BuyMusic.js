import React, { useState } from "react";

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
