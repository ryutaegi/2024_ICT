import { createContext, useState } from 'react';

const ColorContext = createContext({
	state : { color : 'black', subcolor: 'gray'},
	action : {
		setColor : () => {},
		setSubcolor: () => {}
	}
});

const ColorProvider = ({children}) => {
	const [color, setColor] = useState('black');
	const [subcolor, setSubcolor] = useState('gray');
	const value = {
		state : { color, subcolor },
		actions : {setColor, setSubcolor }
	};
	return (
		<ColorContext.Provider value={value}>{children}</ColorContext.Provider>
	);
};

const { Consumer : ColorConsumer } = ColorContext;
export { ColorProvider, ColorConsumer };

export default ColorContext;
