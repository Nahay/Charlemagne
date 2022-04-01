import React, { useState, useEffect, useRef } from "react";

import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/fr";

import InputText from "../../components/generic/InputText";
import TextArea from "../../components/generic/TextArea";
import InputButton from "../../components/generic/InputButton";
import AdminCalendar from "../../components/admin/AdminCalendar";
import Box from "../../components/generic/Box";
import CommandsList from "../../components/admin/CommandsList";
import DishCommandList from "../../components/admin/DishCommandList";

import { getDateByDate, getDates } from "../../services/calendarService";
import { deleteCommand, getCommandByDate, updateCommand, downloadReport} from "../../services/commandsService";
import { deleteCommandList, updateQuantity, getCommandListById } from "../../services/commandsListService";
import { updateDishDateQtt, getDishByDateAndDish, getDishById, updateDishDate, getDishByDate } from "../../services/dishesService";


const AdminCommands = () => {

  const token = localStorage.getItem("adminToken");

  const ref = useRef(null);
  const boxCommand = useRef(null);
  const boxCommandList = useRef(null);

  const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());
  const [dateComment, setDateComment] = useState("");

  const [id, setId] = useState("");
  const [commandId, setCommandId] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [time, setTime] = useState("");
  const [container, setContainer] = useState(false);
  const [total, setTotal] = useState(0);
  const [comment, setComment] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [paid, setPaid] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [currentCommandList, setCurrentCommandList] = useState([]);
  const [dishClicked, setDishClicked] = useState(false);

  const [currentDelete, setCurrentDelete] = useState("");

  const [dishList, setDishList] = useState([]);
  const [dateList, setDatesList] = useState([]);
  const [commandsList, setCommandsList] = useState([]);
  const [pastDate, setPastDate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    async function getCommandsByDate() {
      const commands = await getCommandByDate(date, token);
      setCommandsList(commands);
    };

    async function getDateComment() {
      const d = await getDateByDate(date);
      d && setDateComment(d.comment);
    }

    getDateComment();
    getDateList();
    getCommandsByDate();
  }, [date]);

  const getDateComment = async (e) => {
    const d = await getDateByDate(e);
    d && setDateComment(d.comment);
  }

  const getDateList = async () => {
    const dates = await getDates();
    setDatesList(dates);
  }

  const getCommandsByDate = async () => {
    const commands = await getCommandByDate(date, token);
    setCommandsList(commands);
  };

  const getDishList = async (commandId) => {
    const d = commandsList.filter((d) => d._id === commandId)[0].list;
    setDishList(d);
  }

  const onChangeDate = async (e) => {
    setDate(e);
    getDateComment(e);
    resetInput();
    getCommandsByDate();
    setDishClicked(false);

    // déclaration de la date actuelle
    let todayMinusOne = new Date(new Date().toDateString());
    // transformation de la date en jour - 1
    todayMinusOne.setDate(todayMinusOne.getDate() - 1);
    // déclare une nouvelle date sous le format int
    todayMinusOne = todayMinusOne.getTime();
    setPastDate(e < todayMinusOne);
  }

  const onClickCommand = (d) => {
    getDishList(d._id);
    setId(d._id);
    setEmptyFields(false);
    setCommandId(d._id);
    setName(d.user.name);
    setFirstname(d.user.firstname);
    setContainer(d.container);
    setTotal(d.total);
    setTime(d.timeC);
    setComment(d.comment);
    setPaid(d.paid);

    setCurrentCommandList(d.list);
    setDishClicked(false);
    setQuantity(0);
  }

  const onClickDish = (d) => {
    setQuantity(d.quantity);
    setCurrentCommandList(d);
    setDishClicked(true);
  }

  // suppression de la commande
  const handleDeleteCommand = async () => {
    console.log(currentDelete);
    await deleteCommand(currentDelete, token);
    console.log(date);
    
    for (const c of commandsList[0].list) {
      await updateDishDateQtt(date, c.dishID._id, c.quantity, token);
      await deleteCommandList(c._id, token);
    }
    
    getCommandsByDate();
    resetInput();

    boxCommand.current.style.visibility = "hidden";
    boxCommand.current.style.opacity = 0;
  }

  // apparition de la box pour supprimer la commande
  const onClickCommandDelete =  (commandListId) => {
    boxCommand.current.style.visibility = "visible";
    boxCommand.current.style.opacity = 1;
    setCurrentDelete(commandListId);
  }

  // suppression d'un plat d'une commande
  const handleDeleteCommandList = async () => {
    const cl = await getCommandListById(currentDelete, token);

    await updateDishDateQtt(date, cl[0].dishID, cl[0].quantity, token);
    await deleteCommandList(cl[0]._id, token);

    const remaining = commandsList.filter((c) => c._id === id)[0].list.length;
    remaining === 1 && await deleteCommand(id, token);

    getCommandsByDate();
    resetInput();

    boxCommandList.current.style.visibility = "hidden";
    boxCommandList.current.style.opacity = 0;
  }

  // apparition de la box pour supprimer un plat d'une commande
  const onClickCommandListDelete =  (_id) => {
    if(!pastDate) {
      boxCommandList.current.style.visibility = "visible";
      boxCommandList.current.style.opacity = 1;
      setCurrentDelete(_id);
    }
    else toast.error("Le contenu de la commande ne peut être modifié.")
  }

  // bouton annuler sur la box
  const removeBoxCommand = () => {
    boxCommand.current.style.visibility = "hidden";
    boxCommand.current.style.opacity = 0;
  }
  const removeBoxCommandList = () => {
    boxCommandList.current.style.visibility = "hidden";
    boxCommandList.current.style.opacity = 0;
  }

  const onCommandSubmit = async (e) => {
    e.preventDefault();

    if(emptyFields) toast.error("Veuillez sélectioner une commande avant de pouvoir enregistrer.");

    else {
      await updateCommand(commandId, time, paid, container, comment, total, token);

      getCommandsByDate();
      resetInput();
    }    
  }

  const onModifyQuantity = async () => {

    if(quantity === "") {
      toast.error("Veuillez renseigner une quantité.")
      return;
    }

    const dishDate = await getDishByDateAndDish(date, currentCommandList.dishID._id);
    const dish = await getDishById(currentCommandList.dishID._id);

    if (quantity > dishDate.numberRemaining + currentCommandList.quantity) 
      toast.error(`La quantité ne peut être supérieure à ${dishDate.numberRemaining + currentCommandList.quantity}.`);
    else {
      // calcul du nombre dispo en faisant : nombreRestant - ( nouvelleQuantité - ancienneQuantité )
      const numberRemaining = dishDate.numberRemaining - (quantity - currentCommandList.quantity);

      // Calcul pour le total étant donné que la quantité change
      // pour ne pas créer d'anomalie il est en readOnly
      let t = total - dish.price * currentCommandList.quantity + dish.price * quantity;
      setTotal(t);

      // on donne la nouvelle valeur de la quantité dans le state
      currentCommandList.quantity = parseInt(quantity);
      // update le nombre dispo en cuisine
      await updateDishDate(dishDate._id, dishDate.numberKitchen, numberRemaining);

      // update la quantité dans la command list
      await updateQuantity(currentCommandList._id, quantity, token);

      setDishClicked(false);
      setQuantity("");
      getDishList(id);
    }
  }

  const resetInput = () => {
    setName("");
    setFirstname("");
    setContainer(false);
    setComment("");
    setDishList([]);
    setTotal(0);
    setTime("");
    setQuantity("");
    setPaid(false);
  }

  // HANDLE

  const handleQuantityChange = (e) => (Number(e.target.value) || e.target.value === "") && setQuantity(e.target.value)

  const handleCommentChange = (e) => setComment(e.target.value)

  const handleNameChange = (e) => setName(e.target.value)

  const handleFirstnameChange = (e) => setFirstname(e.target.value)

  const handleTimeChange = (e) => setTime(e.target.value)

  const handleCheckboxChange = (e) => (e.target.checked = true)

  const handleTotalChange = (e) => {
    const val = e.target.value;
    if (Number(val) || val === "") setTotal(val);
  }

  const handleContainerChange = (e) => {
    if (e.target.id === "y---container") setContainer(true);
    else setContainer(false);
  }


  const onClickDownload = async () => {
    const dishes = await getDishByDate(date);
    const commands = await getCommandByDate(date, token);
    await downloadReport(dishes, commands, moment(date).format("DD/MM/YYYY"), moment(date).format("DD-MM-YYYY"), dateComment);    
  }

  // RENDER ----------------------------------------------------------------

  return (
    <div className="admin-commands">

      <Box onClickConfirmation={removeBoxCommand} onClickDelete={handleDeleteCommand} boxRef={boxCommand} message="Voulez-vous vraiment supprimer cette commande ?"/>
      <Box onClickConfirmation={removeBoxCommandList} onClickDelete={handleDeleteCommandList} boxRef={boxCommandList} message="Voulez-vous vraiment supprimer ce plat de cette commande ?"/>

      <div className="admin-commands__left">
        <div className="left__commands-list">
          <AdminCalendar
            rightRef={ref}
            dateList={dateList}
            onChangeDate={onChangeDate}
          />
          
          { commandsList.length > 0 &&
          
          <div className="csv__download">
            <button onClick={onClickDownload}>Télécharger le rapport</button>
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
            onClickDelete={onClickCommandDelete}
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

            <div className="commands-dish-list">
              <DishCommandList
                dishList={dishList}
                onClickDish={(d) => onClickDish(d)}
                onClickDelete={onClickCommandListDelete}
              />
            </div>

            {dishClicked && !pastDate ? 
            <div className="right__form--quantity" >
              <div className="input__quantity">
                  <p>Quantité : </p>
                  <InputText
                    value={quantity}
                    handleChange={handleQuantityChange}
                    placeholder="0"
                    required={false}
                  />
              </div>
              <InputButton value="Modifier" type="button" onClick={onModifyQuantity}/>
            </div>
            :
            <div className="right__form--quantity disabled" >
              <div className="input__quantity">
                  <p>Quantité : </p>
                  <div className="input">
                    <input type="text" value={quantity} onChange={handleQuantityChange} placeholder="0" disabled/>
                  </div>
              </div>
              <div className="input-btn">
                  <input type="button" value="Modifier" disabled/>
              </div>
            </div>
            }

            <div className="container_radio_duo">
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
                  <InputText value={total+" €"} handleChange={handleTotalChange} readOnly/>
                </div>
              </div>
            </div>

            <TextArea
              value={comment}
              placeholder="Commentaire..."
              id="comment"
              handleChange={handleCommentChange}
            />

            {!pastDate &&  
            <div className="input-btn---save">
              <InputButton value="Enregistrer" type="submit" />
            </div> }
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCommands;