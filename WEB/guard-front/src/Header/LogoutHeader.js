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
width: 1024px;
display : flex;
height : 100vh;
flex-direction : column;
justify-content : center;
${media.desktop`width:200px;`}
${media.tablet`width:200px;}`};
`

const Logo = styled.div`
text-align : center;
width : 100%;
height : 40px;
padding-top : 50%;
color : ${props => props.dark == true ? 'white' :  props.color};
font-size : 20px;
`;

const Button = styled.button`
background:${props => props.dark ? 'dark' : props.color};
color: ${props => props.dark ? 'white' : 'white'};
border : 0;
margin-top : 5px;
border-radius : 4px;
font-weight : 600;
font-size : 15px;
width : 100%;
height : 30px;
&:hover {
background : rgba(255,255,255,0.9);
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
                url: '/signin',
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
		<Logo color={state.color}>
		Welcome to ICT
		</Logo>
		<div>
	
		<input
		value={id}
		onChange={e => setId(e.target.value)}
		placeholder="MAC주소를 입력하세요" style={{width : "92%", height : '20px', marginBottom : "5px", border : "0.5px solid gray", borderRadius : "0px"}}/>
		<input 
		value={pw}
		type='password'
		onChange={e=> setPw(e.target.value)}
		placeholder="비밀번호를 입력하세요" style={{width : "92%", height : "20px", marginBottom : "5px", border : "0.5px solid gray", borderRadius : "0px"}}/>
		<Button dark={user.dark} color={state.subcolor2}  onClick={() => {
			
			postLogin();
			
		}}>
		로그인
		</Button>
		<DarkToggle/>
		
		</div>
		</Box>
	)
}
export default LogoutHeader;
