import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
	const [user, setUser] = useState({
		login : false,
		MACid : "",
		password : "",
		dark : false
	}
	);
	return (
		<UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
	);
};


export { UserProvider };

export default UserContext;
