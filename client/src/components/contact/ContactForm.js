import React, { useRef } from 'react';
import InputText from '../generic/InputText';
import InputButton from '../generic/InputButton';
import InputEmail from '../generic/InputEmail';
import TextArea from '../generic/TextArea';
import emailjs from 'emailjs-com';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const form = useRef();
    
    let day = moment(new Date()).locale('fr').format+('LL');
    let time = moment(new Date()).locale('fr').format('LTS');
    
    let emailValid = false;
    let nameValid = false;
    
    const handleChange = (e) => {
        let mailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
        let nameRegex = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`']+$/;

        switch (e.target.id) {
            case 'email': {
                if(e.target.value.match(mailRegex) || e.target.value === "") {
                    document.getElementById("inputEmailDiv").classList.remove("input-email--invalid");
                    emailValid = true;
                }
                else {
                    document.getElementById("inputEmailDiv").classList.add("input-email--invalid");           
                    emailValid = false;
                }         
                break;       
            }
            case 'name': {
                if(e.target.value.match(nameRegex) || e.target.value === "") {
                    document.getElementById("inputNameDiv").classList.remove("input--invalid");
                    nameValid = true;
                }
                else {
                    document.getElementById("inputNameDiv").classList.add("input--invalid");
                    nameValid = false; 
                }
                break;
            }            
            default: 
                break;
        }
    }   

    const sendEmail = (e) => {
        e.preventDefault();     

        const notifyEmail = () => 
            toast.error('L\'adresse email saisie est incorrecte.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });
        
        const notifyName = () => 
            toast.error('Le nom saisi est incorrect, il ne peut contenir des caractères numériques ou spéciaux.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });

        const notifyValidation = () => 
            toast.success('Votre message a été envoyé avec succès !', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });

        if (!nameValid && !emailValid) {
            notifyName();
            notifyEmail();   
        }
        else if (!emailValid) {
            notifyEmail();
        }
        else if (!nameValid) {
            notifyName();
        }
        
        if (nameValid && emailValid){            
            // emailjs.sendForm('service_yp9mjg9', 'lycee_template', form.current, 'user_kJVhkhpgVxlSmIHEaC2pI');
            notifyValidation();
            e.target.reset();
        }
    }

    return (
        <>
            <form className="contact__form" onSubmit={sendEmail} ref={form}>
                <div className="contact__input">
                    <div className="input__name-email">
                        <InputText id="name" divId="inputNameDiv" placeholder="Nom" handleChange={handleChange} />
                        <InputEmail id="email" placeholder="Email" handleChange={handleChange} />
                    </div>
                    <InputText id="subject" divId="inputsubjectDiv" placeholder="Objet" handleChange={handleChange} />
                    <TextArea id="msg" placeholder="Message" handleChange={handleChange} />
                    <div className="input__btn">
                        <InputButton value="Envoyer le message" />
                    </div>
                    <div className="hidden">
                        <input name="day" value={day}/>
                        <input name="time" value={time}/>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    );
}

export default ContactForm;