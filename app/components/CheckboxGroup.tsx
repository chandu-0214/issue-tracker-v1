"use client";
import React from "react";

const CheckboxGroup = (props: any) => {
  const handleChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      props?.setSelectedValues(value);
    } else {
      props?.setSelectedValues(!value);
    }
  };

  return (
    <div className="flex flex-col space-y-1 mb-3">
      <label className="text-sm">
        <input
          type="checkbox"
          value="0"
          checked={props?.selectedValues === "0"}
          onChange={handleChange}
          className="mr-2"
          name="chart"
        />
        Composed Chart
      </label>
      <label className="text-sm">
        <input
          type="checkbox"
          value="1"
          checked={props?.selectedValues === "1"}
          onChange={handleChange}
          className="mr-2"
          name="chart"
        />
        Bar Chart
      </label>
      <label className="text-sm">
        <input
          type="checkbox"
          value="2"
          name="chart"
          checked={props?.selectedValues === "2"}
          onChange={handleChange}
          className="mr-2"
        />
        Pie Chart
      </label>
    </div>
  );
};

export default CheckboxGroup;
