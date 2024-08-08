import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/users';
import LoginContent from './LoginContent';
import LogoutContent from './LogoutContent';


const Content = () => {
	const [user, setUser] = useContext(UserContext);
	if(user.login == false)
	return null;
	return (
		<div style={{width : "100%", display : "flex"}}>
		{user.login == false ? <LogoutContent/> : <LoginContent/>}
	</div>
	)
}
export default Content;
