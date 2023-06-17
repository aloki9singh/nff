import { storage } from "../../../config/firebaseConfig";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
const handler = async (req, res) => {
  const method = req.method;
  const storageRef = ref(storage, "assignment/");
  const assignmentRef = ref(storageRef);
  const assignmentUrls = [];
  switch (method) {
        case "GET":
            try {
                  const assignmentList = await listAll(assignmentRef);
                    for (const item of assignmentList.items) {
                        const url = await getDownloadURL(item);
                        assignmentUrls.push(url);
                        console.log(url);
                    }
                    res.status(200).json({ url: assignmentUrls });
            } catch (error) {
                console.error(error);
                res.status(500).send(error.message);
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    };
    export default handler;  
