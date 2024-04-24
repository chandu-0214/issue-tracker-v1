"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <Button onClick={() => setSubmitting(true)} disabled={isSubmitting}>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        href={`/issues/edit/${issueId}`}
      >
        <Pencil2Icon className="mr-2" /> Edit Issue
      </Link>
      {isSubmitting && <Spinner />}
    </Button>
  );
};

export default EditIssueButton;
