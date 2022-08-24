import React, {useCallback, useState, useRef} from 'react'
import Webcam from 'react-webcam'
import {
    Card,
    Button,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
// import speakerIcon from '../../assets/icon_audio.png'
import styles from './Handwriting.module.css'

const Handwriting = (props) => {
    
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <article className={styles.container}>
            <section>
                <Webcam className={styles.handwriting_image} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </section>
            <section className={styles.answer_section}>
                <Button onClick={capture}> Capture photo </Button>
                <section>
                    {imgSrc && <img className={styles.handwriting_image} src={imgSrc} alt="handwriting image"/>}
                </section>
            </section>
            <div style={{display:"flex"}}>
                <Button title="Submit" onClick={props.onSubmit} size="large" variant="contained" style={{width: "100%"}}>
                    Next
                </Button>
            </div>
        </article>
    )
}

export default Handwriting