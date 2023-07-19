//////main body CSS and nav bar needed to be fixed with responsiveness
// chat section working or not needed to be checked
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import Chat from "@/components/common/chat/ChatPage";


// export default withAuth(Chat, "/meta/signup");
 export default withMentorAuthorization(Chat);
