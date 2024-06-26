import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import ColorContext from '../contexts/color';
import { useContext } from 'react';
import UserContext from '../contexts/users';

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
justify-content : space-between;
${media.desktop`width:200px;`}
${media.tablet`width:200px;}`};
`

const Logo = styled.div`
background:gray;
width : 100%;
padding-bottom : 100%;
border-radius : 100px;
`;

const Button = styled.button`
background:white;
color: black;
border-radius : 4px;
box-sizing : 1rem;
font-weight : 600;
width : 100%;
margin-top : 10px;
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
width : 100%;
margin-bottom : 5px;
border : 0;
color : white;
background-color : black;
`;


const LogoutHeader = () => {
	
	const [user, setUser] = useContext(UserContext);
	return (
		<Box color="black">
		<Logo>
		logo
		</Logo>
		<div>
		<MenuList>
		이름 변경
		</MenuList>
		<MenuList>
		비밀번호 변경
		</MenuList>
		<Button onClick={() => {setUser((prevUser) => ({...prevUser, login : false}))}}>
		로그아웃
		</Button>
		</div>
		</Box>
	)
}
export default LogoutHeader;
