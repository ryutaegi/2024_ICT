import { createContext, useState } from 'react';

const ColorContext = createContext();

const ColorProvider = ({children}) => {
	const [color, setColor] = useState({
		dard : false,
		main : "",
		sub1 : "",
		sub2 : "",
		sub3 : ""
	}
	);
	return (
		<ColorContext.Provider value={[color, setColor]}>{children}</ColorContext.Provider>
	);
};


export { ColorProvider };

export default ColorContext;
