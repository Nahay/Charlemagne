import React, { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
// import emailjs from 'emailjs-com';

import InputText from '../generic/InputText';
import InputButton from '../generic/InputButton';
import InputEmail from '../generic/InputEmail';
import TextArea from '../generic/TextArea';


const ContactForm = () => {
    
    let day = moment(new Date()).locale('fr').format('LL');
    let time = moment(new Date()).locale('fr').format('LTS');
    const nameReg = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'-]+$/;
    const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // RESET VALUES -----------------------------------------------------

    const resetValues = () => {
        setEmail("");
        setName("");
        setMessage("");
        setSubject("");
    }

    // HANDLE -------------------------------------------------------------------------------------------

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleNameChange = (e) => {
        const val = e.target.value;
        if (nameReg.test(val) || val === "") setName(val);
    }
    
    const handleSubjectChange = (e) => setSubject(e.target.value);

    const handleMessageChange = (e) => setMessage(e.target.value);

    const sendEmail = (e) => {
        e.preventDefault();
        if (emailReg.test(email)) {
            // emailjs.sendForm('service_yp9mjg9', 'lycee_template', form.current, 'user_kJVhkhpgVxlSmIHEaC2pI');
            toast.success("Votre message a été envoyé avec succès !");
            resetValues();
        }
        else toast.error("L'adresse email saisie est incorrecte.");
    }

    return (
        <>
            <form className="contact__form" onSubmit={sendEmail}>
                <div className="contact__input">
                    <div className="input__name-email">
                        <InputText
                            value={name}
                            placeholder="Nom*"
                            id="name"
                            handleChange={handleNameChange}
                        />
                        <InputEmail value={email} id="email" placeholder="Email*" handleChange={handleEmailChange} />
                    </div>
                    <InputText value={subject} id="subject" divId="inputsubjectDiv" placeholder="Objet*" handleChange={handleSubjectChange} />
                    <TextArea value={message} id="msg" placeholder="Message*" handleChange={handleMessageChange} />
                    <div className="input__btn">
                        <InputButton value="Envoyer le message" />
                    </div>
                    <div className="hidden">
                        <input name="day" value={day}/>
                        <input name="time" value={time}/>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ContactForm;