import { Button, TextField } from '@mui/material';
import React, {useState} from 'react'
import styles from './StoryMaker.module.css'
import speakerIcon from '../../assets/icon_audio.png'
import { handlePlayAudio } from '../test/Listening/Listening';
import { storeData, getData } from 'src/utils/storageManager';

const RenderQuestion = (props) => {
    if(props.data.type == "options"){
        return (
            <div>
                <div>
                    <h3>Question:</h3>
                    <h2>{props.data.title}</h2>
                </div>
                <div>
                    <fieldset>
                        <legend>Select a option</legend>
                        {props.data.options.map((val) => (
                            <label className={styles.label}>
                                <input type="radio" name="question"/>
                                {" " + val}
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>
        )
    }

    else if(props.data.type == "voice"){
        return (
            <div>
                <div>
                    <h3>Question:</h3>
                    <Button onClick={() => handlePlayAudio(props.data.title)}>
                        <img className={styles.speaker_icon} src={speakerIcon} alt="speaker icon"/>
                    </Button>
                </div>
                <div>
                    <TextField type="text" />
                </div>
            </div>
        )
    } else if(props.data.type == "options_image"){
        return (
            <div>
                <div>
                    <h3>Question:</h3>
                    <h2>{props.data.title}</h2>
                </div>
                <div>
                    <fieldset>
                        <legend>Select a option</legend>
                        {props.data.options.map((val) => (
                            <label className={styles.label}>
                                <input type="radio" name="question"/>
                                <img src={val.image.default} className={styles.option_image}/>
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>
        )
    }

    return null
}

const StoryMaker = (props) => {
    const [sectionType, setSectionType] = useState("pictures")
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentPicture, setCurrentPicture] = useState(0);
    console.log(props)

    const handleNextPicture = ()=>{
        if(currentPicture < props.data.length - 1){
            setCurrentPicture(prev => prev + 1);
        } else if(currentPicture === props.data.length - 1){
            setSectionType("questions")
        }
    }
    
    const handleNextQuestion = () => {
        if(currentQuestion < props.questions.length - 1){
            setCurrentQuestion(prev => prev + 1);
        }
    }

    return (
        <article className={styles.article}>
            <section className={styles.header}>
                <div>
                    {props.details.name}
                </div>
                <div>
                    <Button variant='contained' style={{backgroundColor:'tomato'}} onClick={sectionType == "pictures" ? handleNextPicture : handleNextQuestion}>Next</Button>
                </div>
            </section>
            <section className={styles.questionNumbers}>
                {sectionType === "pictures" ? 
                    <span>Picture {currentPicture + 1} of {props.data.length} Pictures.</span>
                    : <span>Question {currentQuestion + 1} of {props.questions.length} Questions.</span>
                }
            </section>
            <section className={styles.container}>
                {   sectionType === "pictures" 
                    ? <img src={props.data[currentPicture].image.default} className={styles.image}/>
                    : <RenderQuestion data={props.questions[currentQuestion]} />
                }
            </section>
        </article>
    )
}

export default StoryMaker;