//////main body CSS and nav bar needed to be fixed with responsiveness
// chat section working or not needed to be checked

import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import Chat from "@/components/common/chat/ChatPage";


export default withStudentAuthorization(Chat);
