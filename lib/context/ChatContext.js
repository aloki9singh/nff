import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { db } from "@/config/firebaseconfig";
import { collection, onSnapshot, orderBy, where } from "firebase/firestore";
import { useRouter } from "next/router";

const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  chats: [],
  setChats: () => {},
  currReciever: null,
  setCurrReciever: () => {},
});

const ChatContextProvider = ({ children }) => {
  const [currReciever, setCurrReciever] = useState(null);
  const [chats, setChats] = useState([]);
  const { user, loading, userProfile } = useAuthContext();
  const router = useRouter();
  const [members, setMembers] = useState


  useEffect(() => {
    const q = query(
      collection(db, "chatGroups"),
      where("members", "array-contains", user.uid),
      orderBy("lastMessageTimestamp", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach(async (doc, i) => {
        let chat = doc.data();
        // console.log("chatGroup ", i, chat);
        arr.push(chat);
      });
      setChats(arr);
    });

    return unsub;
  }, [user, router, loading]);

  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;

export const useChatContext = () => useContext(ChatContext);
