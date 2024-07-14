import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
import io from 'socket.io-client';
import PasswordChangeModal from './Modal/PasswordChangeModal'

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
  const [base64Image, setBase64Image] = useState('');
  const joinOrCreateRoom = () => {
    socket.emit('joinOrCreateRoom', [user.MACid, 1]);
	  alert(user.MACid)
  };


const sendControlData = () => {
	socket.emit('message',{room : user.MACid, datas : {type : 1, datas : controlData}});
}

const imageFlag = () => {
setControlData((prev) => {
const newPrev = [...prev];
	newPrev[0] = 1;
	return newPrev;
});

	setTimeout(() => {
setControlData((prev) => {
const reversePrev = [...prev];
	reversePrev[0] = 0;
	return reversePrev;
});
	} , 10000);
};

  useEffect(() => {
	  alert('socket');
	  joinOrCreateRoom();
    socket.on('roomJoined', (room) => {
      setRoomStatus(`Joined room ${room} successfully`);
    alert('socketon');
    });
	sendControlData();
	socket.on('message',(datas) => {
	const type = datas.type;
	
	if(type == 1){
		alert("send controlData");
	}
	if(type == 2){
	alert('type2 : ', datas.datas);
		setBase64Image(datas.datas[0]);
		//setBase64Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
	alert(datas.datas[0]);
	alert(base64Image);
	}
	if(type == 3){
	alert('type3 : ',datas.datas);
	}
	});
	  
    socket.on('error', (message) => {
      setRoomStatus(`Error: ${message}`);
    });

    return () => {
      socket.off('message');
      socket.off('roomJoined');
      socket.off('error');
    };
  }, []);



	return (
		<Container dark={user.dark}>
		<PasswordChangeModal isOpen={user.pwModal} onClose={()=> setUser((prev) => ({...prev, pwModal : false}))}/>
		<Items onClick={imageFlag} dark={user.dark} color={state.color}>
		<img src={`data:image/png;base64,${base64Image}`} style={{width : '50px', height : '50px'}}/>
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
		<button onClick={sendControlData}>data send</button>
		</Items>
		</Container>
	)
}
export default LoginContent;
