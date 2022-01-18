import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/fr";
import { CSVLink } from "react-csv";
import InputText from "../../components/generic/InputText";
import TextArea from "../../components/generic/TextArea";
import InputButton from "../../components/generic/InputButton";
import AdminCalendar from "../../components/admin/AdminCalendar";
import Box from "../../components/generic/Box";

import { getDates } from "../../services/calendarService";
import {
  deleteCommand,
  getCommandByDate,
  updateCommand
} from "../../services/commandsService";
import CommandsList from "../../components/admin/CommandsList";
import DishCommandList from "../../components/admin/DishCommandList";
import { deleteAllCommandsList, updateQuantity } from "../../services/commandsListService";
import { getDishByDateAndDish, getDishById, updateDishDate } from "../../services/dishesService";
import { getUserById } from "../../services/usersService";

const AdminCommands = () => {
  const ref = useRef(null);
  const box = useRef(null);

  const [date, setDate] = useState(
    new Date(new Date().toDateString()).getTime()
  );

  const [id, setId] = useState("");
  const [commandId, setCommandId] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [time, setTime] = useState("");
  const [container, setContainer] = useState(false);
  const [total, setTotal] = useState("");
  const [comment, setComment] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [paid, setPaid] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [currentCommandList, setCurrentCommandList] = useState([]);

  const [currentDelete, setCurrentDelete] = useState("");
  const [needConfirmation, setNeedConfirmation] = useState(true);

  const [dishList, setDishList] = useState([]);
  const [dateList, setDatesList] = useState([]);
  const [commandsList, setCommandsList] = useState([]);
  const [reformatList, setReformatList] = useState([]);

  useEffect(() => {
    getDateList();
    getCommandsByDate();
  }, [date]);

  const getDateList = async () => {
    const dates = await getDates();
    setDatesList(dates);
  };

  const getCommandsByDate = async () => {
    const commands = await getCommandByDate(date);
    setCommandsList(commands);
    const reformat = await reformatCommands(commands);
    const tab = [];
    tab.push(...reformat, {"TOTAL": `=SUM(E2:E${reformat.length + 1})&""€""`});
    setReformatList(tab);
  };

  const reformatCommands = async(commands) => {
    return Promise.all(commands.map(async (command) => {
      const obj = {};
      const user = await getUserById(command.user._id);
      obj["NOM"] = user.user.name;
      obj["PRÉNOM"] = user.user.firstname;
      obj["COMMENTAIRE"] = command.comment; 
      obj["HEURE"] = command.timeC; 
      obj["TOTAL"] = command.total + " €";
      return obj;
    }));
  }

  const getDishList = async (id) => {
    const dishes = await getCommandByDate(date);
    const d = dishes.filter((d) => d.user._id === id)[0].list;
    setDishList(d);
  };

  const onChangeDate = async (e) => {
    setDate(e);
    resetInput();
    getCommandsByDate();
  };

  const onClickCommand = ({ _id, user, container, total, timeC, comment, paid }) => {
    getDishList(user._id);
    setId(user._id);
    setEmptyFields(false);
    setCommandId(_id);
    setName(user.name);
    setFirstname(user.firstname);
    setContainer(container);
    setTotal(total);
    setTime(timeC);
    setComment(comment);
    setPaid(paid);
  };

  const onClickDish = (d) => {
    setQuantity(d.quantity);
    setCurrentCommandList(d);
  };

  const onClickDelete = async () => {

    await deleteAllCommandsList(currentDelete);
    await deleteCommand(currentDelete);
    
    getCommandsByDate();
    resetInput();

    box.current.style.display = "none";
    
    setNeedConfirmation(true);
  };

  const onClickConfirmation = ({_id}) => {
    if (needConfirmation) {
      box.current.style.display = "flex";
      setNeedConfirmation(false);
    }
    else {
      box.current.style.display = "none";
      setNeedConfirmation(true);
    }
    setCurrentDelete(_id);
  }

  const onCommandSubmit = async (e) => {
    e.preventDefault();

    if(emptyFields) toast.error("Veuillez sélectioner une commande avant de pouvoir enregistrer.");

    else {
      await updateCommand(commandId, time, paid, container, comment, total);

      getCommandsByDate();
  
      resetInput();
    }    
  }

  const onModifyQuantity = async () => {

    if(quantity === "") {
      toast.error("Veuillez renseigner une quantité.")
      return;
    }

    const dishDate = await getDishByDateAndDish(date, currentCommandList.dishID);
    const dish = await getDishById(currentCommandList.dishID);
    
    if (quantity > dishDate.numberRemaining + currentCommandList.quantity) 
      toast.error(`La quantité ne peut être supérieure à ${dishDate.numberRemaining + currentCommandList.quantity}.`);
    else {
      // calcul du nombre restant en faisant : nombreRestant - ( nouvelleQuantité - ancienneQuantité )
      const numberRemaining = dishDate.numberRemaining - (quantity - currentCommandList.quantity);

      // Calcul pour le total étant donné que la quantité change
      // pour ne pas créer d'anomalie il est en readOnly
      let t = total - dish.price * currentCommandList.quantity + dish.price * quantity;
      setTotal(t);

      // on donne la nouvelle valeur de la quantité dans le state
      currentCommandList.quantity = parseInt(quantity);
      // update le nombre restant en cuisine
      await updateDishDate(dishDate._id, dishDate.numberKitchen, numberRemaining);

      // update la quantité dans la command list
      await updateQuantity(currentCommandList._id, quantity);

      getDishList(id);
    }
  }

  const resetInput = () => {
    setName("");
    setFirstname("");
    setContainer(false);
    setComment("");
    setDishList([]);
    setTotal("");
    setTime("");
    setQuantity("");
    setPaid(false);
  };

  // HANDLE

  const handleQuantityChange = (e) => {
    if(Number(e.target.value) || e.target.value === "") setQuantity(e.target.value);
  }

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleNameChange = (e) => setName(e.target.value);

  const handleFirstnameChange = (e) => setFirstname(e.target.value);

  const handleTimeChange = (e) => setTime(e.target.value);

  const handleCheckboxChange = (e) => (e.target.checked = true);

  const handleTotalChange = (e) => {
    const val = e.target.value;
    if (Number(val) || val === "") setTotal(val);
  };

  const handlePaidChange = (e) => {
    if (e.target.id === "y---paid") setPaid(true);
    else setPaid(false);
  };

  const handleContainerChange = (e) => {
    if (e.target.id === "y---container") setContainer(true);
    else setContainer(false);
  };

  // RENDER ----------------------------------------------------------------

  return (
    <div className="admin-commands">

      <Box onClickConfirmation={onClickConfirmation} onClickDelete={onClickDelete} boxRef={box} message="Voulez-vous vraiment supprimer cette commande ?"/>

      <div className="admin-commands__left">
        <div className="left__commands-list">
          <AdminCalendar
            rightRef={ref}
            dateList={dateList}
            onChangeDate={onChangeDate}
          />
          
          { commandsList.length > 0 &&
          <div className="csv__download">
            <CSVLink data={reformatList} filename={`RAPPORT-${moment(date).format("DD-MM-YYYY")}`}>Télécharger le rapport de cette date</CSVLink>
          </div>
          }
        </div>
      </div>

      <div className="admin-commands__right" ref={ref}>
        <h1 className="right__date">
          {moment(date).locale("fr").format("LL")}
        </h1>
        <div className="commands-list">
          <CommandsList
            commandsListByDate={commandsList}
            onClickCommand={onClickCommand}
            onClickDelete={onClickConfirmation}
          />
        </div>
        <div className="right__form">
          <form className="right__form__1" onSubmit={onCommandSubmit}>
            <div className="input-duo">
              <InputText
                value={name}
                placeholder="Nom"
                id="Name"
                divId="inputName"
                handleChange={handleNameChange}
                readOnly
              />
              <InputText
                value={firstname}
                placeholder="Prénom"
                id="firstname"
                divId="inputFirstname"
                handleChange={handleFirstnameChange}
                readOnly
              />
            </div>

            <div
              className="right__form__radio"
              onChange={handleContainerChange}
            >
              <span>Contenant :</span>
              <input
                type="radio"
                value="Non"
                name="contaier"
                id="n---container"
                checked={container === false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="n---container">Non</label>
              <input
                type="radio"
                value="Oui"
                name="container"
                id="y---container"
                checked={container === true}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="y---container">Oui</label>
            </div>

            <TextArea
              value={comment}
              placeholder="Commentaire"
              id="comment"
              handleChange={handleCommentChange}
            />

            <div className="commands-dish-list">
              <DishCommandList dishList={dishList} onClickDish={onClickDish} />
            </div>

            <div className="right__form--quantity" >
              <div className="input__quantity">
                  <p>Quantité : </p>
                  <InputText
                    value={quantity}
                    handleChange={handleQuantityChange}
                    required={false}
                  />
              </div>
              <InputButton value="Modifier" type="button" onClick={onModifyQuantity}/>
            </div>

            <div className="input-duo">
              <div className="time__container">
                  <div className="input__time">
                    <p>Heure :</p>
                    <input
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                      required />
                  </div>
                </div>
                

                <div className="total__container">
                  <div className="total__content">
                    <p>Total :</p>
                    <InputText value={total} handleChange={handleTotalChange} readOnly/>
                  </div>
                </div>
            </div>

            <div className="right__form__radio" onChange={handlePaidChange}>
              <span>Payée ?</span>
              <input
                type="radio"
                value="Non"
                name="paid"
                id="n---paid"
                checked={paid === false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="n---paid">Non</label>
              <input
                type="radio"
                value="Oui"
                name="paid"
                id="y---paid"
                checked={paid === true}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="y---paid">Oui</label>
            </div>
            <InputButton value="Enregistrer" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCommands;
