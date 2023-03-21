import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    setUser(userInfo);

    if (!userInfo) {
      //this means if the userInfo does not exist(means no user is logged in, because if the user was logged in, then userInfo should be there because userInfo is gotten from localstorage, and we know that userInfo is stored to the localstorage when any user is being logged in) we will redirect to the homepage(i.e login/sign in page)
      history.push("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//all of the states of our app are inside this "ChatState" variable
export const ChatState = () => {
  return useContext(ChatContext); //this hook is used to make all the states accessible at other parts of this app
};

export default ChatProvider;
