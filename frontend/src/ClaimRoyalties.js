import React from "react";

const Claimroyalties = () => {
  const handleSubmit = (e) => {
    console.log("Take this mony");
  };
  return (
    <div>
      <button onClick={handleSubmit}>Claim</button>
    </div>
  );
};

export default Claimroyalties;
