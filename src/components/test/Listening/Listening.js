import React, {useEffect, useState, useRef} from 'react'
import {
    Button,
    TextField,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import speakerIcon from '../../../assets/icon_audio.png'
import styles from './Listening.module.css'

const synth = window.speechSynthesis;

const getIndianVoices = () => {
    return synth.getVoices().filter(data => data.lang.includes("IN"))
}

const handlePlayAudio = (message) => {
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.rate = 0.7;
    utterThis.voice = getIndianVoices().filter(val => val.name === "Rishi")[0]
    synth.speak(utterThis)
}

const Listening = (props) => {
    const inputRef = useRef(null);

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value?.toLowerCase()
        const targetText = props.data.answer.toLowerCase()
        return inputText === targetText
    }

    const handleSubmit = ()=>{
        props.saveData("questions", {
            [props.index]: {
                ...props.data,
                userResponse: inputRef.current.value?.toLowerCase(),
                isUserResponseValid: handleAnswerCheck()
            }
        })

        //clear text field
        console.log(inputRef.current.value)
        inputRef.current.value = ""

        props.onSubmit()
    }
    console.log(synth.getVoices(),getIndianVoices())

    //fixed multiple rerendering issues
    useEffect(()=>{
        const id = setTimeout(()=>{
            handlePlayAudio(props.data.title);
        },300);

        const id2 = setInterval(()=>{
            if(!synth.speaking){
                setTimeout(()=>{
                    console.log('instruction started playing')
                    handlePlayAudio(props.data.instruction);
                },900)
                clearInterval(id2)
            }
        },301)

        return () => {
            clearTimeout(id);
            clearInterval(id2);
        }
    },[props.data])

    return (
        <article className={styles.container}>
            <section>
                <Button onClick={() => handlePlayAudio(props.data.title)}>
                    <img className={styles.speaker_icon} src={speakerIcon} alt="speaker icon"/>
                </Button>
            </section>
            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <TextField type="text" inputRef={inputRef}/>
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={handleSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Listening
export {handlePlayAudio}