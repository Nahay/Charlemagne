import React, {useState, useEffect, useRef} from 'react';

import { toast } from 'react-toastify';

import InputText from '../../components/generic/InputText';
import InputButton from '../../components/generic/InputButton';
import TextArea from '../../components/generic/TextArea';
import AllDishesList from '../../components/admin/AllDishesList';
import Box from '../../components/generic/Box';

import { getCountByName, getVisibleDishes, updateDish, createDish, hideDish, deleteAllDishesDish } from "../../services/dishesService";
import { getOneCommandListByDish } from '../../services/commandsListService';


const AdminDishes = () => {

    const box = useRef(null);
    const e = useRef(null);
    const p = useRef(null);
    const d = useRef(null);
    

    const [id, setId] = useState("");
    const [type, setType] = useState('e');
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [previousName, setPreviousName] = useState("");
    const [desc, setDesc] = useState("");

    const [create, setCreate] = useState(true);
    const [dishList, setDishList] = useState([]);
    const [filtered, setFiltered] = useState([]);    

    const [needConfirmation, setNeedConfirmation] = useState(true);


    useEffect(() => {

      getDishList('e');
      
    }, []);
  
    const getDishList = async (t) => {
        const dishes = await getVisibleDishes();
        setDishList(dishes);

        filterDishes(t, dishes);
    }


    // HANDLE ---------------------------------------------------------------

    const handleRadioChange = (e) => {
        switch (e.target.id) {
            case 'e' :
                setType('e');
                break;
            case 'p' :
                setType('p');
                break;
            case 'd' :
                setType('d');
                break;
            default:
                break;
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePriceChange = (e) => {
        const val = e.target.value;
        if(Number(val) || val === "") setPrice(val);
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }


    // SET STATES ------------------------------------------------------------

    const onClickDish = ({ _id, name, price, description, type }) => {
        setCreate(false);
        setId(_id);
        setName(name);
        setPreviousName(name);
        setPrice(price);
        setDesc(description);
        setType(type);
    }

    const onClickNewDish = () => {
        setCreate(true);
        setType('e');
        setName("");
        setPrice("");
        setDesc("");
    }


    // DB -------------------------------------------------------------------

    const onClickDelete = async () => {
        const dish = await getOneCommandListByDish(id);
        if (!dish) {
            console.log(id);
            await hideDish(id);
            await deleteAllDishesDish(id);
            onClickNewDish();
            getDishList('e');
        }
        else toast.error("Le plat appartient à une commande, vous ne pouvez pas le supprimer.");        
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
        setId(e);
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            // submit for a new dish
            if (create) {
                const count = await getCountByName(name);
                if (count !== 1) {
                    await createDish(name, price, desc, type);
                    onClickNewDish();
                    getDishList(type);
                }
                else toast.error("Ce nom existe déjà.");
            }
    
            // submit for changing a dish
            else {
                if (name !== previousName) {
                    const count = await getCountByName(name);
                    if (count !== 1) {
                        await updateDish(id, name, price, desc, type);
                        setPreviousName(name);
                        getDishList(type);
                    }
                    else toast.error("Ce nom existe déjà.");
                }
                else {
                    await updateDish(id, name, price, desc, type);
                    setPreviousName(name);
                    getDishList(type);
                }
            }

        } catch(err) {
            toast.error("Il y a eu une erreur.");
        }
    }

    const filterDishes = (type, list) => {
        const newList = list.filter(d => d.type === type);
        setFiltered(newList);

        e.current.style.background = "none";
        p.current.style.background = "none";
        d.current.style.background = "none";

        if (type === "e") { e.current.style.background = "rgb(255, 97, 79)" }
        else if (type === "p") { p.current.style.background = "rgb(255, 97, 79)" }
        else d.current.style.background = "rgb(255, 97, 79)";
    }


    // RENDER --------------------------------------------------------------

    return (
        <div className="admin-dishes">
            <Box onClickConfirmation={onClickConfirmation} onClickDelete={onClickDelete} boxRef={box} message="Voulez-vous vraiment supprimer ce plat ?"/>
            <div className="admin-dishes__left">
                <div className="left__dishes-list">

                    <div className="left__icons">
                        <input value="Entrées" ref={e} onClick={() => filterDishes("e", dishList)} readOnly/>
                        <input value="Plats" ref={p} onClick={() => filterDishes("p", dishList)} readOnly/>
                        <input value="Desserts" ref={d} onClick={() => filterDishes("d", dishList)} readOnly/>
                    </div>
                    
                    <AllDishesList
                        dishList={filtered}
                        onClickDish={onClickDish}
                        onClickDelete={onClickConfirmation}
                    />

                </div>
            </div>
            
            <div className="admin-dishes__right">
                <div className="btn">
                    <button onClick={onClickNewDish}>Nouveau plat</button>
                </div>
                <form className="right__form" onSubmit={onSubmit}>
                    
                    <div className="right__form__radio" onChange={handleRadioChange}>
                        <input
                            type="radio"
                            value="Entrée"
                            name="typePlat"
                            id="e"
                            checked={type === 'e'}
                            readOnly
                        />
                        <label htmlFor="e">Entrée</label>
                        <input
                            type="radio"
                            value="Plat"
                            name="typePlat"
                            id="p"
                            checked={type === 'p'}
                            readOnly
                        />
                        <label htmlFor="p">Plat</label>
                        <input
                            type="radio"
                            value="Dessert"
                            name="typePlat"
                            id="d"
                            checked={type === 'd'}
                            readOnly
                        />
                        <label htmlFor="d">Dessert</label>
                    </div>
                    <div className="input-label">
                        <label>Nom du plat :</label>
                        <InputText
                            value={name}
                            placeholder="Nom du plat*"
                            handleChange={handleNameChange}
                        />
                    </div>                   

                    <div className="input-label">
                        <label>Prix :</label>
                        <InputText
                            value={price}
                            placeholder="Prix*"
                            handleChange={handlePriceChange}
                        /> 
                    </div>

                    <div className="input-label">
                        <label>Description du plat (facultative):</label>
                        <TextArea
                            value={desc}
                            placeholder="Description"
                            required={false}
                            handleChange={handleDescChange}
                        />
                    </div>
                    
                    
                    
                    <InputButton value={create? "Créer" : "Enregistrer"} type="submit"/>
                </form>
            </div>
        </div>
    );
};

export default AdminDishes;