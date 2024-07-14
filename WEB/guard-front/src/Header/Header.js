import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import ColorContext from '../contexts/color';
import { useContext } from 'react';
import UserContext from '../contexts/users';
import LoginHeader from './LoginHeader';
import LogoutHeader from './LogoutHeader';



const Header = () => {
	const [user, setUser] = useContext(UserContext);
	return (
	<div style={{display : 'flex', width : '200px'}}>
		{user.login == false ? <LogoutHeader/> : <LoginHeader/>}
	</div>

	)
}
export default Header;
