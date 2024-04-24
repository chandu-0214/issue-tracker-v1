// const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

import { fireDB } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fetchAllIssues = async () => {
  let allIssues: any = [];
  try {
    const querySnapshot = await getDocs(collection(fireDB, "data"));
    querySnapshot.forEach((doc) => {
      allIssues.push(doc.data());
    });
    return allIssues;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return "An error occurred";
  }
};

export default fetchAllIssues;
