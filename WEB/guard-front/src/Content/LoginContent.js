import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
import io from 'socket.io-client';
import PasswordChangeModal from './Modal/PasswordChangeModal';
import UsernameChangeModal from './Modal/UsernameChangeModal';
import DarkToggle from '../component/DarkToggle.js';
import Map3DObject from '../map/Map3DObject.js';
import VerticalSlider from '../component/VerticalSlider.js';
import LogComponent from '../component/LogComponent';
import HorizontalToggle from '../component/HorizontalToggle';
import RealTimeChart from '../component/RealTimeChart'
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
  display: flex;
  width: 60px;
  height: 60px;
  margin: 5px;
  background: ${props => props.keys == 'x' ? 'transparent' : props.pushed == false ? props.colors : props.pushedcolors};
  background-image: ${props => props.keys != 'x' && props.pushed == false ? 'linear-gradient(145deg, #f0f0f0, #cacaca)' : 'none'};
  font-size: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
  box-shadow: ${props => props.keys == 'x' ? 'none' : (props.pushed == false ? '4px 4px 8px rgba(0, 0, 0, 0.2)' : 'inset 2px 2px 5px rgba(0, 0, 0, 0.3)')};
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:active {
    background-color: ${props => props.pushedcolors};
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;
const socket = io(process.env.REACT_APP_SERVER_WEBSOCKET);

//const socket = io('http://localhost:5024');

const LoginContent = () => {
	const { state } = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);
const [controlData, setControlData] = useState([50,50,0,0,0]);
const [sensorData, setSensorData] = useState([]);
const [chartData1, setChartData1] = useState([]); 
const [chartData2, setChartData2] = useState([]);
const [chartData3, setChartData3] = useState([]);

const [roomStatus, setRoomStatus] = useState('');
const [base64Image, setBase64Image] = useState('');
const [pressedKey, setPressedKey] = useState('');

const [coords, setCoords] = useState({ latitude: 37.63160, longitude: 127.075, yaw : 0  });
const joinOrCreateRoom = () => {
    socket.emit('joinOrCreateRoom', [user.MACid, 1]);
	  //alert(user.MACid)
	  //alert(user.isMobile)
  };



const sendControlData = () => {
	let sendData = [...controlData];
 //alert(JSON.stringify(controlData))
	if(pressedKey == ''){ //stop
	sendData[0] = 0;
	sendData[1] = 0;
	}
	if(pressedKey == 'a'){ //left
	sendData[0] = 0;
	sendData[1] = parseInt(sendData[1]) * (-1)
	}
	if(pressedKey == 'd'){
	sendData[0] = 0;
	}
	if(pressedKey == 'w'){
	sendData[1] = 0;
	}
	if(pressedKey == 's'){
	sendData[0] = parseInt(sendData[0]) * (-1)
	sendData[1] = 0;
	}

	socket.emit('message',{room : user.MACid, datas : {type : 1, datas : sendData}});
//alert(JSON.stringify(sendData))
}



  useEffect(() => {
	 
	  joinOrCreateRoom();
    socket.on('roomJoined', (room) => {
      console.log(`Joined room ${room} successfully`);
  //alert("socket")  
    });
	sendControlData();
	socket.on('message',(datas) => {
	const type = datas.type;
	
		//if(type == 1){
		//alert("send controlData");
	//}
	if(type == 2){
	//alert('type2 : ', datas.datas);
		setBase64Image(datas.datas[0]);
	//alert(datas.datas[0]);
	//alert(base64Image);
	}
	if(type == 3){
	//alert('type3 : ');
		//alert(JSON.stringify(datas.datas));
	setSensorData(prev=> [...prev, JSON.stringify(datas.datas)])
	setChartData1(prev=> [...prev, [datas.datas[4], datas.datas[9]]])
	setChartData2(prev=> [...prev, [datas.datas[3], datas.datas[10]]])
	setChartData3(prev=> [...prev, [datas.datas[13], datas.datas[14]]])
	setCoords({longitude : datas.datas[0], latitude : datas.datas[1], yaw : datas.datas[2]});
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

useEffect(() => {
  const interval = setInterval(() => {
		  sendControlData();
	  },20)
	 
	return () => {
clearInterval(interval);
	}
}, [controlData, pressedKey]);



  const updatePosition = () => {
    setCoords({ latitude: 37.63160, longitude: 127.07691, yaw : 0.6 });
  };
const initialData = [10, 20, 30]; // 초기 데이터
  const initialLabels = ['10:00', '10:01', '10:02']; // 초기 라벨
  const updateInterval = 2000; // 2초마다 업데이트

	return (
		<Container dark={user.dark}>
		<UsernameChangeModal MACid={user.MACid} setUser={setUser} isOpen={user.UsernameModal} onClose={() => setUser((prev) => ({...prev, UsernameModal : false}))}/>
		<PasswordChangeModal MACid={user.MACid} isOpen={user.pwModal} onClose={()=> setUser((prev) => ({...prev, pwModal : false}))}/>
		<Items isMobile={user.isMobile} dark={user.dark} color={state.color}>
		{base64Image ?	<img src={`data:image/png;base64,${base64Image}`} style={{width : '100%', height : '100%'}}/> : 'loading' }
			</Items>
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		지도

		<Map3DObject latitude={coords.latitude} longitude={coords.longitude} yaw={coords.yaw}/>
		</Items>
		
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		<RealTimeChart data={initialData} labels={initialLabels} updateInterval={updateInterval} />
		</Items>

		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		log
		{JSON.stringify(chartData1)}
		<LogComponent sensorData={sensorData}/>
	<div>
	{roomStatus}
      </div>
		</Items>
		
		<Items dark={user.dark} color={state.color} isMobile={user.isMobile}>
		<div style={{display : 'flex', flexDirection : 'row', justifyContent : "center", paddingTop : "8%"}}>

		<VerticalSlider controlData={controlData} setControlData={setControlData} type={"F/B"}/>	
		
		<div style={{FlexDirection : "column", marginTop : "10%"}}>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 'a' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,150,150)"}>
		left
		</KeyButton>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		</div>
		
		<div style={{FlexDirection : "column", marginTop : "10%"}}>
		<KeyButton keys={"d"} pushed={pressedKey == 'w' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,150,150)"}>
		front
		</KeyButton>

		<KeyButton keys={"d"} pushed={pressedKey == '' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,100,100)"}>
		stop
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 's' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,150,150)"}>
		back
		</KeyButton>
		</div>

		<div style={{FlexDirection : "column",marginTop : "10%"}}>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		<KeyButton keys={"d"} pushed={pressedKey == 'd' ? true : false} colors={"rgb(255,0,0)"} pushedcolors={"rgb(255,150,150)"}>
		right
		</KeyButton>
		<KeyButton keys={"x"}>
		
		</KeyButton>
		</div>


		<VerticalSlider controlData={controlData} setControlData={setControlData} type={"L/R"}/>	
		<div style={{ 
  display: 'flex', 
  flexDirection: 'column',  // 세로로 배치
  alignItems: 'center', 
  justifyContent: 'space-around', 
  height: '280px',
  marginRight : '8%'// 부모 요소에 충분한 높이 설정
}}>
  <HorizontalToggle colors={"#FFD400"} style={{ marginBottom: '20px' }} />  {/* 두 토글 사이 간격을 위해 margin 추가 */}
  <HorizontalToggle colors={"#1DF300"} />
</div>
</div>
		</Items>
		<div style={{width : '100%', flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
		<div style={{maring : '0 auto',display : 'flex',alignItems : 'center', justifyContent : 'center', flexDirection : 'row'}}>	
		<div style={{width : '100px'}} >
		{user.dark == true ? 
		"dark mode" : 
		 "white mode"}
		</div>
		<DarkToggle/>

		</div>
		</div>
		</Container>
	)
}
export default LoginContent;
