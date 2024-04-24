import { fireDB } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const fetchIssue = async (id: string) => {
  try {
    const docRef = doc(fireDB, "data", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      docSnap.data(); //will be undefined in this case
      return "No such document!";
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return "An error occurred";
  }
};

export default fetchIssue;
