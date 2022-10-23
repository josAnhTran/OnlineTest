import { Button, Form, Input, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { io } from 'socket.io-client';

const socketServerUrl = 'http://localhost:9000';

const config = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 20,
  // transports: ['polling'],
};

let socket = io(socketServerUrl, config);
socket.on('connect', () => {
  console.log(`Socket is connected with id: ${socket.id}`);
});

export default function QuizTeacher() {
  const [username, setUsername] = React.useState('');
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    // SOCKET: LISTEN
    socket.on('server-message', (data) => {
      console.log('Message from server: ', data)
      if (data.type === 'quiz-answer') {
        const tmp = answers;
        tmp.push({userName: data.userName, option: data.option});

        setAnswers([...tmp]);
      }
    });
  }, []);

  const [form] = Form.useForm();

  return (
    <div>
      <Layout>
        <Content style={{ padding: 24 }}>
          <Button
          onClick={() =>{
            socket.emit('client-message', {
              type: 'quiz',
              question: {
                title: 'Chiến thắng Điện Biên Phủ vào năm nào? ',
                options: [
                  {text: 1945, isCorrect: false},
                  {text: 1955, isCorrect: false},
                  {text: 1935, isCorrect: false},
                  {text: 1954, isCorrect: true},
                ]
              }
            } )
          }}
          >
          Start
          </Button>
          { answers.map((a, index) => {
                return (
                  <div key={index}>xcx
                    <span>{a.userName} : </span>
                    <span>{a.option.isCorrect.toString()}</span>
                  </div>
                )
              })
          }
        </Content>
      </Layout>
    </div>
  );
}
