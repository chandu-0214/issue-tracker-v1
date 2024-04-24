import { fireDB } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const deletingDocs = async (id: string) => {
  try {
    const deletedObj = await deleteDoc(doc(fireDB, "data", id));
    console.log(deletedObj);
    return "Issue Deleted Successfully";
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return "An error occurred";
  }
};

export default deletingDocs;
