import styled, {css} from 'styled-components';
import UserContext from '../contexts/users';
import {useContext, useState } from 'react';

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  cursor: pointer;
  margin-left : 37%;
  > .toggle-container {
	      width: 50px;
	      height: 24px;
	      border-radius: 30px;
	      background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
      background-color: rgb(0,200,102);
          transition : 0.5s
            }

              > .toggle-circle {
                  position: absolute;
                     top: 1px;
                       left: 1px;
                        width: 22px;
                        height: 22px;
                border-radius: 50%;
                              background-color: rgb(255,254,255);
                                transition : 0.5s
                                    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
                                     } >.toggle--checked {
                                       left: 27px;
                                       transition : 0.5s
                                        }
                                       `;


const DarkToggle = () => {
              
              	const [user, setUser] = useContext(UserContext);
              	const toggleHandler = () => {
              		setUser((prevUser) => ({ ...prevUser, dark : !user.dark}));
              	};
              	return (
              		<ToggleContainer
              		onClick={toggleHandler}>
              		<div className={`toggle-container ${user.dark ? "toggle--checked" : null}`}/>
              		<div className={`toggle-circle ${user.dark ? "toggle--checked" : null}`}/>
              	</ToggleContainer>
              	)
              }
              export default DarkToggle;
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
             
           
