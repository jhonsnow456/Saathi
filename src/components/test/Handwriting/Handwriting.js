import React, {useCallback, useState, useRef} from 'react'
import Webcam from 'react-webcam'
import Button from '../../ui/Button'
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
        </article>
    )
}

export default Handwriting