import User from "./user";
import UserClass from "./UserClass";
import React from "react";

// const About = () => {
//   return (
//     <div>
//       <h1>This is a React Playgorund App</h1>
//       <h2>Created by Akarsh Chandrashekar to drill deep into react comcepts</h2>
//       <UserClass name="Akarsh Class Based Comp" />
//     </div>
//   );

// };

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>This is a React Playgorund App</h1>
        <h2>
          Created by Akarsh Chandrashekar to drill deep into react comcepts
        </h2>
        <UserClass name="Akarsh Class Based Comp" location="Texas" />
      </div>
    );
  }
}

export default About;
