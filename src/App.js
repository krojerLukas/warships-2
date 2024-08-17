import './style.css'

import Boardside from "./components/Boardside"
import {useEffect, useState} from "react";
import {click} from "@testing-library/user-event/dist/click";


const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const side1nums = ['1', '2', '3', '4', '5'];
const side2nums = ['6', '7', '8', '9', '10'];

export default function App() {
    const [activePlayer, setActivePlayer] = useState("player1")
    const [gameState, setGameState] = useState("prepare")


    // ########## COORDINATES ##########
    // ## Generates Coordinates for the Board (for each player side)
    const [player1Coordinates, setPlayer1Coordinates] = useState([])
    const [player2Coordinates, setPlayer2Coordinates] = useState([])

    useEffect(() => {
        setPlayer1Coordinates(generateP1Coordinates());
        setPlayer2Coordinates(generateP2Coordinates())
    }, []);

    // ---> Generates the coordinates for player 1
    const generateP1Coordinates = () => {
        let p1TempCoordinatesArray = [];
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 5; col++) {
                p1TempCoordinatesArray.push(letters[row] + side1nums[col]);
            }
        }
        return p1TempCoordinatesArray
    }

    // ---> Generates the coordinates for player 2
    const generateP2Coordinates = () => {
        let p2TempCoordinatesArray = [];
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 5; col++) {
                p2TempCoordinatesArray.push(letters[row] + side2nums[col]);
            }
        }
        return p2TempCoordinatesArray
    }


    const canPlaceX = (clickedTile) => {
        // checks if clicked Tile is part of Player 1 Boardside or of Player 2 Boardside
        // is true -> Tile belongs to Boardside of player1, if false -> Boardside of player2
        const isPlayer1Tile = player1Coordinates.includes(clickedTile.id)

        if (gameState === "prepare") {
            return (isPlayer1Tile && activePlayer === "player1") || (!(isPlayer1Tile) && activePlayer === "player2")
        }

        if (gameState === "inGame") {
            return (!(isPlayer1Tile) && activePlayer === "player1") || (isPlayer1Tile && activePlayer === "player2")
        }

        return false;
    }


    // ---> Gets the clicked Tile as a HTML element
    const handleClickedTile = (clickedTile) => {
        if (canPlaceX(clickedTile)) {
            clickedTile.innerHTML = "X";
        }
    }


    // ---> makes sure that the Coordinates Array is not initialized when empty (react lifecycle)
    //      Using conditional returns is a good way to ensure that your component only renders when
    //      the necessary data is available, preventing empty or invalid states from causing issues.
    if (player1Coordinates.length === 0 || player2Coordinates.length === 0) {
        return null;
    }


    return (

        <div>
            <div className="ui">
                <p>{gameState}</p>
                <p>{activePlayer}</p>
            </div>
            <div className="boardsides">
                <Boardside coordinates={player1Coordinates}
                           handleClickedTile={handleClickedTile}
                           activePlayer={activePlayer}
                           key={1}
                ></Boardside>
                <Boardside coordinates={player2Coordinates}
                           handleClickedTile={handleClickedTile}
                           activePlayer={activePlayer}
                           key={2}
                ></Boardside>
            </div>
        </div>
    )

}
