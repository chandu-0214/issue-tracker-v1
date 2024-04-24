import React from "react";
import fetchIssue from "@/utils/getSingleDoc";
import IssueFormPage from "../../_components/IssueForm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const IssueData = await fetchIssue(params.id);
  if (typeof IssueData === "string") {
    notFound();
  }
  return (
    <>
      <IssueFormPage IssueData={IssueData} />
    </>
  );
};

export default EditIssuePage;
