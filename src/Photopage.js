import React from "react";
import {
  useParams
} from "react-router-dom";
// import '/App.css'

const Photopage = () => {
    let { albumId, id} = useParams();
    return (
        <div>
            <h1>InCampus</h1>
            <p>Image id : { id }</p>
            <p>album id : {albumId}</p>
        </div>
    )
}

export default Photopage
