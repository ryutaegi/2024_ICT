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
import VerticalSlider from '../component/VerticalSlider.js';
const sizes = {
	desktop :1024,
	tablet : 768
};

const media = Object.keys(sizes).reduce((acc,label) => {
	acc[label] = (...args) => css`
	@media ( min-width: ${sizes[label] / 16}em) {
	${css(...args)};
	}
	`;
	return acc;
}, {});



const Items = styled.div`
width : ${props => props.isMobile == true ? '80vw' : '40vw'};
height : ${props => props.isMobile == true ? '80vw' : '42vh'};
color : white;
overflow : hidden;
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

const KeyButton = styled.div`
display : flex;
width : 60px;
height : 20%;
margin : 3px;
background-color : ${props => props.keys == 'x' ? 'none' : props.pushed == false ? props.colors : props.pushedcolors };
font-size : 20px;
justify-content : center;
align-items : center;
text-align : center;
border-radius : 20%;
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
const [pressedKey, setPressedKey] = useState('');

const joinOrCreateRoom = () => {
    socket.emit('joinOrCreateRoom', [user.MACid, 1]);
	  //alert(user.MACid)
	  //alert(user.isMobile)
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

	  const handleKeyUp = (event) => {
    //  alert(`Key up: ${event.key}`);
		  setPressedKey('');
    };

	  const handleKeyDown = (event) => {
    //  alert(`Key pressed: ${event.key}`);
		  setPressedKey(event.key);
    };
  window.addEventListener('keydown', handleKeyDown);

  window.addEventListener('keyup', handleKeyUp);

    return () => {
	    window.removeEventListener('keydown', handleKeyDown);
	    window.removeEventListener('keyup', handleKeyUp);
      socket.off('message');
      socket.off('roomJoined');
      socket.off('error');
    };
  }, []);

const [coords, setCoords] = useState({ latitude: 37.57796, longitude: 126.97658 });

  const updatePosition = () => {
    setCoords({ latitude: 37.57800, longitude: 126.97700 });
  };

	return (
		<Container dark={user.dark}>
		<UsernameChangeModal MACid={user.MACid} isOpen={user.UsernameModal} onClose={() => setUser((prev) => ({...prev, UsernameModal : false}))}/>
		<PasswordChangeModal MACid={user.MACid} isOpen={user.pwModal} onClose={()=> setUser((prev) => ({...prev, pwModal : false}))}/>
		<Items isMobile={user.isMobile} onClick={imageFlag} dark={user.dark} color={state.color}>
		{base64Image ?	<img src={`data:image/png;base64,${base64Image}`} style={{width : '100%', height : '100%'}}/> : 'loading' }
			</Items>
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		지도

		<Mapbox3DObject latitude={coords.latitude} longitude={coords.longitude} altitude={10}/>
		</Items>
		<button onClick={updatePosition}>위치 변경</button>
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
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
		
		<button onClick={sendControlData}>data send</button>
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		<div style={{display : 'flex', flexDirection : 'row', justifyContent : "center", paddingTop : "8%"}}>
		<VerticalSlider type={"F/B"}/>
		
		<div style={{FlexDirection : "column", marginTop : "10%"}}>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 'a' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,180,180)"}>
		left
		</KeyButton>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		</div>
		
		<div style={{FlexDirection : "column", marginTop : "10%"}}>
		<KeyButton keys={"d"} pushed={pressedKey == 'w' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,180,180)"}>
		front
		</KeyButton>

		<KeyButton keys={"d"} pushed={pressedKey == '' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,180,180)"}>
		stop
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 's' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,180,180)"}>
		back
		</KeyButton>
		</div>

		<div style={{FlexDirection : "column",marginTop : "10%"}}>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 'd' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,180,180)"}>
		right
		</KeyButton>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		</div>


		<VerticalSlider type={"L/R"}/>	
		</div>
		</Items>
		<DarkToggle/>
		</Container>
	)
}
export default LoginContent;
