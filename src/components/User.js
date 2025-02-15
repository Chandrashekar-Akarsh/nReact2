import { useState } from "react";

const User = (props) => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(1);

  return (
    <div className="user-card">
      <h1>Counter1 - {counter1}</h1>
      <h1>Counter2 - {counter2}</h1>
      <h2>{props.name}</h2>
      <h3>Location:Texas</h3>
      <h4>Contact: @akarshchandra01</h4>
    </div>
  );
};

export default User;
