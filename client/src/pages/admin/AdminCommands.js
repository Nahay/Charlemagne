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
import CommandsList from "../../components/admin/CommandsList";
import DishCommandList from "../../components/admin/DishCommandList";

import { getDates } from "../../services/calendarService";
import { hideCommand, deleteCommand, getCommandByDate, updateCommand } from "../../services/commandsService";
import { getCommandListByCommandWithDish, deleteCommandList, updateQuantity } from "../../services/commandsListService";
import { updateDishDateQtt, getDishByDateAndDish, getDishById, updateDishDate } from "../../services/dishesService";
import { getUserById } from "../../services/usersService";


const AdminCommands = () => {

  const ref = useRef(null);
  const boxCommand = useRef(null);
  const boxCommandList = useRef(null);

  const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());

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
  const [visibleCommandsList, setVisibleCommandsList] = useState([]);
  const [reformatList, setReformatList] = useState([]);
  const [pastDate, setPastDate] = useState(false);

  const csvData = [
    {
    name: 'Guezouli',
    firstname: 'Malek',
  
    dish: [{
        id: 16,
        name: 'Mousse au chocolat',
        price: 3,
        quantity: 1
      },
      {
        id: 17,
        name: 'Lasagnes',
        price: 8,
        quantity: 5
      }
    ],
    total: 43
  }, 
  {
    name: 'Doe',
    firstname: 'John',
  
    dish: [{
        id: 16,
        name: 'Poulet rôti',
        price: 10,
        quantity: 2
      },
      {
        id: 17,
        name: 'Lasagnes',
        price: 8,
        quantity: 5
      }
    ],
    total: 60
  }, 
];

  const headers = [
    { label: 'Nom', key: 'name' },
    { label: 'Prénom', key: 'firstname' },
    { label: 'Plat', key: 'dish' },
    { label: 'Quantité', key: 'quantity' },
    { label: 'Prix', key: 'price' },
    { label: 'Total', key: 'total' },
];

  useEffect(() => {
    async function getCommandsByDate() {
      const commands = await getCommandByDate(date);
      setCommandsList(commands);
      const visibleCommands = commands.filter((c) => c.visible);
      setVisibleCommandsList(visibleCommands);
      const reformat = formatData(commands);     
      setReformatList(reformat);
    };

    getDateList();
    getCommandsByDate();
  }, [date]);

  const getDateList = async () => {
    const dates = await getDates();
    setDatesList(dates);
  }

  const getCommandsByDate = async () => {
    const commands = await getCommandByDate(date);
    setCommandsList(commands);

    const visibleCommands = commands.filter((c) => c.visible);
    setVisibleCommandsList(visibleCommands);

    const reformat = formatData(commands);
    setReformatList(reformat);
  };

  const formatData = (commands) => {
    let data = []
    commands.forEach(item => {
        data.push({
            name: item.user.name,
            firstname: item.user.firstname,
            dish: item.list[0].dishID.name,
            quantity: item.list[0].quantity,
            price: item.list[0].dishID.price + " €",
            total: item.total + "€"
        });
        for (let i = 1; i < item.list.length; i++) {
            const dish = item.list[i];
            data.push({
                name: '',
                firstname: '',
                dish: dish.dishID.name,
                quantity: dish.quantity,
                price: dish.dishID.price + " €",
                total: ''
            });
        }
        data.push({tt: `=SUM(F2:F${data.length + 1})&""€""`});
    });
    console.log(data);
    return data;
  }

  const getDishList = async (id) => {
    const d = commandsList.filter((d) => d._id === id)[0].list;
    setDishList(d);
  }

  const onChangeDate = async (e) => {
    setDate(e);
    resetInput();
    getCommandsByDate();
    setDishClicked(false);
    setPastDate(e < new Date(new Date().toDateString()).getTime());
  }

  const onClickCommand = ({ _id, user, container, total, timeC, comment, paid }) => {
    getDishList(_id);
    setId(_id);
    setEmptyFields(false);
    setCommandId(_id);
    setName(user.name);
    setFirstname(user.firstname);
    setContainer(container);
    setTotal(total);
    setTime(timeC);
    setComment(comment);
    setPaid(paid);

    setDishClicked(false);
    setQuantity(0);
  }

  const onClickDish = (d) => {
    setQuantity(d.quantity);
    setCurrentCommandList(d);
    setDishClicked(true);
  }

  // suppression de la commande (invisible)
  const handleHideCommand = async () => {

    await hideCommand(currentDelete);
    
    getCommandsByDate();
    resetInput();

    boxCommand.current.classList.toggle("visible");
  }

  // apparition de la box pour supprimer la commande
  const onClickCommandDelete =  (_id) => {
    boxCommand.current.classList.toggle("visible");
    setCurrentDelete(_id);
  }

  // suppression d'un plat d'une commande
  const handleDeleteCommandList = async () => {

    updateDishDateQtt(date, currentCommandList.dishID._id, currentCommandList.quantity);
    deleteCommandList(currentCommandList._id);

    const remaining = commandsList.filter((c) => c._id === id)[0].list.length;
    if (remaining === 1) await deleteCommand(id);
    
    getCommandsByDate();
    resetInput();

    boxCommandList.current.classList.toggle("visible");
  }

  // apparition de la box pour supprimer un plat d'une commande
  const onClickCommandListDelete =  (_id) => {
    if(!pastDate) {
      boxCommandList.current.classList.toggle("visible");
      setCurrentDelete(_id);
    }
    else toast.error("Le contenu de la commande ne peut être modifié.")

  }

  // bouton annuler sur la box
  const removeBoxCommand = () => boxCommand.current.classList.toggle("visible")
  const removeBoxCommandList = () => boxCommandList.current.classList.toggle("visible")

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
      await updateQuantity(currentCommandList._id, quantity);

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

  const handleQuantityChange = (e) => {
    if(Number(e.target.value) || e.target.value === "") setQuantity(e.target.value);
  }

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


  // RENDER ----------------------------------------------------------------

  return (
    <div className="admin-commands">

      <Box onClickConfirmation={removeBoxCommand} onClickDelete={handleHideCommand} boxRef={boxCommand} message="Voulez-vous vraiment supprimer cette commande ?"/>
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
             <CSVLink
            data={reformatList}
            headers={headers}
            filename={"blabla"}
            target="_blank"
        >Télécharger le rapport de cette date</CSVLink>
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
            commandsListByDate={visibleCommandsList}
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
           

            {/* <div className="container_radio_duo">
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
            </div> */}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCommands;