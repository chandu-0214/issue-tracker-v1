import { fireDB } from "@/firebase/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

interface newIssuedata {
  title: string;
  description: string;
  id: string;
  status?: string;
  assignee?: string;
}
enum Status {
  open = "OPEN",
}
const addDocsToFirebase = async (data: newIssuedata) => {
  try {
    const docData = {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      status: data?.status || Status.open,
      assignee: data?.assignee || "Unassigned",
    };
    await setDoc(doc(fireDB, "data", docData.id), docData);
    return "Done";
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};
export default addDocsToFirebase;
