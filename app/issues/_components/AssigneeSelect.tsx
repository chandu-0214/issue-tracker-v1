"use client";

import { Skeleton } from "@/app/components";
import fetchAllUsers from "@/utils/getAllUsers";
import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const AssigneeSelect = ({
  issue,
  setassignVal,
}: {
  issue: any;
  setassignVal: any;
}) => {
  const [allUsers, setAllUsers] = useState<any>([]);

  const assignIssue = (userId: string) => {
    setassignVal(userId);
  };
  const getUsers = async () => {
    try {
      const allUsers = await fetchAllUsers();
      setAllUsers(allUsers);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignee || "Unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned" className="bg-slate-800 text-white">
              Unassigned
            </Select.Item>
            {allUsers?.length > 0 &&
              allUsers.map((user: any) => {
                return (
                  <Select.Item key={user.uid} value={user.displayName}>
                    {user.displayName}
                  </Select.Item>
                );
              })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
