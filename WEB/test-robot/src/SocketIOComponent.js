import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_WEBSOCKET;

const SocketIOComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);



  useEffect(() => {
    // Socket.IO 클라이언트 초기화 및 서버 연결
    const socketIo = io(SOCKET_SERVER_URL);
    setSocket(socketIo);
   
    socketIo.emit('joinOrCreateRoom', ['AA:11:BB:22:CC:33', 0]);
    socketIo.on('roomJoined', (room)=> {
    alert("room join");
    });
    // 서버로부터 메시지 수신 이벤트 핸들러
    socketIo.on('message', (message) => {
      setMessages((prev)=> [...prev,JSON.stringify(message)]);
	   
    });

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      socketIo.disconnect();
    };
  }, []);

 
  // 메시지 전송 함수
  const sendMessage = () => {
    if (socket) {
      socket.emit('message', {room : 'AA:11:BB:22:CC:33', datas : { type : 3, datas : [120,-40,10.0001,123456,0.0012,inputMessage]} } );
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>SENSOR DATA TESTER</h2>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocketIOComponent;

