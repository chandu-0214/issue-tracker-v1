"use client";
import { Badge } from "@radix-ui/themes";
import React from "react";

enum Status {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  INPROGRESS = "INPROGRESS",
  RESOLVED = "RESOLVED",
  INREVIEW = "INREVIEW",
}

const statusmap: Record<
  Status,
  {
    label: string;
    color: "orange" | "green" | "blue" | "yellow" | "teal" | "pink";
  }
> = {
  [Status.OPEN]: { label: "Open", color: "orange" },
  [Status.CLOSED]: { label: "Closed", color: "green" },
  [Status.INPROGRESS]: { label: "In Progress", color: "yellow" },
  [Status.INREVIEW]: { label: "In Review", color: "blue" },
  [Status.RESOLVED]: { label: "Resolved", color: "pink" },
};
const IssueStatusBadge = (props: { status: Status }) => {
  return (
    <Badge color={statusmap[props.status].color || "mint"}>
      {statusmap[props.status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
