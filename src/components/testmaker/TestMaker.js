import React, { useState } from 'react'
import styles from './TestMaker.module.css'
import { styled } from '@mui/material/styles';
import {
    Card,
    Button,
    Container,
} from "@mui/material";
import { getData, storeData } from '../../utils/storageManager'

//styles
const Header = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "10vh",
    padding: "8px",
}));

const QuestionTemplateContainer = styled('div')(({ theme }) => ({
    display: "flex",
    height: "30vh",
    padding: "8px",
}));

const ComponentContainer = styled('div')(({ theme }) => ({
    display: "flex",
    height: "80vh",
    padding: "8px",
}));



const TestMaker = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    function handleUpdateQuestion(type) {
        if (type == "prev") {
            if (currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
            }
        } else {
            // for next
            if (currentQuestion < props.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            }
        }
    }

    const updateTestData = (key, new_data) => {
        if (!props.details.name) {
            alert("Please provide proper test name");
            return;
        }
        const old_data = getData(props.details.name)
        const updated_data = { ...old_data, [key]: { ...old_data[key], ...new_data } };
        storeData(props.details.name, updated_data);

        console.log("Saved Data",updated_data)
    }

    return (
        <Container maxWidth="xl">
            <Header >
                <h3>
                    {props.details.name}
                </h3>

                <QuestionTemplateContainer>
                    <span> Question {currentQuestion + 1} of {props.questions.length} </span>
                </QuestionTemplateContainer>



            </Header>

            <ComponentContainer style={{ display: "flex", flexDirection: "column", }}>
                {<props.testComponent 
                    data={props.questions[currentQuestion]}
                    onSubmit={handleUpdateQuestion}
                    saveData={updateTestData}
                    index={currentQuestion}
                />}
            </ComponentContainer>


        </Container>
    )
}

export default TestMaker
