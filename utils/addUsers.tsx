import { fireDB } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface newIssuedata {
  displayName: string;
  email: string;
  uid: string;
  photoURL?: string;
}

const addUsersToFirebase = async (data: newIssuedata) => {
  try {
    await setDoc(doc(fireDB, "users", data.uid), data);
    return "Done";
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};
export default addUsersToFirebase;
