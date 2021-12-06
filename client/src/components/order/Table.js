import React, {useState, useEffect} from "react";
import DataTable, { createTheme } from 'react-data-table-component';

import { getDishById } from '../../services/dishesService';


const Table = ({dishByDateList}) => {

    const [dishesList, setDishesList] = useState([]);


    useEffect(() => {
        getSetDishes();
    }, [dishByDateList]);

    const getTypeName = (type) => {
        switch (type) {
            case "e":
                return "Entrée";
            case "p":
                return "Plat";
            case "d":
                return "Dessert";
            default:
                return
        }
    }


    const getSetDishes = async () => {
        
        setDishesList([]);
        if (dishByDateList !== []) {

            dishByDateList.forEach(async d => {
                const dish = await getDishById(d.idDish);

                setDishesList(dishesList =>
                    [...dishesList,
                        {type: getTypeName(dish.type), name: dish.name, nb: d.numberRemaining}
                    ]
                );
            });
        }
    }

    const columns = [
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Nombre Restant',
            selector: row => row.nb,
            sortable: true,
        }
    ];

    createTheme('dark', {
        background: {
          default: 'rgb(51, 51, 51)',
        },
    });


  return (
    <div className="table__container">
        <DataTable
            columns={columns}
            data={dishesList}
            noDataComponent="Il n'y a aucun plat à cette date."
            defaultSortFieldId={1}
            theme="dark"
        />
    </div>
   );
}

export default Table;