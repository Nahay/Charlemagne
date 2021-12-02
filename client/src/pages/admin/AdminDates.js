import React, {useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import moment from "moment";
import 'moment/locale/fr';

import InputText from '../../components/generic/InputText';
import TextArea from '../../components/generic/TextArea';
import InputButton from '../../components/generic/InputButton';
import DishList from '../../components/admin/DishList';
import AdminCalendar from "../../components/admin/AdminCalendar";

import {getDates, updateDate, getDateByDate, createDate} from '../../services/calendarService';
import {getDishes, createDishDate, getCountByDateAndId, getDishByDate} from '../../services/dishesService';


const AdminHome = () => {

    const ref = useRef(null);

    const [date, setDate] = useState(new Date());
    const [dateList, setDatesList] = useState([]);
    const [dishByDateList, setDishByDateList] = useState([]);

    const [visibility, setVisibility] = useState(false);
    const [comment, setComment] = useState("");
    const [Nb, setNb] = useState(null);
    const [select, setSelect] = useState("0");
    const [dishList, setDishList] = useState([]);


    useEffect(() => {
        getDishList();
        getDateList();
        getDishByDateList();
    }, []);
    
    const getDishList = async () => {
        const dishes = await getDishes();
        setDishList(dishes);
    }

    const getDateList = async () => {
        const dates = await getDates();
        setDatesList(dates);
    }

    const getDishByDateList = async () => {
        let dishes;

        if (Number(date)) console.log(true +" "+ date);
        else console.log(false + " "+ date);

        if (Number(date)) dishes = await getDishByDate(date);
        else dishes = await getDishByDate(date.getTime());

        console.log(dishes);

        if (dishes === null) {
            setDishByDateList([]);
        }
        else console.log(dishes);
        //else setDishByDateList(dishes);
    }

    const resetValues = () => {
        setVisibility(false);
        setComment("");
        setSelect("0");
        setNb("");
        setDishByDateList([]);
    }

    const resetValuesFromDate = (foundDate) => {
        setVisibility(foundDate.visibility);
        setComment(foundDate.comment);
        setSelect("0");
        setNb("");

        getDishByDateList();
    }


    const onChangeDate = async (date) => {
        setDate(date);
        const foundDate = await getDateByDate(date);
        // la date n'existe pas encore dans la bdd
        if (foundDate === null) {
            resetValues();
        }
        else {
            resetValuesFromDate(foundDate);
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

    const onDateSubmit = async (e) => {
        e.preventDefault();

        const foundDate = await getDateByDate(date);
        // la date n'existe pas encore dans la bdd
        if (foundDate === null) {
            createDate(date, visibility, comment);
        }
        else {
            updateDate(date, visibility, comment);
        }
    }

    const onDishSubmit = async (e) => {
        e.preventDefault();
        
        // si on a sélectionné qqe chose :
        if (select !== "0") {
            
            const count = await getCountByDateAndId(date, select);

            if (count !== "1") {
                // await createDishDate(date, select ,numberKitchen);
            }
            else toast.error("Ce plat existe déjà à cette date.");

            setNb(null);
            setSelect("0");
        }
        else toast.error("Aucun plat n'est sélectionné.");
    }


    // RENDER ----------------------------------------------------------------

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
                <h1 className="right__date">{moment(date).locale('fr').format('LL')}</h1>
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
                        <DishList dishByDateList={dishByDateList}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;