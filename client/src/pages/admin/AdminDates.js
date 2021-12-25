import React, {useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import moment from "moment";
import 'moment/locale/fr';

import InputText from '../../components/generic/InputText';
import TextArea from '../../components/generic/TextArea';
import InputButton from '../../components/generic/InputButton';
import DishList from '../../components/admin/DishList';
import AdminCalendar from "../../components/admin/AdminCalendar";

import {getDates, updateDate, getDateByDate, createDate, deleteDate} from '../../services/calendarService';
import {getDishes, createDishDate, getDishByDate, deleteAllDishesDate, deleteDishDate, updateDishDate} from '../../services/dishesService';
import Box from '../../components/generic/Box';


const AdminDates = () => {

    const ref = useRef(null);
    const box = useRef(null);

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
    const [timeMin, setTimeMin] = useState("");
    const [timeMax, setTimeMax] = useState("");
    const [currentCommandList, setCurrentCommandList] = useState({});
    const [deletedDate, setDeletedDate] = useState(true);

    const [select, setSelect] = useState("0");
    const [dishList, setDishList] = useState([]);

    const [needConfirmation, setNeedConfirmation] = useState(true);


    useEffect(() => {

        async function defineDate(dateC) {
            setDate(dateC);
            const foundDate = await getDateByDate(dateC);
    
            // la date n'existe pas encore dans la bdd
            if (foundDate !== null) {
                setDateExists(true);
                setVisibility(foundDate.visibility);
                setComment(foundDate.comment);
                setTimeMin(foundDate.timeMin);
                setTimeMax(foundDate.timeMax);
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

        if (dishes === null) setDishByDateList([]);
        else setDishByDateList(dishes);
    }

    const resetValues = () => {
        setDateExists(false);
        setVisibility(false);
        setComment("");
        setSelect("0");
        setNb("");
        setTimeMin("");
        setTimeMax("");
        setDishByDateList([]);
    }   

    const resetValuesFromDate = (foundDate) => {
        setDateExists(true);
        setVisibility(foundDate.visibility);
        setComment(foundDate.comment);
        setTimeMin(foundDate.timeMin);
        setTimeMax(foundDate.timeMax);
        setSelect("0");
        setNb(""); 
        getDishByDateList(foundDate.dateC);
    }

    const onChangeDate = async (dateC) => {

        setDate(dateC);
        const foundDate = await getDateByDate(dateC);

        // si la date n'existe pas encore dans la bdd
        if (foundDate === null) resetValues();
        else resetValuesFromDate(foundDate);
    }

    const onClickDish = ({_id, idDish, numberKitchen, numberRemaining}) => {
        setUpD(true);

        setIdD(_id);
        setSelect(idDish._id);
        setNb(numberKitchen);
        setNbC(numberKitchen);
        setNbR(numberRemaining);
    }


    // HANDLE ---------------------------------------------------------------
    
    const handleVisibilityChange = (e) => {
        if (e.target.id ==='y') setVisibility(true);
        else setVisibility(false);
    }

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleSelectChange = (e) => {
        setSelect(e.target.value);

        const dish = dishByDateList.filter(d => d.idDish._id === e.target.value);
        if(dish.length > 0) onClickDish(dish[0]);
        else setUpD(false);
    }

    const handleNbChange = (e) => {
        const val = e.target.value;
        if(Number(val) || val === "") setNb(val);
    }

    const handleTimeMinChange = (e) => setTimeMin(e.target.value);

    const handleTimeMaxChange = (e) => setTimeMax(e.target.value);
    

    // BD -------------------------------------------------------------------

    const saveDate = async () => {

        if (!dateExists) {
            createDate(date, visibility, comment, timeMin, timeMax);
            setDateExists(true);
            getDateList();
        }
        else updateDate(date, visibility, comment, timeMin, timeMax);
    }


    const deleteAndSetDate = async (e) => {
        let haveCommand = false;
        dishByDateList.forEach(d => {
            if (d.numberKitchen !== d.numberRemaining) haveCommand = true;
        });

        if (!haveCommand) {
            await deleteDate(date);
            await deleteAllDishesDate(date);
            await getDateList();
            onChangeDate(new Date(new Date().toDateString()).getTime());
        }
        else toast.error("Il y a une commande à cette date, vous ne pouvez pas la supprimer.");

        box.current.style.display = "none";    
        setNeedConfirmation(true);
    }

    const onClickConfirmation = (e) => {
        if (needConfirmation) {
          box.current.style.display = "flex";
          setNeedConfirmation(false);
        }
        else {
          box.current.style.display = "none";
          setNeedConfirmation(true);
        }

        if(e.dateC === date) {
            setCurrentCommandList(e);
            setDeletedDate(false);
        }
        else setDeletedDate(true);
    }

    const onDateSubmit = async (e) => {
        e.preventDefault();
        saveDate(); 
    }

    const onDishSubmit = async (e) => {
        e.preventDefault();        
        // si on a sélectionné qqe chose :
        if (select !== "0") {

            if (dateExists) {

                let dishExists = false;
                dishByDateList.forEach(d => {
                    if (d.idDish._id === select) dishExists = true;
                });

                if (!dishExists) {
                    await createDishDate(date, select, nb);
                    getDishByDateList(date);
                }
                else toast.error("Le plat existe déjà !");
            }

            // la date n'existe pas : on la crée et on ajoute le plat
            else {
                await createDate(date, visibility, comment, timeMin, timeMax);
                setDateExists(true);
                await createDishDate(date, select, nb);
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

    const onClickDelete = async () => {
        if (currentCommandList.numberKitchen === currentCommandList.numberRemaining) {
            await deleteDishDate(currentCommandList._id);
            getDishByDateList(date);
        }
        else toast.error("Ce plat a déjà été commandé, vous ne pouvez pas le supprimer.");        
        box.current.style.display = "none";    
        setNeedConfirmation(true);
    }


    // RENDER ----------------------------------------------------------------

    return (
        <div className="admin-dates">
            <Box onClickConfirmation={onClickConfirmation} onClickDelete={deletedDate ? deleteAndSetDate : onClickDelete} boxRef={box}/>
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
                                readOnly
                            />
                            <label htmlFor="n">Non</label>
                            <input
                                type="radio" 
                                value="Oui"
                                name="visibility"
                                id="y"
                                checked={visibility === true}
                                readOnly
                            />
                            <label htmlFor="y">Oui</label>
                        </div>
                        <TextArea
                            value={comment}
                            placeholder="Commentaire pour cette date..."
                            required={false}
                            handleChange={handleCommentChange}
                        />
                        <div className='input-time'>
                            <div className="input-time___min">
                                <p>Heure min :</p>
                                <input type="time" value={timeMin} onChange={handleTimeMinChange} required/>
                            </div>
                            <div className="input-time___max">
                                <p>Heure max :</p>
                                <input type="time" value={timeMax} onChange={handleTimeMaxChange} required/>
                            </div>
                            
                        </div>
                        { dateExists ?
                            <div className="multi-btn">
                                    <InputButton value="Enregistrer" type="submit"/>

                                    <div onClick={onClickConfirmation}>
                                        <InputButton type="button" value="Supprimer"/>
                                    </div>                                    
                            </div>
                        :
                            <div className="multi-btn">
                                <InputButton value="Créer" type="submit"/>
                            </div>
                        }
                    </form>
                    <form className="right__form__2" onSubmit={upD ? onUpdateDishSubmit : onDishSubmit }>
                        <select value={select} id="dish-select" className="dish-select" onChange={handleSelectChange}>
                            <option value="0" id="0">Liste des plats</option>
                            {dishList.map((d) => {
                                return <option value={d._id} key={d._id}>{d.name}</option>
                            })}
                        </select>
                        <div className="input-duo">
                            <InputText
                                value={nb}
                                placeholder="Nombre Cuisine*"
                                handleChange={handleNbChange}
                            />
                            <InputButton value= { upD ? "Enregistrer nombre" : "Ajouter le plat à cette date" } type="submit"/>
                        </div>
                    </form>
                    <div className="dish-list">
                        <DishList
                            dishByDateList={dishByDateList}
                            onClickDish={onClickDish}
                            onClickDelete={onClickConfirmation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDates;