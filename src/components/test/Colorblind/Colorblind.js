import React, {useEffect, useState, useRef} from 'react'
import {
    Card,
    Button,
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    MenuItem,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
// import speakerIcon from '../../assets/icon_audio.png'
import styles from './Colorblind.module.css'

const Colorblind = (props) => {
    const [questionStatus, setQuestionStatus] = useState(false);
    const inputRef = useRef(null);

    console.log(props.data);

    function checkVision(inputText, targetText) {
        console.log(inputText, targetText.normalView);
        let data = []
        let vision = targetText;
            
            if (inputText == vision.normalView){
                console.log(inputText, targetText.normalView);
                data.push(["normal vision", vision.normalView]);
            }else{
                let colorblindVision = vision.colorBlind

                console.log(colorblindVision);

                if (inputText == colorblindVision.RG){
                    data.push(["color blind", colorblindVision.RG])
                }else if (inputText == colorblindVision.protonopia){
                    data.push(["color blind", colorblindVision.protonopia])
                }else if (inputText == colorblindVision.deutonopia){
                    data.push(["color blind", colorblindVision.deutonopia])
                }
            }

        return data
    }

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value
        const targetText = props.data.vision

        const result = checkVision(inputText, targetText);

        alert(inputText == result[0][1]);
        setQuestionStatus(inputText == targetText)
    }

    //fixed multiple rerendering issues
    // useEffect(()=>{
    //     const id = setTimeout(()=>{
    //         handlePlayAudio();
    //         console.log("hero")
    //     },300);
    //     console.log("heroo")

    //     return () => clearTimeout(id)
    // },[props.data])

    return (
        <article className={styles.container}>
            <section>
                <img className={styles.ishihara_image} src={props.data.image} alt="ishihara image"/>
            </section>
            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <TextField type="number" inputRef={inputRef}/>
                <Button variant="contained" onClick={handleAnswerCheck} title="Check Answer"> Capture </Button>
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={props.onSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Colorblind