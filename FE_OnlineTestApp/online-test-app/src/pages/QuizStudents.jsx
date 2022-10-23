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

export default function QuizStudents() {
  const [username, setUsername] = React.useState(null);
  const [question, setQuestion] = React.useState(null);

  React.useEffect(() => {
    // SOCKET: LISTEN
    socket.on('server-message', (data) => {
      console.log('Message from server: ', data)
      if (data.type === 'quiz') {
        setQuestion(data.question)
      }
    });
  }, []);

  const [form] = Form.useForm();

  return (
    <div>
      <Layout>
        <Content style={{ padding: 24 }}>
        {
          question && (
            <div>
              <h1>QUIZ</h1>
              <h3>{question.title}</h3>
              <div style={{display:'flex', flexDirection: 'column', gap: 8}}>
              {
                question.options.map((option, index) =>{
                  return (
                    <Button 
                    key={'option-' + index}
                    onClick={()=>{
                      socket.emit('client-message', {
                        type:'quiz-answer',
                        userName: 'josAnh',
                        option
                      })
                    }}
                    >
                    {option.text}
                    </Button>
                  )
                })
              }
              </div>
            
            </div>
          )
        }
        </Content>
      </Layout>
    </div>
  );
}
