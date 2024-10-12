import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'; 
const { Content } = Layout;

function Dashboard() {
    const navigate = useNavigate();

    const startQuiz = () => {
        navigate('/quiz');
    };

    return (
        <Layout>
            <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <Row justify="center">
                    <Col span={12}>
                        <h1>Halloo</h1>
                        <p>Tekan tombol di bawah ini untuk memulai kuis.</p>
                        <Button type="primary" size="large" onClick={startQuiz}>
                            Mulai Kerjakan
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Dashboard;
