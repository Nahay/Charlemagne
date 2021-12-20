import React, {useEffect, useState} from 'react';
import moment from "moment";
import "moment/locale/fr";

import Table from '../order/Table';
import { Link } from 'react-router-dom';


const DayDetails = ({date, dishByDateList}) => {

    const [isAvailable, setIsAvailable] = useState(false);


    useEffect(() => {

        async function getNb() {
            setIsAvailable(false);
            dishByDateList.forEach(d => {
                if (d.numberRemaining > 0) setIsAvailable(true);
            });
        }

        getNb();
    
    }, [dishByDateList]);


    return ( 
        <div className="day-details">
            <h1 className="day-details__title">{moment(date).locale('fr').format('LL')}</h1>
            <Table dishByDateList={dishByDateList}/>
            
            { isAvailable &&
            
            <div className="day-details__button">
                <div className="btn">
                    <Link to={`passer-commande/${date}`}>
                        Commander
                    </Link>
                </div>
            </div>

            }
            
        </div>
     );
}

export default DayDetails;