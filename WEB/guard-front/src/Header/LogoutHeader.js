import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import ColorContext from '../contexts/color';
import { useContext, useState } from 'react';
import UserContext from '../contexts/users';
import axios from 'axios';
import DarkToggle from '../component/DarkToggle';
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

const Box = styled.div`
background: ${props => props.color || 'blue'};
padding: 1rem;
width: 100vw;
display : flex;
height : 100vh;
flex-direction : column;
justify-content : center;
${media.desktop`width:100%;`};
${media.tablet`width:100%;}`};
`

const Card = styled.div`
background: rgb(241, 241, 241);
width : 200px;
height : 200px;
padding : 3rem;
margin : 0 auto;
border-radius : 20px;
`;

const Logo = styled.div`
text-align : center;
width : 100%;
height : 40px;
color : ${props => props.dark == true ? 'white' : 'black'};
font-size : 25px;
font-weight : 600;
margin-bottom : 5px;
`;

const Button = styled.button`
background:${props => props.dark ? 'rgb(0,0,0)' : props.color};
color: ${props => props.dark ? 'white' : 'white'};
border : 0;
margin-top : 5px;
border-radius : 4px;
font-weight : 600;
font-size : 15px;
width : 100%;
height : 30px;
&:hover {
background : rgba(150,150,150,0.9);
}

${props => 
	props.inverted &&
	css`
	background: none;
	color: white;
	&:hover {
	background:white;
	color : black;
	}
	`};
& + button {
margin-left : 1rem;
}
`;

const Tab = styled.div`
background : #61dafb;
color : yellow;
width : 100%;
align-items : center;
justify-content : center;
font-size : 5rem;
`;


const LogoutHeader = () => {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const {state} = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);

	
const postLogin = async () => {

	try {
            const response = await axios({
                method: 'post',
                url: process.env.REACT_APP_SERVER_MAIN+'/signin',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "macID": id,
                    "password": pw
                }
            });
            //alert(JSON.stringify(response));
		setUser((prevUser) => ({ ...prevUser, login : true, MACid : id, username : response.data}));
            
        } catch (error) {
            alert("로그인 실패 "+error);
            console.error("error", error);
        
	}};
	return (
		<Box color={user.dark == true ? 'black' : 'white'}>
		<Card>
		<div>
		<Logo color={state.color}>
		Login
		</Logo>
		
	
		<input
		value={id}
		onChange={e => setId(e.target.value)}
		placeholder="MAC주소를 입력하세요" style={{width : "95%", height : '20px', marginBottom : "5px", border : "0.5px solid gray", borderRadius : "0px"}}/>
		<input 
		value={pw}
		type='password'
		onChange={e=> setPw(e.target.value)}
		placeholder="비밀번호를 입력하세요" style={{width : "95%", height : "20px", marginBottom : "5px", border : "0.5px solid gray", borderRadius : "0px"}}/>
		<Button dark={user.dark} color={state.subcolor2}  onClick={() => {
			
			postLogin();
			
		}}>
		로그인
		</Button>
		<div style={{marginTop : '20px', display : 'flex', justifyContent : 'center', alignItems: 'center', height : '100px'}}>
		<div style={{marginRight : '10px', color : user.dark==false ? "rgb(150,150,150)" : "rgb(0,0,0)"}}>
		{user.dark == true ? "dark mode" : "white mode"}
		</div>
		<DarkToggle/>
		</div>
		</div>
		</Card>
		</Box>
	)
}
export default LogoutHeader;
