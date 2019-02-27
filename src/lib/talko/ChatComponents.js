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
  background-color: ${props => props.theme.messageWindow};
`;

export const Message = styled.div`
  font-size: 14px;
  color: ${props => props.theme.messageColor};
  padding-left: 10px;
  padding-top: 10px;
`;

export const CustomerMessageWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: auto;
`;

export const CustomerName = styled.p`
  font-size: 10px;
  margin: 0px;
  padding: 0px 5px;
  font-weight: lighter;
  color: ${props => props.theme.timeStampColor};
`;

export const CustomerTimeStamp = styled.p`
  font-size: 10px;
  font-weight: lighter;
  margin: 0px;
  color: ${props => props.theme.timeStampColor};
`;

export const CustomerMessageContentContainer = styled.div`
  width: fit-content;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 6px;
  background-color: #6ec3e4;
  color: white;
`;

export const CustomerMessageContent = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  display: inline-block;
  word-break: break-word;
  padding: 5px;
`;

export const RepMessageWindow = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

export const RepName = styled.p`
  font-size: 10px;
  margin: 0px;
  padding: 0px 5px;
  fontweight: lighter;
  color: ${props => props.theme.timeStampColor};
`;

export const RepTimeStamp = styled.p`
  margin: 0px;
  font-size: 10px;
  font-weight: lighter;
  color: ${props => props.theme.timeStampColor};
`;

export const RepMessageWindowContainer = styled.div`
  min-height: 30px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 4px;
  background-color: white;
`;

export const RepMessageContent = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  display: inline-block;
  word-break: break-word;
  padding: 5px;
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
  color: #575757;
  height: 100vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const UserListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: auto;
  margin-right: auto;
  padding-left: 10px;

  img {
    padding-right: 10px;
  }
`;

export const UsersList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  padding-top: 50px;
  width: 100%;
`;

export const UserWindow = styled.div`
  &:hover {
    color: lightgray;
    cursor: pointer;
    background-color: #252b32;
  }
`;

export const User = styled.li`
  display: flex;
  color: #fff
  height: 50px;
  width: calc(20vw - 12px);
  font-size: 22px;
  align-items: center;
  padding-left: 10px;
`;

export const Status = styled.div`
  border-radius: 999em;
  height: 8px;
  width: 8px;
  margin-right: 10px;
  background-color: #84ff84;
`;

export const AcceptButton = styled.button`
  border-radius: 5px;
  width: 60px;
  padding: 4px;
  margin: 0 auto 0 auto;
  color: white;
  background-color: #252b32;

  &:focus {
    outline: none;
  }
`;

export const UserMessagesWindow = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const TabWindow = styled.div`
  width: 100%;
  height: 50px;
  background-color: #1e2228;
  display: flex;
  overflow-x: auto;
  position: fixed;
  z-index: 1;
  top: 0;
`;

export const Tab = styled.div`
  background-color: #2f363e;
  width: 140px;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  border-left: solid 1px #0d0d0d;
  padding-left: 5px;
  white-space: pre;
`;

export const CloseTabButton = styled.div`
  opacity: 0;
  transform: scaleX(1.4);
  font-size: 10px;
  padding-right: 6px;
  padding-left: 6px;

  ${Tab}:hover & {
    opacity: 1;
  }
`;

export const ChatContentWindow = styled.div`
  padding-top: 10px;
  box-shadow: 0px 0px 10px -5px lightgray;
  width: 80vw;
  padding-bottom: 35px;
`;

export const ReplyInputWindow = styled.div`
  width: 80vw;
  display: flex;
  position: absolute;
  bottom: 0;
`;

export const ReplyInput = styled.input`
  width: 100%;
  height: 35px;

  &:focus {
    outline: none;
  }
`;

export const RepSendButton = styled.button`
  background-color: #252b32;
  border: #252b32;
  color: #fff;

  &:focus {
    outline: none;
  }
`;

// Styled component for contact form
export const Form = styled.form`
  background: ${props => props.theme.background};
  border-radius: 4px;
  color: ${props => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 200px);
  width: 368px;
`;
