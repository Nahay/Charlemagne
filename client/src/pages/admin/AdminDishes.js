import React, {useState, useEffect} from 'react';
import InputText from '../../components/generic/InputText';
import InputButton from '../../components/generic/InputButton';
import TextArea from '../../components/generic/TextArea';
import AllDishesList from '../../components/admin/AllDishesList';
import { toast } from 'react-toastify';

import { getCountByName, getDishes, updateDish, createDish, deleteDish, deleteAllDishesDish } from "../../services/dishesService";
import { getOneCommandListByDish } from '../../services/commandsListService';


const AdminDishes = () => {

    const [id, setId] = useState('');
    const [type, setType] = useState('e');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState("");
    const [previousName, setPreviousName] = useState("");
    const [desc, setDesc] = useState("");

    const [create, setCreate] = useState(true);
    const [dishList, setDishList] = useState([]);


    useEffect(() => {
      getDishList();
    }, []);
  
    const getDishList = async () => {
      const dishes = await getDishes();
      setDishList(dishes);
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

    const onClickDish = (id, name, price, desc, type) => {
        setCreate(false);
        setId(id);
        setName(name);
        setPreviousName(name);
        setPrice(price);
        setDesc(desc);
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

    const onClickDelete = async (id) => {
        const dish = await getOneCommandListByDish(id);
        if (dish === null) {
            await deleteDish(id);
            await deleteAllDishesDish(id);
            onClickNewDish();
            getDishList();
        }
        else toast.error("Le plat appartient à une commande, vous ne pouvez pas le supprimer.");
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
                    getDishList();
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
                        getDishList();
                    }
                    else toast.error("Ce nom existe déjà.");
                }
                else {
                    await updateDish(id, name, price, desc, type);
                    setPreviousName(name);
                    getDishList();
                }
            }

        } catch(err) {
            toast.error("Il y a eu une erreur.");
        }
    }


    // RENDER --------------------------------------------------------------

    return (
        <div className="admin-dishes">
            <div className="admin-dishes__left">
                <div className="left__dishes-list">
                    
                    <AllDishesList
                        dishList={dishList}
                        onClickDish={onClickDish}
                        onClickDelete={onClickDelete}
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
                        />
                        <label htmlFor="e">Entrée</label>
                        <input
                            type="radio"
                            value="Plat"
                            name="typePlat"
                            id="p"
                            checked={type === 'p'}
                        />
                        <label htmlFor="p">Plat</label>
                        <input
                            type="radio"
                            value="Dessert"
                            name="typePlat"
                            id="d"
                            checked={type === 'd'}
                        />
                        <label htmlFor="d">Dessert</label>
                    </div>
                    <InputText
                        value={name}
                        placeholder="Nom du plat*"
                        id="nomPlat"
                        divId="inputNomPlat"
                        handleChange={handleNameChange}
                    />
                    <InputText
                        value={price}
                        placeholder="Prix*"
                        id="prix"
                        divId="inputPrix"
                        handleChange={handlePriceChange}
                    /> 
                    <TextArea
                        value={desc}
                        placeholder="Description"
                        id="description"
                        required={false}
                        handleChange={handleDescChange}
                    />
                    <InputButton value={create? "Créer" : "Enregistrer"}/>
                </form>
            </div>
        </div>
    );
};

export default AdminDishes;