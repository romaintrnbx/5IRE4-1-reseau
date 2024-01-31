import React from "react";

/* -- core components -- */
import '../assets/css/main.css'

function ButtonUser({handleClick}) {
    return (
        <>
            Si tu souhaites afficher ton secret, clique sur le bouton ci-dessous ↴ ↯
            <button onClick={handleClick}>Ce bouton !</button>
        </>
    );
}

export default ButtonUser;