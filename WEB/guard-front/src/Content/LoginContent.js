import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
import io from 'socket.io-client';
import PasswordChangeModal from './Modal/PasswordChangeModal';
import UsernameChangeModal from './Modal/UsernameChangeModal';
import DarkToggle from '../component/DarkToggle.js';
import Mapbox3DObject from '../mapbox/Mapbox3DObject.js';

const sizes = {
	desktop :1024,
	tablet : 768
};

const media = Object.keys(sizes).reduce((acc,label) => {
	acc[label] = (...args) => css`
	@media ( max-width: ${sizes[label] / 16}em) {
	${css(...args)};
	}
	`;
	return acc;
}, {});



const Items = styled.div`
width : 40%;
height : 40%;
${media.desktop`width:400px;`}
${media.tablet`width:80vw;`}
${media.desktop`height:400px;`}
${media.tablet`height:80vw;`}
flex-grow : 0;
flex-shrink : 0;
color : white;
overflow : hidden;
padding-bottom : 20%;
margin-bottom : 30px;
text-align :center;
border-radius : 30px;
background-color : ${props => props.dark == true ? '#555555' :  'rgb(241, 241, 241)'};
justify-content : center;
aligh-items : center;
`;


const Container = styled.div`
display : flex;
flex-wrap : wrap;
justify-content : space-evenly;
align-items : center;
padding : 10px;
width : 100vw;
background-color : ${(props) => (props.dark? 'gray' : 'white')};
`;

const socket = io(process.env.REACT_APP_SERVER_WEBSOCKET);

//const socket = io('http://localhost:5024');

const LoginContent = () => {
	const { state } = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);
const [controlData, setControlData] = useState([0,0,0]);
const [sensorData, setSensorData] = useState([]);
  
  const [roomStatus, setRoomStatus] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const joinOrCreateRoom = () => {
    socket.emit('joinOrCreateRoom', [user.MACid, 1]);
	  //alert(user.MACid)
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
	 
	  joinOrCreateRoom();
    socket.on('roomJoined', (room) => {
      setRoomStatus(`Joined room ${room} successfully`);
  //alert("socket")  
    });
	sendControlData();
	socket.on('message',(datas) => {
	const type = datas.type;
	
	if(type == 1){
		alert("send controlData");
	}
	if(type == 2){
	//alert('type2 : ', datas.datas);
		setBase64Image(datas.datas[0]);
		//setBase64Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
	//alert(datas.datas[0]);
	//alert(base64Image);
	}
	if(type == 3){
	//alert('type3 : ');
		//alert(JSON.stringify(datas.datas));
	setSensorData(prev=> [...prev, JSON.stringify(datas.datas)])
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
		<UsernameChangeModal MACid={user.MACid} isOpen={user.UsernameModal} onClose={() => setUser((prev) => ({...prev, UsernameModal : false}))}/>
		<PasswordChangeModal MACid={user.MACid} isOpen={user.pwModal} onClose={()=> setUser((prev) => ({...prev, pwModal : false}))}/>
		<Items onClick={imageFlag} dark={user.dark} color={state.color}>
		{base64Image ?	<img src={`data:image/png;base64,${base64Image}`} style={{width : '100%', height : '100%'}}/> : 'loading' }
			</Items>
		<Items dark={user.dark} color={state.color}>
		지도
		</Items>
		
		<Mapbox3DObject latitude={37} longitude={127} altitude={0}/>
		<Items dark={user.dark} color={state.color}>
		log
		{sensorData.map((con, idx) => (
			<div key={idx}>
			{JSON.stringify(con)}
			</div>
		))}
	<div>
	{roomStatus}
      </div>
		</Items>
		<Items dark={user.dark} color={state.color}>
		<button onClick={sendControlData}>data send</button>
		</Items>
		<DarkToggle/>
		</Container>
	)
}
export default LoginContent;
