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
const [controlData, setControlData] = useState([0,0,0]);

  const [roomStatus, setRoomStatus] = useState('');

  const joinOrCreateRoom = () => {
    socket.emit('joinOrCreateRoom', [user.MACid, 1]);
	  alert(user.MACid)
  };


const sendControlData = () => {
	socket.emit('message',{room : user.MACid, datas : controlData});
}
  useEffect(() => {
	  alert('socket');
	  joinOrCreateRoom();
    socket.on('roomJoined', (room) => {
      setRoomStatus(`Joined room ${room} successfully`);
    alert('socketon');
    });
	sendControlData();
    socket.on('error', (message) => {
      setRoomStatus(`Error: ${message}`);
    });

    return () => {
      socket.off('roomJoined');
      socket.off('error');
    };
  }, []);



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
	{roomStatus}
      </div>
		</Items>
		<Items dark={user.dark} color={state.color}>
		컨트롤러
		</Items>
		</Container>
	)
}
export default LoginContent;
