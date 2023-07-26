import { storage } from "@/config/firebaseconfig";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
const handler = async (req, res) => {
  const method = req.method;
  const storageRef = ref(storage, "recordings/");
  const videosRef = ref(storageRef);
  const videoUrls = [];
  switch (method) {
    case "GET":
      try {
        const videoList = await listAll(videosRef);
        for (const item of videoList.items) {
          const url = await getDownloadURL(item);
          videoUrls.push(url);
          console.log(url);
        }

        res.status(200).json({ url: videoUrls });
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
