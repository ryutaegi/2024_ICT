import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
import io from 'socket.io-client';

const Items = styled.div`
width : 40%;
flex-grow : 0;
flex-shrink : 0;
color : white;
padding-bottom : 20%;
text-align :center;
background-color : ${props => props.dark == true ? '#555555' :  props.color};
justify-content : center;
aligh-items : center;
`;


const Container = styled.div`
display : flex;
flex-wrap : wrap;
justify-content : space-evenly;
align-items : center;
padding : 10px;
width : 100%;
background-color : ${(props) => (props.dark? 'gray' : 'white')};
`;

const socket = io(process.env.REACT_APP_SERVER_WEBSOCKET);


const LoginContent = () => {
	const { state } = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);

const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', input);
    setInput('');
  };
	return (
		<Container dark={user.dark}>
		<Items dark={user.dark} color={state.color}>
		영상(클릭하면 ..))
		</Items>
		<Items dark={user.dark} color={state.color}>
		지도
		</Items>
		<Items dark={user.dark} color={state.color}>
		로그
	<div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
		</Items>
		<Items dark={user.dark} color={state.color}>
		컨트롤러
		</Items>
		</Container>
	)
}
export default LoginContent;
