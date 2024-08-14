import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import ColorContext from '../contexts/color';
import { useContext } from 'react';
import UserContext from '../contexts/users';
import DarkToggle from '../component/DarkToggle';

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

const Box = styled.div`
background: ${props => props.color || 'blue'};
padding: 1rem;
width: 100%;
display : flex;
flex-direction : row;
justify-content : space-between;
align-items : center;
height : 10vh;
${media.desktop`height:30px;`}
`;

const Logo = styled.div`
text-align : left;
width : 40vw;
padding-top : 0%;
color : ${props => props.dark == true ? 'white' : 'white'};
font-size : 20px;
`;

const Button = styled.button`
background:white;
color: black;
border-radius : 4px;
box-sizing : 1rem;
font-size : 13px;
font-weight : 800;
width : 20vw;
${media.desktop`width : 150px`}
height : 5vh;
&:hover {
background : rgba(255,255,255,0.9);
}

${props => 
	props.inverted &&
	css`
	background: none;
	border: 2px solid white;
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

const MenuList = styled.button`
width : 25vw;
${media.desktop`width : 150px`}
border : 0;
color : white;
background-color : ${props => props.dark == true ? 'black'  :  props.color};
`;


const LoginHeader = () => {
	
	const {state} = useContext(ColorContext)
	const [user, setUser] = useContext(UserContext);
	return (
		<Box dark={user.dark} color={user.dark == true ? 'black' : state.color}>
		<Logo dark={user.dark} color={state.subcolor}>
		{user.username}
		</Logo>
		<div style={{display : "flex",flexDirection : "row", alignItems : "center"}}>
		<div style={{display : "flex", flexDirection : "column"}}>
		<MenuList style={{marginBottom : "5px"}} onClick={()=>{setUser((prev)=> ({...prev, UsernameModal : true}))}}  dark={user.dark} color={state.color}>
		이름 변경
		</MenuList>
		<MenuList onClick={() => {setUser((prevUser) => ({...prevUser, pwModal : true}))}} dark={user.dark} color={state.color}>
		비밀번호 변경
		</MenuList>
		</div>
		<Button onClick={() => {setUser((prevUser) => ({...prevUser, login : false}))}}>
		로그아웃
		</Button>
		</div>
		</Box>
	)
}
export default LoginHeader;
