import React, {useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import moment from "moment";
import 'moment/locale/fr';

import InputText from '../../components/generic/InputText';
import TextArea from '../../components/generic/TextArea';
import InputButton from '../../components/generic/InputButton';
import DishList from '../../components/admin/DishList';
import AdminCalendar from "../../components/admin/AdminCalendar";

import {getCommandByDate} from '../../services/commandsService';
import {getDates, updateDate, getDateByDate, createDate, deleteDate} from '../../services/calendarService';
import {getDishes, createDishDate, getDishByDate, deleteAllDishesDate, deleteDishDate, updateDishDate} from '../../services/dishesService';


const AdminDates = () => {

    const ref = useRef(null);

    const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());
    const [dateList, setDatesList] = useState([]);
    const [dishByDateList, setDishByDateList] = useState([]);

    const [dateExists, setDateExists] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [comment, setComment] = useState("");


    const [upD, setUpD] = useState(false);
    const [nb, setNb] = useState("");
    const [idD, setIdD] = useState("");
    const [nbC, setNbC] = useState("");
    const [nbR, setNbR] = useState("");

    const [select, setSelect] = useState("0");
    const [dishList, setDishList] = useState([]);


    useEffect(() => {

        async function defineDate(dateC) {
            setDate(dateC);
            const foundDate = await getDateByDate(dateC);
    
            // la date n'existe pas encore dans la bdd
            if (foundDate !== null) {
                setDateExists(true);
                setVisibility(foundDate.visibility);
                setComment(foundDate.comment);
                setSelect("0");
                setNb("");

                getDishByDateList(foundDate.dateC);
            }
        }

        getDishList();
        getDateList();
        defineDate(new Date(new Date().toDateString()).getTime());

    }, []);
    

    // SET STATES --------------------------------------------------------------

    const getDishList = async () => {
        const dishes = await getDishes();
        setDishList(dishes);
    }

    const getDateList = async () => {
        const dates = await getDates();
        setDatesList(dates);
    }

    const getDishByDateList = async (dateC) => {
        
        const dishes = await getDishByDate(dateC);

        if (dishes === null) {
            setDishByDateList([]);
        }
        else setDishByDateList(dishes);
    }

    const resetValues = () => {
        setDateExists(false);
        setVisibility(false);
        setComment("");
        setSelect("0");
        setNb("");
        setDishByDateList([]);
    }

    const resetValuesFromDate = (foundDate) => {
        setDateExists(true);
        setVisibility(foundDate.visibility);
        setComment(foundDate.comment);
        setSelect("0");
        setNb("");

        getDishByDateList(foundDate.dateC);
    }


    const onChangeDate = async (dateC) => {

        setDate(dateC);
        const foundDate = await getDateByDate(dateC);

        // la date n'existe pas encore dans la bdd
        if (foundDate === null) {
            resetValues();
        }
        else {
            resetValuesFromDate(foundDate);
        }
    }

    const onClickDish = (id, idDish, nbK, nbR) => {
        setUpD(true);

        setIdD(id);
        setSelect(idDish);
        setNb(nbK);
        setNbC(nbK);
        setNbR(nbR);
    }


    // HANDLE ---------------------------------------------------------------

    const handleCheckboxChange = (e) => e.target.checked = true;
    
    const handleVisibilityChange = (e) => {
        if (e.target.id ==='y') setVisibility(true);
        else setVisibility(false);
    }

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleSelectChange = (e) => {
        setSelect(e.target.value);

        const dish = dishByDateList.filter(d => d.idDish === e.target.value);
        if(dish.length > 0) {
            const { _id, idDish, numberKitchen, numberRemaining } = dish[0];
            onClickDish(_id, idDish, numberKitchen, numberRemaining);
        }
        else setUpD(false);
    }

    const handleNbChange = (e) => {
        const val = e.target.value;
        if(Number(val) || val === "") setNb(val);
    }
    

    // BD -------------------------------------------------------------------

    const saveDate = async () => {

        if (!dateExists) {
            createDate(date, visibility, comment);
            setDateExists(true);
            getDateList();
        }
        else {
            updateDate(date, visibility, comment);
        }
    }


    const deleteAndSetDate = async () => {

        const command = await getCommandByDate(date);
        if (command === null) {
            await deleteDate(date);
            await deleteAllDishesDate(date);
            await getDateList();
            onChangeDate(new Date(new Date().toDateString()).getTime());
        }
        else toast.error("Il y a une commande à cette date, vous ne pouvez pas supprimer la date.");
    }


    const onDishSubmit = async (e) => {
        e.preventDefault();
        
        // si on a sélectionné qqe chose :
        if (select !== "0") {

            if (dateExists) {
                await createDishDate(date, select , nb);
                getDishByDateList(date);
            }

            // la date n'existe pas : on la crée et on ajoute le plat
            else {
                await createDate(date, visibility, comment);
                setDateExists(true);
                await createDishDate(date, select , nb);
                getDishByDateList(date);
            }

            setNb("");
            setSelect("0");
        }
        else toast.error("Aucun plat n'est sélectionné.");
    }


    const onUpdateDishSubmit = async (e) => {
        e.preventDefault();

        const nbCommande = nbC - nbR;

        if (nb >= nbCommande) {
            await updateDishDate(idD, nb, nb-nbCommande);
            getDishByDateList(date);
        }
        else toast.error(`Vous ne pouvez pas mettre un nombre inférieur au nombre de commandes qui est de : ${nbCommande}.`);
    }

    const onClickDelete = async (id, nbK, nbR) => {
        if (nbK === nbR) {
            await deleteDishDate(id);
            getDishByDateList(date);
        }
        else toast.error("Ce plat a déjà été commandé, vous ne pouvez pas le supprimer.");
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
                    <div className="right__form__1">
                        <div className="right__form__radio" onChange={handleVisibilityChange}>
                            <span>Visible ?</span>
                            <input
                                type="radio"
                                value="Non"
                                name="visibility"
                                id="n"
                                checked={visibility === false}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="n">Non</label>
                            <input
                                type="radio" 
                                value="Oui"
                                name="visibility"
                                id="y"
                                checked={visibility === true}
                                onChange={handleCheckboxChange}
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
                        { dateExists ?
                            <div className="multi-btn">
                                <div onClick={saveDate}>
                                    <InputButton value="Enregistrer"/>
                                </div>
                                <div onClick={deleteAndSetDate}>
                                    <InputButton value="Supprimer"/>
                                </div>
                            </div>
                        :
                            <div className="multi-btn">
                                <div onClick={saveDate}>
                                    <InputButton id="crerDate" value="Créer"/>
                                </div>
                            </div>
                        }
                    </div>
                    <form className="right__form__2" onSubmit={upD ? onUpdateDishSubmit : onDishSubmit }>
                        <select value={select} id="dish-select" className="dish-select" onChange={handleSelectChange}>
                            <option value="" id="0">Liste des plats</option>
                            {dishList.map((d) => {
                                return <option value={d._id} key={d._id}>{d.name}</option>
                            })}
                        </select>
                        <div className="input-duo">
                            <InputText
                                value={nb}
                                placeholder="Nombre Cuisine*"
                                id="nombreCuisine"
                                divId="inputNbCuisine"
                                handleChange={handleNbChange}
                            />
                            <InputButton value= { upD ? "Enregistrer nombre" : "Ajouter le plat à cette date" } />
                        </div>
                    </form>
                    <div className="dish-list">
                        <DishList
                            dishByDateList={dishByDateList}
                            onClickDish={onClickDish}
                            onClickDelete={onClickDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDates;