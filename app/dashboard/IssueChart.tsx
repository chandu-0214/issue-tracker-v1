"use client";
import React, { useState } from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import CheckboxGroup from "../components/CheckboxGroup";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import { IoStatsChartSharp } from "react-icons/io5";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
  NoChartsview: boolean;
}

const IssueChart = ({ open, inProgress, closed, NoChartsview }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string>("0");

  const data = [
    {
      name: "Open",
      status: open,
    },
    {
      name: "In Progress",
      status: inProgress,
    },
    {
      name: "Closed",
      status: closed,
    },
  ];
  const renderChart = () => {
    switch (selectedValues) {
      case "1":
        return (
          <BarChart width={730} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="status" barSize={45} fill="#8884d8" />
          </BarChart>
        );
      case "2":
        return (
          <LineChart
            width={730}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="status" stroke="#82ca9d" />
          </LineChart>
        );
      default:
        return (
          <ComposedChart width={730} height={250} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="status" barSize={20} fill="#8884d8" />
            <Line type="monotone" dataKey="status" stroke="#82ca9d" />
          </ComposedChart>
        );
    }
  };

  return (
    <Card>
      {NoChartsview ? (
        <Flex align={"center"}>
          <IoStatsChartSharp className="m-4 w-5 h-5 text-green-800" />
          <Text color={"mint"}>
            No data{" "}
            <Text size="1" as="span">
              (for Closed,In-Progress,Open issues)
            </Text>{" "}
            is available to render charts
          </Text>
        </Flex>
      ) : (
        <>
          <CheckboxGroup
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
};

export default IssueChart;
