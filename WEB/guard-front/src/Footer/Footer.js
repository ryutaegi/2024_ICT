import styled from 'styled-components';


const Button = styled.div`
background : coral;
color : yellow;
align-items : center;
justify-content : center;
font-size : 5rem;
width : 100%;
height : 80px;
bottom : 0;
position : fixed;
`;


const Footer = () => {
	return (
		<Button>
		쌈@뽕한 Footer
		</Button>
	)
}
export default Footer;
