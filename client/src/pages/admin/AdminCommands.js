import React, {useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import moment from "moment";
import 'moment/locale/fr';

import InputText from '../../components/generic/InputText';
import TextArea from '../../components/generic/TextArea';
import InputButton from '../../components/generic/InputButton';
import AdminCalendar from "../../components/admin/AdminCalendar";

import {getDates} from '../../services/calendarService';
import {getCommandByDate} from '../../services/commandsService';


const AdminCommands = () => {

    const ref = useRef(null);

    const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [container, setContainer] = useState(false);
    const [total, setTotal] = useState("");
    const [comment, setComment] = useState("");
    const [paid, setPaid] = useState(false);



    const [dateList, setDatesList] = useState([]);
    const [commandsList, setCommandsList] = useState([]);


    useEffect(() => {

        getDateList();
        getCommandsByDate();

    }, []);

    const getDateList = async () => {
        const dates = await getDates();
        setDatesList(dates);
    }

    const getCommandsByDate = async () => {
        const commands = await getCommandByDate(date);
        setCommandsList(commands);
    }

    const onChangeDate = () => {

    }


    // HANDLE

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleNameChange = (e) => setName(e.target.value);

    const handleFirstnameChange = (e) => setFirstname(e.target.value);

    const handleCheckboxChange = (e) => e.target.checked = true;

    const handleTotalChange = (e) => {
        const val = e.target.value;
        if(Number(val) || val === "") setTotal(val);
    }
    
    const handlePaidChange = (e) => {
        if (e.target.id ==='y') setPaid(true);
        else setPaid(false);
    }

    

    

    // RENDER ----------------------------------------------------------------

    return (
        <div className="admin-commands">
            <div className="admin-commands__left">
                <div className="left__commands-list">
                    <AdminCalendar
                        rightRef={ref}
                        dateList={dateList}
                        onChangeDate={onChangeDate}
                    />
                </div>
            </div>
            
            <div className="admin-commands__right" ref={ref}>
            <h1 className="right__date">{moment(date).locale('fr').format('LL')}</h1>
                <div className="right__form">
                    <div className="right__form__1">
                        <div className="input-duo">
                            <InputText
                                value={name}
                                placeholder="Nom"
                                id="Name"
                                divId="inputName"
                                handleChange={handleNameChange}
                            />
                            <InputText
                                value={firstname}
                                placeholder="Prénom"
                                id="firstname"
                                divId="inputFirstname"
                                handleChange={handleFirstnameChange}
                            />
                        </div>

                        <div className="right__form__radio">
                            <span>Contenant :</span>
                            <input
                                type="radio"
                                value={container ? "Oui" : "Non"}
                                name="container"
                                id="container"
                                checked={true}
                            />
                            <label htmlFor="container">{container ? "Oui" : "Non"}</label>
                        </div>

                        <InputText
                                value={total}
                                placeholder="Total"
                                id="total"
                                divId="inputTotal"
                                handleChange={handleTotalChange}
                        />
                       
                        <TextArea
                            value={comment}
                            placeholder=""
                            id=""
                            handleChange={handleCommentChange}
                        />
                        <div className="right__form__radio" onChange={handlePaidChange}>
                            <span>Payée ?</span>
                            <input
                                type="radio"
                                value="Non"
                                name="paid"
                                id="n"
                                checked={paid === false}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="n">Non</label>
                            <input
                                type="radio" 
                                value="Oui"
                                name="paid"
                                id="y"
                                checked={paid === true}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="y">Oui</label>
                        </div>
                        <InputButton value="Enregistrer"/>
                    </div>
                    <div className="commands-list">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCommands;