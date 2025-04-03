"use client";

import { Calendar } from "./ui/calendar";
import React, { useState } from "react";

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Operational Timeline
      </h2>

      <div className="flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
    </div>
  );
};

export default DashboardCalendar;
