import Pagination from "@/app/components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import fetchAllIssues from "@/utils/getAllDocs";
import Mobiletoast from "./Mobiletoast";
import Copyright from "@/app/components/Copyright";

const IssuesPage = async ({ searchParams }: any) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  function filterAndSort(
    data: any,
    status: string,
    sortBy: string,
    pageNo: number
  ) {
    const filteredData = status
      ? data.filter(
          (item: any) => item.status.toLowerCase() === status.toLowerCase()
        )
      : data;
    const pageNumber = pageNo ? pageNo : 1;
    const leftItem = (pageNumber - 1) * pageSize;
    const rightItem = leftItem + pageSize;
    const PaginationData = filteredData.slice(leftItem, rightItem);
    sortBy
      ? PaginationData.sort((a: any, b: any) => {
          // Sort by the specified field
          if (sortBy === "createdAt") {
            if (a.createdAt.seconds !== b.createdAt.seconds) {
              return a.createdAt.seconds - b.createdAt.seconds;
            }
          } else if (sortBy === "status") {
            if (a.status !== b.status) {
              return a.status.localeCompare(b.status);
            }
          } else if (sortBy === "title") {
            return a.title.localeCompare(b.title);
          }
        })
      : PaginationData;

    return PaginationData;
  }

  const allIssues = await fetchAllIssues();
  const { status, orderBy, page: pageparam } = searchParams;
  const filteredAndSortedData = await filterAndSort(
    allIssues,
    status === "All" ? "" : status,
    orderBy === "none" ? "" : orderBy,
    parseInt(pageparam)
  );

  return (
    <Flex direction="column" gap="3" data-id="Test">
      <Mobiletoast />
      {
        <IssueActions
          isShowFilter={(allIssues.length || status) > 0 ? true : false}
        />
      }
      <IssueTable searchParams={searchParams} issues={filteredAndSortedData} />
      {filteredAndSortedData.length > 0 && (
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={allIssues?.length}
        />
      )}
      <Copyright />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
