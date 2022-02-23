import React from 'react';

import InputButton from "./InputButton";

const Summary = ({onClickConfirmation, sumRef, dishList, user}) => {
    return (
        <div className="summary-container" ref={sumRef}>
            <div className="summary-content">
                <div className="summary-items">
                    <p>Merci pour votre commande !</p>
                    <p>Nom Prénom voici le résumé de votre commande :</p>
                    <div className="summary-list">
                        {/* foreach de l'objet */}
                        <div className="list---box">
                            <p>Nom du plat</p>
                            <p>Quantité</p>  
                            <p>Prix</p>  
                        </div>
                    </div>

                    <div className="summary-total">
                        <p>Total : 0 €</p>
                    </div>
                </div>
                
                <InputButton type="button" onClick={onClickConfirmation}/>
            </div>

            <div className="confirmation__background">
            </div>
        </div>
    );
}

export default Summary;