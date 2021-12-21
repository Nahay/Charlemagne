import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/fr";

import InputText from "../../components/generic/InputText";
import TextArea from "../../components/generic/TextArea";
import InputButton from "../../components/generic/InputButton";
import AdminCalendar from "../../components/admin/AdminCalendar";

import { getDates } from "../../services/calendarService";
import { getCommandByDate, getCommands } from "../../services/commandsService";
import CommandsList from "../../components/admin/CommandsList";
import DishCommandList from "../../components/admin/DishCommandList";

const AdminCommands = () => {
  const ref = useRef(null);

  const [date, setDate] = useState(
    new Date(new Date().toDateString()).getTime()
  );

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [container, setContainer] = useState(false);
  const [total, setTotal] = useState("");
  const [comment, setComment] = useState("");
  const [paid, setPaid] = useState(false);

  const [dishList, setDishList] = useState([]);
  const [dateList, setDatesList] = useState([]);
  const [commandsList, setCommandsList] = useState([]);

  useEffect(() => {
    console.log(commandsList);
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
  };

  const onChangeDate = async (e) => {
    setDate(e);
    getCommandsByDate();
  };

  const onClickCommand = (d) => {
    setName(d.user.name);
    setFirstname(d.user.firstname);
    setContainer(d.container);
    setTotal(d.total);
    setComment(d.comment);
    setPaid(d.paid);
  };

  const onClickDelete = (d) => {};

  // HANDLE

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleNameChange = (e) => setName(e.target.value);

  const handleFirstnameChange = (e) => setFirstname(e.target.value);

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
        <h1 className="right__date">
          {moment(date).locale("fr").format("LL")}
        </h1>
        <div className="commands-list">
          <CommandsList
            commandsListByDate={commandsList}
            onClickCommand={onClickCommand}
            onClickDelete={onClickDelete}
          />
        </div>
        <div className="right__form">
          <div className="right__form__1">
            <div className="input-duo">
              <InputText
                value={name}
                placeholder="Nom"
                handleChange={handleNameChange}
                readOnly
              />
              <InputText
                value={firstname}
                placeholder="Prénom"
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

            <div className="commands-list">
              {/* <DishCommandList dishByUser={}/> */}
            </div>

            <div className="input-duo">
              <InputText
                value={total}
                placeholder="Total"
                handleChange={handleTotalChange}
              />
              <InputText
                value={total}
                placeholder="Total"
                handleChange={handleTotalChange}
              />
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
            <InputButton value="Enregistrer" type="submit"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommands;
