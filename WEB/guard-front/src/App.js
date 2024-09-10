import logo from './logo.svg';
import './App.css';
import Header from './Header/Header.js';
import Content from './Content/Content.js';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.js';
import Login from './Login.js';
import { ColorProvider } from './contexts/color';
import { UserProvider } from './contexts/users';
function App() {
  return (
	<UserProvider>	
	<ColorProvider>
    <Routes>
	  <Route element={<Layout/>}>
	  <Route path="/" element={<Content/>} />
	</Route>
    </Routes>
	  </ColorProvider>
	  </UserProvider>
	  
  );
}

export default App;
