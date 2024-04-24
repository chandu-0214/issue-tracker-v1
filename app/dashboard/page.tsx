import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import fetchAllIssues from "@/utils/getAllDocs";
import Copyright from "../components/Copyright";

export default async function Home() {
  const counts: any = {
    INPROGRESS: 0,
    CLOSED: 0,
    OPEN: 0,
  };
  const getStatusCounts = (data: any) => {
    data.forEach((item: any) => {
      counts[item.status]++;
    });

    return counts;
  };
  const allIssues = await fetchAllIssues();
  getStatusCounts(allIssues);
  const NoChartsview = counts.OPEN + counts.INPROGRESS + counts.CLOSED === 0;
  allIssues.sort((a: any, b: any) => {
    const timestampA = a.createdAt.seconds;
    const timestampB = b.createdAt.seconds;
    return timestampB - timestampA;
  });

  const firstFiveLatestIssues = allIssues.slice(0, 6);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={counts.OPEN}
          inProgress={counts.INPROGRESS}
          closed={counts.CLOSED}
        />
        <IssueChart
          open={counts.OPEN}
          inProgress={counts.INPROGRESS}
          closed={counts.CLOSED}
          NoChartsview={NoChartsview}
        />
      </Flex>
      <LatestIssues firstFiveLatestIssues={firstFiveLatestIssues} />
      <Copyright />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
