import React, { useState, useEffect } from 'react'; 
import { Layout, Card, Row, Col, Button, message } from 'antd';
import 'antd/dist/reset.css';
import '../index.css';
import axios from 'axios';

const { Content } = Layout;

function PilihanGanda() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [timeLeft, setTimeLeft] = useState(2400);
    const [isAnswered, setIsAnswered] = useState(false);
    const totalQuestions = 20;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://pacmann-frontend.pacmann.workers.dev/');
                setQuestions(response.data.data);
            } catch (error) {
                message.error('Failed to load questions from API');
            }
        };
      
        fetchQuestions();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerSelect = (label) => {
        setSelectedAnswer(label);
        setAnswerStatus(null);
        setIsAnswered(false);
    };

    const submitAnswer = () => {
        if (!selectedAnswer) {
            message.warning('Please select an answer');
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion || !currentQuestion.correctAnswer) {
            message.error('Question data is not loaded properly');
            return;
        }

        const correctAnswer = currentQuestion.correctAnswer;
        if (selectedAnswer === correctAnswer) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
        setIsAnswered(true);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setAnswerStatus(null);
            setIsAnswered(false);
        }
    };

    if (questions.length === 0) {
        return (
            <Layout>
                <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                    <Row justify="center">
                        <Col span={12}>
                            <Card>
                                <p>Loading questions...</p>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }

    const getButtonStyle = (option) => {
        if (isAnswered) {
            if (option.label === selectedAnswer && answerStatus === 'incorrect') {
                return { backgroundColor: 'red', color: 'white' };
            }
            if (option.label === questions[currentQuestionIndex].correctAnswer) {
                return { backgroundColor: 'green', color: 'white' };
            }
        }
        if (option.label === selectedAnswer) {
            return { backgroundColor: 'blue', color: 'white' };
        }
        return {};
    };

    return (
        <Layout>
            <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <Row justify="center">
                    <Col span={12}>
                        <Card>
                            <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                                <div>
                                    Time Left: <strong>{formatTime(timeLeft)}</strong>
                                </div>
                                <div>
                                    Question {currentQuestionIndex + 1}/{totalQuestions}
                                </div>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <h3>{questions[currentQuestionIndex].question}</h3>
                                </Col>
                                <Col span={12}>
                                    {questions[currentQuestionIndex].options.map((option) => (
                                        <Button
                                            key={option.label}
                                            block
                                            style={{ marginBottom: '10px', ...getButtonStyle(option) }}
                                            onClick={() => handleAnswerSelect(option.label)}
                                        >
                                            {option.label}. {option.value}
                                        </Button>
                                    ))}
                                </Col>
                            </Row>

                            <Row justify="center" style={{ marginTop: '20px' }}>
                                {isAnswered ? (
                                    <Button type="primary" onClick={nextQuestion}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button type="primary" onClick={submitAnswer} style={{ marginRight: '10px' }}>
                                        Submit Answer
                                    </Button>
                                )}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default PilihanGanda;
