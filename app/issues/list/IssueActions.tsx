"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Spinner from "@/app/components/Spinner";

const IssueActions = (props: any) => {
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <Flex justify="between">
      {props?.isShowFilter && <IssueStatusFilter />}
      <Button
        className="cursor-pointer"
        onClick={() => setSubmitting(true)}
        style={{ marginLeft: "10px" }}
        disabled={isSubmitting}
      >
        <Link
          href="/issues/new"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MdOutlineCreateNewFolder className="mr-2" />
          Raise New Issue
        </Link>
        {isSubmitting && <Spinner />}
      </Button>
    </Flex>
  );
};

export default IssueActions;
