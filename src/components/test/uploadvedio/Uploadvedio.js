import React, {useCallback, useState, useRef, useEffect} from 'react'
import Webcam from 'react-webcam'
import {
    Card,
    Button,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from './Uploadvedio.module.css'


import Path from 'path'
import uploadFileToBlob, {isStorageConfigured} from './azure-vedio-storage';

const storageConfigured = isStorageConfigured();

const Uploadvedio = (props) => {
    
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const [blobList, setBlobList] = useState([]);

    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef])

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
            }
    }, [setRecordedChunks]);

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm"
          });


          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = "react-webcam-stream-capture.webm";
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      }, [recordedChunks]);


    const onFileUpload = async (file) => {
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file);

        // prepare UI for results
        setBlobList(blobsInContainer);

        // reset state/form
        setUploading(false);
    }

    // function upload() {
    //     const key = inputKey;

    //     onFileUpload(file);
        
    //     setInputKey(Math.random().toString(36));
    // }

    return (
        <article className={styles.container}>
            {/* <section>
                <h3>{props.data.question}</h3>
            </section> */}
            <section>
                <Webcam className={styles.vedio_section} audio={false} ref={webcamRef} />
            </section>
            <section className={styles.answer_section}>
                {capturing ? 
                    <Button  variant="contained" title="stop capture" onClick={handleStopCaptureClick} > Stop Capture </ Button> 
                    : <Button  variant="contained" title="start capture" onClick={handleStartCaptureClick}> Start Capture </ Button>}

                {recordedChunks.length > 0 && (
                    <Button variant="contained" title="start capture" onClick={handleDownload}>Download</Button>
                )}
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={props.onSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Uploadvedio