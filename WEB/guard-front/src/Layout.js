import {Outlet } from 'react-router-dom';
import Header from './Header/Header.js';

const Layout = () => {
	 return (
		 <div style={{display :"flex", flexDirectoin : "row", justifyContent : "space-between"}}>
		<Header/>
		<Outlet /> 
		 </div>
	 );
};
export default Layout;
