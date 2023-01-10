import React from 'react'
import { Link } from 'react-router-dom'

// // Import Storage object
// import { Storage } from './../storage/storage'

// Import Box component
import { Box } from './box'

// Import utility functions
import * as utils from '../utils/functions'

// Create Board component
export class Board extends React.Component {
    constructor(props) {
        super(props)
        let isGame = window.location.href.indexOf("/game/") > -1 ? true : false;

        let gameId = null;

        if (isGame) {
            gameId = window.location.href.split('/');
            gameId = gameId[gameId.length - 1]
        }

        // Initialize component state
        this.state = {
            isGame: isGame,
            gameId: gameId,
            boxes: Array(9).fill(null),
            myTurn: true,
            mySymbol: 'X', //either X or O, default X
            gameAlive: false,
        }
    }

    // Create instance of Storage object
    // storage = new Storage()

    // Handle click on boxes on the board.
    handleBoxClick(index) {
        if (!this.state.gameAlive || !this.state.myTurn)
            return;

        // get current state of boxes
        const boxes = this.state.boxes.slice()


        // Stop the game if board contains winning combination
        if (utils.findWinner(boxes) || boxes[index]) {
            return
        }

        // Stop the game if all boxes are clicked (filled)
        if (utils.areAllBoxesClicked(boxes) === true) {
            return
        }

        // Mark the box either as 'x' or 'o'
        boxes[index] = this.state.mySymbol;

        // Update component state with new data
        this.setState({
            boxes: boxes,
            myTurn: !this.state.myTurn
        })
    }

    // Handle board restart - set component state to initial state
    handleBoardRestart = async () => {
        if (!this.state.isGame) {
            let gameId = (new Date()).getMilliseconds();
            gameId = btoa(gameId);
            gameId = btoa(gameId);
            console.log(gameId);
            await utils.newGame(gameId)
            // if ()
            // window.location.replace(window.location.protocol + "//" + window.location.host + "/game/" + gameId);
        }


        this.setState({
            boxes: Array(9).fill(null),
            myTurn: true
        })
    }

    render() {
        // Get winner (if there is any)
        const winner = utils.findWinner(this.state.boxes)

        // Are all boxes checked?
        const isFilled = utils.areAllBoxesClicked(this.state.boxes)

        // Status message
        let status

        if (winner) {
            // If winner exists, create status message
            status = `The winner is: ${winner}!`

            // Push data about the game to storage
            // this.storage.update([`${winner} won`])
        } else if (!winner && isFilled) {
            // If game is drawn, create status message
            status = 'Game drawn!'

            // Push data about the game to storage
            // this.storage.update(['Game drawn'])
        } else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            status = `It is ${(this.state.myTurn ? "your" : "opponent's")} turn.`
        }

        return (
            <>
                {/* The game board */}
                <div className="board-wrapper">
                    {this.state.isGame && <div className="board">
                        {!this.state.gameAlive && <h1 className="board-heading">{"Waithing For Opponent"}</h1>}
                        <h2 className="board-heading">{"You are " + this.state.mySymbol}</h2>
                        <h2 className="board-heading">{status}</h2>

                        <div className="board-row">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />

                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />

                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />

                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />

                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />

                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />

                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
                        </div>
                    </div>}
                    {/* Button to start new game */}
                    {((winner) || (!winner && isFilled) || (!this.state.isGame)) && <div className="board-footer">
                        <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
                    </div>}
                </div>
            </>
        )
    }
}