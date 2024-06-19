import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import ColorContext from '../contexts/color';
import { useContext, useState } from 'react';
import UserContext from '../contexts/users';
import axios from 'axios';

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
text-align : center;
width : 100%;
padding-top : 100%;
color : ${props => props.color};
font-size : 35px;
`;

const Button = styled.button`
background:${props => props.color};
color: ${props => props.dark ? 'dark' : 'white'};
border : none;
border-radius : 4px;
font-weight : 600;
width : 100%;
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


const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
	      width: 50px;
	      height: 24px;
	      border-radius: 30px;
	      background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
      background-color: rgb(0,200,102);
          transition : 0.5s
            }

              > .toggle-circle {
                  position: absolute;
                     top: 1px;
                       left: 1px;
                        width: 22px;
                        height: 22px;
                border-radius: 50%;
                              background-color: rgb(255,254,255);
                                transition : 0.5s
                                    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
                                     } >.toggle--checked {
                                       left: 27px;
                                       transition : 0.5s
                                        }
                                       `;


const LoginHeader = () => {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const {state} = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);

	const [isOn, setisOn] = useState(false);

	  const toggleHandler = () => {
	     setUser((prevUser) => ({ ...prevUser, dark : !user.dark}));
       };
	
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
            console.log("signin:", response);
		setUser((prevUser) => ({ ...prevUser, login : true}));
		alert("websocket connected");
            
        } catch (error) {
            alert("로그인 실패 "+error);
            console.error("error", error);
        
	}};
	return (
		<Box color={user.dark == true ? state.color : 'white'}>
		<Logo color={state.color}>
		Welcome to ICT
		</Logo>
		<div>

		<ToggleContainer
		        onClick={toggleHandler}
		      >
		        <div className={`toggle-container ${user.dark ? "toggle--checked" : null}`}/>
		        <div className={`toggle-circle ${user.dark ? "toggle--checked" : null}`}/>
		      </ToggleContainer>

		<input
		value={id}
		onChange={e => setId(e.target.value)}
		placeholder="MAC주소를 입력하세요" style={{width : "100%"}}/>
		<input 
		value={pw}
		type='password'
		onChange={e=> setPw(e.target.value)}
		placeholder="비밀번호를 입력하세요" style={{width : "100%"}}/>
		<Button dark={user.dark} color={state.subcolor2}  onClick={() => {
			
			postLogin();
			
		}}>
		로그인
		</Button>
		</div>
		</Box>
	)
}
export default LoginHeader;
