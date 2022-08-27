import React from "react";
import "../components/MemoryCard.css";

class MemoryCard extends React.Component {

  constructor() {
    super();
    this.state = { isFlipped: false };
  }

  clickHandler = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  };


  render() {
    const memoryCardInnerClass = this.props.isFlipped ? "MemoryCardInner flipped" : "MemoryCardInner";


    return (
      <div className="MemoryCard" onClick={this.props.pickCard}>
        <div className={memoryCardInnerClass}>
          <div className="MemoryCardBack">
            <img
              src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"
              alt=""
            />
          </div>
          <div className="MemoryCardFront">{this.props.symbol}</div>
        </div>
      </div>
    );
  }
}

export default MemoryCard;
