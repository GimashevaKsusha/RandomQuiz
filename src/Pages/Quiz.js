import React, { useState, useEffect } from 'react';
import './Quiz.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { Radio } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quiz() {
    const navigate = useNavigate();

    const size = 5;

    const [generate, setGenerate] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState(Array(size).fill(0));

    useEffect(() => {
        async function generateNewQuiz() {
            try {
                let url = `https://opentdb.com/api.php?amount=${size}&type=boolean`;
                let data =  await axios.get(url);
                setQuestions(data.data.results);
            }
            catch(e) {
                toast.error("Sorry... There are some problems with new quiz... Please try later");
            }
        }
        generateNewQuiz();
    }, [generate]);

    const getUserResults = () => {
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            let answer = questions[i].correct_answer === "True" ? 0 : 1;
            if (results[i] === answer) {
                count += 1;
            }
        }
        const currentState = {
            state: {
                result: count,
                max_result: size
            }
        };
        navigate('/result', currentState);
    }

    return (
        <div>
            <div className="quiz-container">
                <Button 
                    className="quiz-main-button" 
                    type="primary" 
                    onClick={() => {setGenerate(!generate)}}>
                    Generate new quiz
                </Button>
                <Button 
                    className="quiz-main-button" 
                    type="primary" 
                    onClick={() => {getUserResults()}}>
                    Send the results
                </Button>
                <br/>
                <div id="questions-container">
                    {questions.map((row, i) => {
                        return (
                            <div key={i}>
                                <p>
                                    {questions[i].question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'")}
                                </p>
                                <Radio.Group onChange={(e) => {setResults(results.fill(e.target.value, i, i + 1))}} defaultValue={results[i]}>
                                    <Radio value={0}>True</Radio>
                                    <Radio value={1}>False</Radio>
                                </Radio.Group>
                            </div>
                        )
                    })}
                </div>
                <br/>
            </div>
            <ToastContainer
                style={{ width: "auto" }}
                position="top-center"
                autoClose={2000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"/>
        </div>
    );
};