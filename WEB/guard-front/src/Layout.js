import {Outlet } from 'react-router-dom';
import Header from './Header/Header.js';

const Layout = () => {
	 return (
		 <div style={{display :"flex", flexDirection : "column"}}>
		<Header/>
		<Outlet /> 
		 </div>
	 );
};
export default Layout;
