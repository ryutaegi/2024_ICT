import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {base64Image} from './imagebase64.js'
const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_WEBSOCKET;

const SocketIOComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);



  useEffect(() => {
    // Socket.IO 클라이언트 초기화 및 서버 연결
    //alert(SOCKET_SERVER_URL)
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

 	 
const encodeImageFileAsURL = (url) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]); // base64 데이터만 추출
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      });
    }; 
	 
  // 메시지 전송 함수
  const sendMessage1 = () => {
    if (socket) {
      socket.emit('message', {room : 'AA:11:BB:22:CC:33', datas : { type : 3, datas : [127.07691,37.632,3,10.1,10,inputMessage]} } );
      setInputMessage('');
    }
  };
const sendMessage2 = () => {
    if (socket) {
      socket.emit('message', {room : 'AA:11:BB:22:CC:33', datas : { type : 3, datas : [127.07691, 37.63160,2.3,10.1,10,inputMessage]} } );
      setInputMessage('');
      setInputMessage('');
    }
  };


  const sendImage = () => {

      // 웹소켓을 통해 base64 데이터 전송
      socket.emit('message', { room: 'AA:11:BB:22:CC:33', datas: { type: 2, datas: [base64Image, 'image/image.png'] } });

  };	

  return (
    <div>
      <h2>DATA TESTER</h2>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage1}>Send1</button>
        <button onClick={sendMessage2}>Send2</button>
      <button onClick={sendImage}>imageSend</button>
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

