import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
	const [user, setUser] = useState({
		login : false,
		MACid : "",
		password : "",
		dark : false,
		isMobile : false,
		pwModal : false
	}
	);
	return (
		<UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
	);
};


export { UserProvider };

export default UserContext;
