import styled, { keyframes } from "styled-components";

const Maximize = keyframes`
  from {
    height: 10vh
    width: 300px;
  } 

  to {
    height: 50vh
    width: 368px;
  }
`;

const Minimize = keyframes`
      from {
        height: 50vh
        width: 368px;
      } 

      to {
        height: 10vh
        width: 300px;
      }
     `;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: .1;
  }
 `;

//Parent component for entire chat window
export const ChatWindow = styled.div`
  background: ${props => props.theme.background};
  border-radius: 3px;
  color: #575757;
  height: 61vh;
  width: 368px;
  animation: ${Maximize} 0.2s linear;
  box-shadow: 0px 0px 10px 1px lightgray;
`;

//Input field for user input
export const Input = styled.input`
  width: 350px;
  height: 35px;
  background: transparent;
  font-size: 20px;
  color: ${props => props.theme.color};
  border: none;
  outline: none;

  &::-webkit-input-placeholder {
    padding-left: 2px;
    opacity: 0.3;
  }

  &:-moz-placeholder {
    padding-left: 2px;
    opacity: 0.3;
  }

  &::-moz-placeholder {
    padding-left: 2px;
    opacity: 0.3;
  }

  &:-ms-input-placeholder {
    padding-left: 2px;
    opacity: 0.3;
  }
`;

export const SendButton = styled.img`
  opacity: 0.1;
  padding-right: 15px;
  cursor: pointer;
  margin-bottom: 0;
  animation: ${FadeIn} 0.3s linear;
`;

export const MinimizedChatWindow = styled.div`
  display: flex;
  align-items: center;
  background: #efefef;
  border-radius: 3px;
  height: 5vh;
  width: 300px;
  animation: ${Minimize} 0.2s linear;
  box-shadow: 0px 0px 10px 1px lightgray;
`;

export const Header = styled.div`
  height: 5vh;
  width: 100%;
  background: ${props => props.theme.header};
  display: flex;
  align-items: center;
`;

//Parent div for profile image, name, title, and logo
export const Profile = styled.div`
  display: flex;
  height: 11vh;
  width: 100%;
  background: #fff;
  box-shadow: 0px 0px 10px 1px #eeecec;
`;

export const ProfileImage = styled.img`
  height: 8vh;
  object-fit: contain;
  margin: 10px;
`;

export const Name = styled.h1`
  font-size: 20px;
  color: #575757;
  margin-bottom: 2px;
`;

export const Title = styled.h1`
  font-size: 15px;
  color: #575757;
  margin: 0;
  font-weight: lighter;
`;

export const Logo = styled.img`
  height: 8vh;
  width: 8vh;
  object-fit: contain;
  margin: 10px;
  margin-left: auto;
  margin-right: 15px;
  box-shadow: 0px 0px 10px 1px lightgray;
`;

export const MessageWindow = styled.div`
  height: 35vh;
  overflow: scroll;
`;

export const MaximizeButton = styled.div`
  position: absolute;
  right: 15px;
  cursor: pointer;
  font-weight: bolder;
  color: #575757;
  transform: scaleX(2);
`;

export const MinimizeButton = styled.div`
  position: absolute;
  right: 15px;
  cursor: pointer;
  font-weight: bolder;
  color: #575757;
  transform: scaleX(2);
`;

export const Footer = styled.div`
  width: 100%;
  font-size: 10px;
  background-color: #efefef;
  height: 18px;
`;

export const Message = styled.div`
  font-size: 14px;
  color: #575757;
  padding-left: 10px;
  padding-top: 10px;
`;

// Styled components for UserList
//************************************* */

export const UserListWindow = styled.div`
  background: ${props => props.theme.background};
  border-radius: 3px;
  color: #575757;
  height: 20vh;
  width: 300px;
  box-shadow: 0px 0px 10px 1px lightgray;
`
export const UsersList = styled.ul`
  list-style-type: none;
`
export const User = styled.li`
  color: #000
  &:hover {
    color: #fa923f;
  }

`
