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
  background: ${props => props.theme.maximizedBackground};
  border-radius: 3px;
  color: #575757;
  height: 61vh;
  width: 368px;
  animation: ${Maximize} 0.2s linear;
  box-shadow: 0px 0px 10px 1px lightgray;
`;

//Component wraps the input field and the send button
export const InputWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-top: solid 2px ${props => props.theme.inputWindowBorderColor};
  border-bottom: solid 2px ${props => props.theme.inputWindowBorderColor};
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
  margin-left: 5px;

  &::-webkit-input-placeholder {
    color: #575757;
  }

  &:-moz-placeholder {
    color: #575757;
  }

  &::-moz-placeholder {
    color: #575757;
  }

  &:-ms-input-placeholder {
    color: #575757;
  }
`;

export const SendButton = styled.img`
  // opacity: 0.1;
  padding-right: 15px;
  cursor: pointer;
  margin-bottom: 0;
  animation: ${FadeIn} 0.1s linear;
`;

export const MinimizedChatWindow = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.minimizedBackgroundColor};
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

export const HeaderTitle = styled.h1`
  color: ${props => props.theme.headerTitleColor};
  font-size: 14px;
  padding-left: 10px;
`;

//Parent div for profile image, name, title, and logo
export const Profile = styled.div`
  display: flex;
  height: 11vh;
  width: 100%;
  background: ${props => props.theme.profileBackground};
  box-shadow: 0px 0px 10px ${props => props.theme.profileBoxShadowSpread}
    //spread
    ${props => props.theme.profileBoxShadowColor}; //color
  border-top: ${props => props.theme.profileBorder};
  border-bottom: ${props => props.theme.profileBorder};
`;

export const ProfileImage = styled.img`
  height: 8vh;
  object-fit: contain;
  margin: 10px;
`;

export const Name = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.nameColor};
  margin-bottom: 2px;
`;

export const Title = styled.h1`
  font-size: 15px;
  color: ${props => props.theme.titleColor};
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
`;

export const MessageWindow = styled.div`
  height: 35vh;
  overflow: auto;
`;

export const Message = styled.div`
  font-size: 14px;
  color: ${props => props.theme.messageColor};
  padding-left: 10px;
  padding-top: 10px;
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
  height: calc(4vh - 20px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  font-size: 10px;
  background-color: ${props => props.theme.footerBackgroundColor};
`;

export const Credit = styled.p`
  color: ${props => props.theme.creditColor};
  margin-right: 10px;
  padding-top: 5px;
`;

// Styled components for UserList
//************************************* */

export const UserListWindow = styled.div`
  background: #2f363e;
  border-radius: 3px;
  color: #575757;
  height: 100vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 1px lightgray;
`;

export const UsersList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 100%;
`;

export const User = styled.li`
  color: #fff
  height: 30px;
  width: 100%;
  font-size: 22px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  &:hover {
    color: lightgray;
    cursor: pointer;
  }
`;

export const Status = styled.div`
  border-radius: 999em;
  height: 8px;
  width: 8px;
  margin-right: 10px;
  background-color: #84ff84;
`;

export const UserMessagesWindow = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
`;

export const TabWindow = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  overflow-x: auto;
`;

export const Tab = styled.div`
  border: solid 2px black;
  width: 100px;
  height: 20px;
  cursor: pointer;
  display: flex;
`;

export const ChatContentWindow = styled.div`
  box-shadow: 0px 0px 10px -5px lightgray;
  width: 80vw;
  height: 90vh;
`;

export const ReplyInputWindow = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const ReplyInput = styled.input`
  width: 100%;
  height: 5vh;
`;
