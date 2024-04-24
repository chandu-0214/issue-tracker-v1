import { IssueStatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { VscEmptyWindow, VscSortPrecedence } from "react-icons/vsc";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";

const IssueTable = ({ searchParams, issues }: any) => {
  return (
    <>
      {issues.length > 0 ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column, i) => (
                <Table.ColumnHeaderCell key={i} className={column.className}>
                  <NextLink
                    className="flex align-items-center "
                    href={
                      searchParams?.orderBy === column.value
                        ? {
                            query: {
                              ...searchParams,
                              orderBy: "none",
                            },
                          }
                        : {
                            query: {
                              ...searchParams,
                              orderBy: column.value,
                            },
                          }
                    }
                  >
                    {!(column.value === searchParams.orderBy) ? (
                      <VscSortPrecedence className="align-self-center mr-2 inline" />
                    ) : (
                      <ArrowUpIcon className="inline" />
                    )}
                    {column.label}
                  </NextLink>
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell
                key={"assigne"}
                className="hidden md:table-cell"
              >
                {
                  <MdOutlineAssignmentTurnedIn className="align-self-center mr-2 inline" />
                }
                {"Assignee"}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue: any) => {
              const createdAtDate = new Date(
                issue.createdAt.seconds * 1000 +
                  issue.createdAt.nanoseconds / 1000000
              );
              return (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <Link
                      href={`/issues/${issue.id}`}
                      className="font-medium mb-1"
                    >
                      {issue.title}
                    </Link>
                    <div className="block md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {createdAtDate.toDateString()}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {issue?.assignee || "Unassigned"}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <div className="text-center p-3 m-3 flex justify-center align-items-center ">
          <VscEmptyWindow className=" mx-3 w-5 h-5 text-purple-800" />
          <p className="text-purple-700 ali-align-self-center ">
            No Records Found.
          </p>
        </div>
      )}
    </>
  );
};

const columns: {
  label: string;
  value: any;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
