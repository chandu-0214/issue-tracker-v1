import { fireDB } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fetchAllUsers = async () => {
  let allIssues: any = [];
  try {
    const querySnapshot = await getDocs(collection(fireDB, "users"));
    querySnapshot.forEach((doc) => {
      allIssues.push(doc.data());
    });
    return allIssues;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return "An error occurred";
  }
};

export default fetchAllUsers;
