import React, {useState, useEffect} from "react";
import DataTable, { createTheme } from 'react-data-table-component';


const Table = ({dishByDateList}) => {

    const [dishesList, setDishesList] = useState([]);


    useEffect(() => {

        async function getSetDishes() {
        
            setDishesList([]);
            if (dishByDateList !== []) {
    
                dishByDateList.forEach(async d => {
    
                    setDishesList(dishesList =>
                        [...dishesList,
                            {type: getTypeName(d.idDish.type), name: d.idDish.name, nb: d.numberRemaining}
                        ]
                    );
                });
            }
        }

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

    createTheme('dark', {background: {default: 'rgb(51, 51, 51)'}});


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