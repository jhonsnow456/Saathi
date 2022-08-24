import React, {useCallback, useState, useRef, useEffect} from 'react'
import Webcam from 'react-webcam'
import Button from '../../ui/Button'
// import speakerIcon from '../../assets/icon_audio.png'
import styles from './Handwriting.module.css'

const Handwriting = (props) => {
    
    const webcamRef = useRef(null);
    const [imgVisible, setImageVisible] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    useEffect(()=>{
        setImageVisible(false);
    },[props.data])

    useEffect(() => {
        setImageVisible(true);
    }, [imgSrc])

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
                <Button title="capture photo" onClick={capture}/>
                <section>
                    {imgVisible && imgSrc && <img className={styles.handwriting_image} src={imgSrc} alt="handwriting image"/>}
                </section>
            </section>
        </article>
    )
}

export default Handwriting