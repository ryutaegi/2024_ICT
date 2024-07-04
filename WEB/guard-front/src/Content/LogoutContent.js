import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/users';
import ColorContext from '../contexts/color';
import ImageSlider from '../component/ImageSlider';

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
padding : 0px;
overflow: hidden;
background-color : ${(props) => (props.dark ? 'gray' : 'white')};
width : 100%;
`;


const LogoutContent = () => {
	const {state} = useContext(ColorContext);
	const [user, setUser] = useContext(UserContext);
	return (
		<Container color={state.subcolor} dark={user.dark}>
		<ImageSlider/>
		</Container>
	)
}
export default LogoutContent;
