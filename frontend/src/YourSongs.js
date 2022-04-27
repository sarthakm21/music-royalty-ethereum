import React from "react";

const Yoursongs = () => {
  let localSongs = JSON.parse(localStorage.getItem("yourSongs"));
  const songs = localSongs.map((song, key) => (
    <div className="playCard">
      <p style={{ fontSize: "20px" }} key={key}>
        {song}
      </p>
      <button className="button">▶ Play</button>
    </div>
  ));

  return (
    <div className="body">
      <div className="iphone">
        <div className="form">
          <h2 style={{ margin: "0" }}>Your Songs</h2>
          <div>{songs}</div>
        </div>
      </div>
    </div>
  );
};

export default Yoursongs;
