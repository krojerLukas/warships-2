export default function Tile ({coordinate, handleClickedTile, activePlayer}) {

    // if (activePlayer === "")


    // ---> Click event when tile is clicked
    const handleClick = (e) => {
        // -> Gives handleTile the e.target
        // -> console.log(e.target) -> <div class="tile" id="A1"></div> (clicked html element)
        handleClickedTile(e.target)
    }

    return (
        <div className="tile"
             id={coordinate}
             key={coordinate}
             // Gives Tile onClick Event and the executed function when clicked
             onClick={handleClick}
        >
        </div>
    )

}