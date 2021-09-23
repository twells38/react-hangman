import React, { Component } from "react";
import { RandomWords } from "./RandomWord";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  //by default, allow 6 guesses and use provided gallows images
  static defaultProps = {
    maxWrong: 6, // number that you can guess
    images: [img0, img1, img2, img3, img4, img5, img6]
  };
  constructor(props) {
    super(props);
    this.state = { numWrong: 0, guessed: new Set(), answer: RandomWords() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      numWrong: 0,
      guessed: new Set(),
      answer: RandomWords()
    });
  }

  handleGuess(evt) {
    /* handleGuess: handle a guessed letter
     - add to guessed letter
     -if not in answer, increase number-wrong guess */
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      numWrong: st.numWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
  guessedWord() {
    //guessedWord: show current-state of word
    //if guessed letters are{ a,p,e}, show'app_e'
    // take awswer and then split it into new array and map it
    //['a','p','p','l','e']
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  generateButtons() {
    //generateButtons: return array of letter buttons to render
    // use string with all letters and split to new array then map over for each letter make new button
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  //render:render game
  render() {
    const gameOver = this.state.numWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.numWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "YOU WIN 👍";
    if (gameOver) gameState = `YOU LOSE! 👎, It is ${this.state.answer}`;
    return (
      <section id="Hangman">
        <div className="Hangman">
          <h1>Hangman</h1>
          <img src={this.props.images[this.state.numWrong]} alt={altText} />
          <p>Guessed Wrong: {this.state.numWrong}</p>
          <p className="Hangman-word">{this.guessedWord()}</p>
          <p className="Hangman-btns">{gameState}</p>
          <button id="reset" onClick={this.reset}>
            Restart
          </button>
        </div>
      </section>
    );
  }
}

export default Hangman;
