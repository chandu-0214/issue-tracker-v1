"use client";
import React, { useState } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Button, Callout, Flex, Spinner, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import addDocsToFirebase from "@/utils/addDocs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import SimpleMdeReact from "react-simplemde-editor";
import AssigneeSelect from "./AssigneeSelect";
import StatusSelect from "./StatusChange";

interface IssueForm {
  title: string;
  description: string;
  mail: string;
}
const IssueFormPage = (props: any) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [assignVal, setassignVal] = useState("Unassigned");
  const [statusChanged, setstatus] = useState("OPEN");
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data?.title && data?.description) {
        setSubmitting(true);
        const msg: any = await addDocsToFirebase({
          ...data,
          status: statusChanged || props?.IssueData?.status,
          id: props?.IssueData?.id || uuidv4(),
          assignee: assignVal || props?.IssueData?.assignee || "Unassigned",
        });
        if (msg !== "Done") {
          setError("An unexpected error occurred.");
        } else {
          router.push("/issues/list");
          router.refresh();
        }
      } else {
        setError("Title and Description should not be Empty.");
      }
    } catch (error: any) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>An Unexpected Error Occured</Callout.Text>
          <Callout.Text>{error.toString()}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Ttile…"
          className="w-50%"
          defaultValue={props?.IssueData?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={props?.IssueData?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Add Description…" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex gap="2">
          <AssigneeSelect
            issue={props?.IssueData}
            setassignVal={setassignVal}
          />
          <StatusSelect issue={props?.IssueData} setstatus={setstatus} />
        </Flex>
        <Button disabled={isSubmitting} className="z-10">
          {props?.IssueData ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueFormPage;
