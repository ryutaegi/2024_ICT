import { createContext, useState } from 'react';

const ColorContext = createContext({
	state : { color : '10451D', subcolor : 'gray', subcolor2 : '', subcolor3 : ''},
	action : {
		setColor : () => {},
		setSubcolor: () => {},
		setSubcolor2: () => {},
		setSubcolor3: () => {}
	}
});

const ColorProvider = ({children}) => {
	const [color, setColor] = useState('#4AD66D');
	const [subcolor, setSubcolor] = useState('#92E6A7');
	const [subcolor2, setSubcolor2] = useState('#25A244');
	const [subcolor3, setSubcolor3] = useState('#208B3A');
	const value = {
		state : { color, subcolor, subcolor2, subcolor3 }
	};
	return (
		<ColorContext.Provider value={value}>{children}</ColorContext.Provider>
	);
};

const { Consumer : ColorConsumer } = ColorContext;
export { ColorProvider, ColorConsumer };

export default ColorContext;
