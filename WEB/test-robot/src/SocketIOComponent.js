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
  const sendMessage = () => {
    if (socket) {
      socket.emit('message', {room : 'AA:11:BB:22:CC:33', datas : { type : 3, datas : [120,-40,10.0001,123456,0.0012,inputMessage]} } );
      setInputMessage('');
    }
  };

  const sendImage = () => {

//const imageUrl = 'https://images.unsplash.com/photo-1616486250774-dc4033b3bb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fGxhcmdlJTIwYnVpbGRpbmd8ZW58MHx8fHwxNjg4NjM2Mzkz&ixlib=rb-4.0.3&q=80&w=1080';
//alert(imageUrl);
  //  encodeImageFileAsURL(imageUrl).then((base64Data) => {
      // 웹소켓을 통해 base64 데이터 전송
      socket.emit('message', { room: 'AA:11:BB:22:CC:33', datas: { type: 2, datas: ['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgIB/7kUJtAAAAAASUVORK5CYII=', 'image/image.png'] } });
   // }).catch(error => {
    //  console.error('Error encoding file:', error);
    //});

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

