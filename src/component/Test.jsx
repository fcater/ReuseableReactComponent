import React, { Component } from "react";

class Test extends Component {
  state = {};
  render() {
    const { title, bg } = this.props;
    return (
      <div
        style={{
          backgroundColor: `${bg}`,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </div>
    );
  }
}

export default Test;
