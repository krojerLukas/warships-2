import Tile from "../components/Tile"


export default function Boardside({coordinates, handleClickedTile, activePlayer}) {

    return (
        <div className="tiles">
            {
                coordinates.map((coordinate) => {
                    return <Tile coordinate={coordinate}
                                 handleClickedTile={handleClickedTile}
                                 activePlayer={activePlayer}
                                 key={coordinate}
                    />
                })
            }
        </div>
    )

}