import React, {useEffect, useState} from 'react';
import moment from "moment";
import "moment/locale/fr";
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

import Table from '../order/Table';
import { toast } from 'react-toastify';

const DayDetails = ({date, dishByDateList}) => {

    const [isAvailable, setIsAvailable] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        async function getNb() {
            setIsAvailable(false);
            
            dishByDateList.forEach(d => {
                if (d.numberRemaining > 0) setIsAvailable(true);
            });
            
            if(new Date(date) < new Date(new Date().toDateString())) setIsAvailable(false);
        }
        
        async function getUser() {
            const userDecoded = decodeToken(localStorage.getItem("userToken"));
            if (userDecoded) {
                setIsLogged(true);
            }
        }
        
        getUser();
        getNb();
    
    }, [date, dishByDateList]);


    return ( 
        <div className="day-details">
            <h1 className="day-details__title">{moment(date).locale('fr').format('LL')}</h1>
            <Table dishByDateList={dishByDateList}/>
            
            { isAvailable ?

            <>
                <div className="right__tip">
                    <p>Passez la souris sur le nom du plat pour avoir sa description.</p>
                </div>

                <div className="day-details__button">
                    <div className="btn">
                        { isLogged ? 
                            <Link to={`passer-commande/${date}`} onClick={() => localStorage.removeItem('date')}>
                                Commander
                            </Link> 
                            :
                            <Link to={"connexion"} onClick={() => toast.error("Veuillez vous connecter avant de passer commande !")}>
                                Commander
                            </Link> 
                        }                    
                    </div>
                </div>
            </>

            :
            
            <>
                <div className="day-details__button" style={{color:'white'}}>
                    Vous ne pouvez pas passer commande à cette date.
                </div>
            </>
            }
            
        </div>
     );
}

export default DayDetails;