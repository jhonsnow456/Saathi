import React, {useCallback, useState, useRef, useEffect} from 'react'
import Webcam from 'react-webcam'
import {
    Card,
    Button,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
// import speakerIcon from '../../assets/icon_audio.png'
import styles from './Handwriting.module.css'


import Path from 'path'
import uploadFileToBlob, {isStorageConfigured} from './azure-handwriting-storage';

const storageConfigured = isStorageConfigured();

const Handwriting = (props) => {
    
    const webcamRef = useRef(null);

    const [blobList, setBlobList] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);


    const onFileUpload = async (file) => {
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file);

        // prepare UI for results
        setBlobList(blobsInContainer);

        // reset state/form
        setUploading(false);
    }

    const dataURLtoFile = (dataurl, filename) => {
 
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    function upload() {
        const key = inputKey + '.jpg';
        const file = dataURLtoFile(imgSrc, key)

        onFileUpload(file);
        
        setInputKey(Math.random().toString(36));
    }

    return (
        <article className={styles.container}>
            <section>
                <h3>{props.data.question}</h3>
                {(props.data.image === "") ? "" : <img className={styles.handwriting_image} src={props.data.image} alt="handwriting image"/>}
            </section>
            <section>
                <Webcam className={styles.handwriting_image} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </section>
            <section className={styles.answer_section}>
                <Button  variant="contained" title="capture photo" onClick={capture} > Capture </ Button>
                <Button  variant="contained" title="Upload" onClick={upload}> Upload </ Button>
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={props.onSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Handwriting