import fetchIssue from "@/utils/getSingleDoc";
import { Box, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import DeleteButton from "./DeleteButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session1 = true;
  const IssueData = await fetchIssue(params.id);
  if (typeof IssueData === "string") {
    return IssueData;
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={IssueData} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={IssueData.id} />
          <DeleteButton issueId={IssueData.id} />
        </Flex>
      </Box>
    </Grid>
  );
};
export const metadata: Metadata = {
  title: "User Issue Details",
  description: "View all user issues",
};

export default IssueDetailPage;
