import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter1: 3,
    };
  }

  render() {
    return (
      <div className="user-card">
        <h1>Counter1-{this.state.counter1}</h1>
        <h2>{this.props.name}</h2>
        <h3>Location:{this.props.location}</h3>
        <h4>Contact: @akarshchandra01</h4>
      </div>
    );
  }
}

export default UserClass;
