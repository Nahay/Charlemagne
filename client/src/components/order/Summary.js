import React, { useEffect } from 'react';

import InputButton from "../generic/InputButton";

const Summary = ({onClickConfirmation, sumRef, dishList, name, firstname, total}) => {

    useEffect(() => {
        
    }, [dishList]);

    return (
        <div className="summary-container" ref={sumRef}>
            <div className="summary-content">
                <div className="summary-items">
                    <p className="summary-title">Merci pour votre commande !</p>
                    <p className="summary-name">{name} {firstname} voici le résumé de votre commande :</p>
                    <div className="summary-list">
                        {dishList.map(d => {
                            return (
                                <div className="list---box" key={d._id}>
                                    <p className="box---name">{d.name}</p>
                                    <p className="box---quantity">x {d.nbC}</p>  
                                    <p className="box---price">{d.price} €</p>  
                                </div>
                            );
                        })}                        
                    </div>

                    <div className="summary-total">
                        <p>Total : {total} €</p>
                    </div>

                    <InputButton type="button" value={"Ok"} onClick={onClickConfirmation}/>
                </div>
            </div>

            <div className="summary-background">
            </div>
        </div>
    );
}

export default Summary;