import React from "react";
import "./App.css";
import MemoryCard from "./components/MemoryCard";

const generateDeck = () => {
  let symbols = ["∆", "ß", "£", "§", `•`, `$`, `+`, `ø`];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[i % 8],
    });
  }
  shuffle(deck);
  return deck;
};

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

class MemoryGame extends React.Component {
  constructor() {
    super();
    this.state = { 
    deck: generateDeck(),
    pickedCards: []
  };
  }
  



  pickCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped) {
      return;
    }
    let cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(() => {
          this.unflipCards(card1Index, card2Index);
        }, 1000);
      }
      newPickedCards = [];
    }
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards,
    });
  };

  unflipCards = (card1Index, card2Index) => {
    const card1 = { ...this.state.deck[card1Index] };
    const card2 = { ...this.state.deck[card2Index] };
    card1.isFlipped = false;
    card2.isFlipped = false;
    let newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1;
      }
      if (card2Index === index) {
        return card2;
      }
      return card;
    });
    this.setState({
      deck: newDeck,
    });
  };

  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return (
        <MemoryCard
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          key={index}
          pickCard={this.pickCard.bind(this, index)}
        />
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          Memory Game
          <h3>Cards To Win</h3>
        </header>
        <div className="row">{cardsJSX.slice(0, 4)}</div>
        <div className="row">{cardsJSX.slice(4, 8)}</div>
        <div className="row">{cardsJSX.slice(8, 12)}</div>
        <div className="row">{cardsJSX.slice(12, 16)}</div>
      </div>
    );
  }
}

export default MemoryGame;
