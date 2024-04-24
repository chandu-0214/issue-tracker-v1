"use client";

import { Skeleton } from "@/app/components";
import { Select } from "@radix-ui/themes";

const StatusSelect = ({ issue, setstatus }: { issue: any; setstatus: any }) => {
  const assignIssue = (userId: string) => {
    setstatus(userId);
  };

  const allStatuses = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "In Review", value: "INREVIEW" },
    { label: "Resolved", value: "RESOLVED" },
  ];
  return (
    <>
      <Select.Root
        defaultValue={issue?.status || "OPEN"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {allStatuses.map((user: any) => {
              return (
                <Select.Item key={user.label} value={user.value}>
                  {user.label}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default StatusSelect;
