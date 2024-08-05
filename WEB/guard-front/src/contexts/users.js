import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
	const [user, setUser] = useState({
		login : false,
		MACid : "",
		username : "",
		password : "",
		dark : false,
		isMobile : window.innerWidth <= 768 ? true : false,
		pwModal : false,
		UsernameModal : false
	}
	);
	return (
		<UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
	);
};


export { UserProvider };

export default UserContext;
