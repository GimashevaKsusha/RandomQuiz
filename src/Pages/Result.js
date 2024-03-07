import React from 'react';
import './Result.css';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'antd';

export default function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className="result-container">
                <img className="result-image-block" alt="congratulations" src="/congratulations.png"/><br/>
                <p className="result-text-block">
                    You scored {location.state.result} out of {location.state.max_result} points
                </p>
                <Button 
                    className="result-main-button" 
                    type="primary" 
                    onClick={() => {navigate('/', { state: location.state })}}>
                    Return to new quiz
                </Button>
            </div>
        </div>
    );
};