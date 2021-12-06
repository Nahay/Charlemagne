import React, {useEffect, useState} from 'react';
import moment from "moment";
import "moment/locale/fr";

import Button from '../generic/Button';
import Table from '../order/Table';


const DayDetails = ({date, dishByDateList}) => {

    const [isAvailable, setIsAvailable] = useState(false);


    useEffect(() => {
        getNb();
    }, [dishByDateList]);

    const getNb = () => {
        setIsAvailable(false);
        dishByDateList.forEach(d => {
            if (d.numberRemaining > 0) setIsAvailable(true);
        });
    }

    return ( 
        <div className="day-details">
            <h1 className="day-details__title">{moment(date).locale('fr').format('LL')}</h1>
            <Table dishByDateList={dishByDateList}/>
            
            { isAvailable &&
            
            <div className="day-details__button">
                <Button name="Commander"/>
            </div>

            }
            
        </div>
     );
}

export default DayDetails;