import React, {useEffect, useState, useRef} from 'react'
import Button from '../ui/Button'
import speakerIcon from '../../assets/icon_audio.png'
import styles from './Listening.module.css'

const Listening = (props) => {
    const [questionStatus, setQuestionStatus] = useState(false);
    const inputRef = useRef(null);

    const handlePlayAudio = () => {
        const synth = window.speechSynthesis;
        const text = props.data.title
        const utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis)
    }

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value?.toLowerCase()
        const targetText = props.data.title.toLowerCase()
        setQuestionStatus(inputText == targetText)
    }

    //fixed multiple rerendering issues
    useEffect(()=>{
        const id = setTimeout(()=>{
            handlePlayAudio();
            console.log("hero")
        },300);
        console.log("heroo")

        return () => clearTimeout(id)
    },[props.data])

    return (
        <article className={styles.container}>
            <section>
                <Button onClick={handlePlayAudio}>
                    <img className={styles.speaker_icon} src={speakerIcon} alt="speaker icon"/>
                </Button>
            </section>
            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <input type="text" ref={inputRef}/>
                <Button onClick={handleAnswerCheck} title="Check Answer"/>
            </section>
        </article>
    )
}

export default Listening