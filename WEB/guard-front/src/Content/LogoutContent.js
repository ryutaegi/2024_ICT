import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
const Items = styled.div`
width : 40%;
flex-grow : 0;
flex-shrink : 0;
color : white;
padding-bottom : 40%;
text-align :center;
background-color : black;
justify-content : center;
aligh-items : center;
`;


const Container = styled.div`
display : flex;
justify-content : space-evenly;
align-items : center;
padding : 10px;
overflow: hidden;
background-color : ${(props) => (props.dark ? 'gray' : props.color)};
width : 100%;
`;


const LogoutContent = () => {
	const {state} = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);
	return (
		<Container color={state.subcolor} dark={user.dark}>
	<img style={{height : '120%'}} src="https://vrthumb.imagetoday.co.kr/2023/02/23/ta0149t000172.jpg"/>	
		</Container>
	)
}
export default LogoutContent;
