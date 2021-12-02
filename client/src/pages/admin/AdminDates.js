import React, {useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import moment from "moment";
import 'moment/locale/fr';

import InputText from '../../components/generic/InputText';
import TextArea from '../../components/generic/TextArea';
import InputButton from '../../components/generic/InputButton';
import DishList from '../../components/admin/DishList';
import AdminCalendar from "../../components/admin/AdminCalendar";

import {getDates, updateDate, getDateByDate} from '../../services/calendarService';
import {getDishes, createDishDate, getCountByDateAndId} from '../../services/dishesService';


const AdminHome = () => {

    const ref = useRef(null);

    const [id, setId] = useState("");
    const [date, setDate] = useState(moment(new Date()).locale('fr').format('LL'));
    const [dateList, setDatesList] = useState([]);

    const [visibility, setVisibility] = useState(false);
    const [comment, setComment] = useState("");
    const [Nb, setNb] = useState(null);
    const [select, setSelect] = useState("0");
    const [dishList, setDishList] = useState([]);


    useEffect(() => {
        getDishList();
    }, []);
    
    const getDishList = async () => {
        const dishes = await getDishes();
        setDishList(dishes);
    }

    const getDateList = async () => {
        const dates = await getDates();
        setDatesList(dates);
    }

    const resetValues = () => {
        setVisibility(false);
        setComment("");
        setSelect("0");
        setNb(null);
        setDishList([]);
    }

    const onChangeDate = async (date) => {
        setDate(date);
        const test = await getDateByDate(date);
        // la date n'existe pas encore dans la bdd
        if (test === null) {
            resetValues();
        }
        else {

        }
    }


    // HANDLE ---------------------------------------------------------------

    const handleVisibilityChange = (e) => {
        if (e.target.id ==='y') setVisibility(true);
        else setVisibility(false);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleSelectChange = (e) => {
        setSelect(e.target.value);
    }

    const handleNbChange = (e) => {
        const val = e.target.value;
        if(Number(val) || val === "") setNb(val);
    }


    // BD -------------------------------------------------------------------

    const onDateSubmit = (e) => {
        e.preventDefault();

        // updateDate(date, visibility, comment);
    }

    const onDishSubmit = async (e) => {
        e.preventDefault();
        
        // si on a sélectionné qqe chose :
        if (select !== "0") {
            
            // const count = await getCountByDateAndId(date, select);

            // if (count !== "1") {
            //     await createDishDate(date, select ,numberKitchen);
            // }
            // else toast.error("Ce plat existe déjà à cette date.");

            setNb(null);
            setSelect("0");
        }
        else toast.error("Aucun plat n'est sélectionné.");
    }


    return (
        <div className="admin-dates">
            <div className="admin-dates__left">
                <div className="left__dates-list">
                    <AdminCalendar
                        rightRef={ref}
                        dateList={dateList}
                        onChangeDate={onChangeDate}
                    />
                </div>
            </div>
            
            <div className="admin-dates__right" ref={ref}>
                <h1 className="right__date">{date}</h1>
                <div className="right__form">
                    <form className="right__form__1" onSubmit={onDateSubmit}>
                        <div className="right__form__radio" onChange={handleVisibilityChange}>
                            <span>Visible ?</span>
                            <input
                                type="radio"
                                value="Non"
                                name="visibility"
                                id="n"
                                checked={visibility === false}
                            />
                            <label htmlFor="n">Non</label>
                            <input
                                type="radio" 
                                value="Oui"
                                name="visibility"
                                id="y"
                                checked={visibility === true}
                            />
                            <label htmlFor="y">Oui</label>
                        </div>
                        <TextArea
                            value={comment}
                            placeholder="Commentaire pour cette date..."
                            id="dateComment"
                            required={false}
                            handleChange={handleCommentChange}
                        />
                        <InputButton id="radioEnregistrer" value="Enregistrer"/>
                    </form>
                    <form className="right__form__2" onSubmit={onDishSubmit}>
                        <select value={select} id="dish-select" className="dish-select" onChange={handleSelectChange}>
                            <option value="" id="0">Liste des plats</option>
                            {dishList.map((d) => {
                                return <option value={d._id} key={d._id}>{d.name}</option>
                            })}
                        </select>
                        <div className="input-duo">
                            <InputText
                                value={Nb}
                                placeholder="Nombre Cuisine*"
                                id="nombreCuisine"
                                divId="inputNbCuisine"
                                handleChange={handleNbChange}
                            />
                            <InputButton value="Ajouter le plat à cette date"/>
                        </div>
                    </form>
                    <div className="dish-list">
                        <DishList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;