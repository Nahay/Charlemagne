import React from "react";
import DataTable, { createTheme } from 'react-data-table-component';
import Counter from "../generic/Counter";


const OrderTable = ({data, setData}) => {


    const handleNbChange = (e, id) => {

        const val = e.target.value;

        if ((Number(val) || val === "") && Number(val) > 0) {

            setData(data =>
            [...data.slice(0,id),
                {
                    ...data[id],
                    nbC:val,
                },
                ...data.slice(id+1)
            ]
            );
        }
    }


    const columns = [
        {
            name: 'Nom',
            width: "400px",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Prix',
            selector: row => row.price + " €",
            sortable: true,
        },
        {
            name: 'Nombre Restant',
            selector: row => row.nb
        },
        {
            name: 'Nombre Désiré',
            display: "flex",
            cell: row => ( <Counter handleChange={(e) => handleNbChange(e, row.id)} onClickPlus={onClickPlus} onClickMinus={onClickMinus}/> )
        },
        {
            name: 'Total',
            selector: row => {
                if (row.nbC !== "" && row.nbC <= row.nb) return row.nbC*row.price+" €"
                else return "0 €"
            }
        }
    ];

    createTheme('dark', {background: {default: 'rgb(51, 51, 51)'}});


    return (
        <div className="table__container">
            <DataTable
                columns={columns}
                data={data}
                noDataComponent="Il n'y a aucun plat à cette date."
                defaultSortFieldId={1}
                theme="dark"
            />
        </div>
   );
}

export default OrderTable;