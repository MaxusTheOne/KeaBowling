import React, { useState } from "react";
import "./SchedulePage.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useAuth } from "../../../Security/AuthProvider";

export default function SchedulePage() {
  const localizer = momentLocalizer(moment);
  const [selectedUser, setSelectedUser] = useState("all");
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };
  const mockData = [
    {
      username: "user1",
      start: new Date("2024-05-28T12:30:00"),
      end: new Date("2024-05-28T14:00:00"),
    },
    {
      username: "user1",
      start: new Date("2024-05-29T12:30:00"),
      end: new Date("2024-05-29T18:00:00"),
    },
    {
      username: "user2",
      start: new Date("2024-05-27T14:30:00"),
      end: new Date("2024-05-27T16:00:00"),
    },
  ];
  const users = Array.from(new Set(mockData.map((data) => data.username)));
  const events = mockData.map((data) => ({
    start: data.start,
    end: data.end,
    title:
      data.username +
      " | " +
      data.start.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " - " +
      data.end.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    user: data.username,
  }));

  let filteredEvents = events;
  if (selectedUser !== "all") {
    filteredEvents = events.filter((event) => event.user === selectedUser);
  }

  return (
    <div id="schedule-page-container">
      <div id="work-schedule-header">
        <h1>Work Schedule</h1>
        {useAuth().isLoggedInAs(["ADMIN"]) ? (
          <>
            <button id="add-event-button">Add Schedule</button>
            <label htmlFor="user-select">User:</label>
            <select
              id="user-select"
              onChange={handleUserChange}
              value={selectedUser}
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option value={user} key={user}>
                  {user}
                </option>
              ))}
            </select>
          </>
        ) : null}
      </div>
      <div id="calendar-container">
        {useAuth().isLoggedInAs(["ADMIN"]) ? (
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
          />
        ) : (
          <Calendar
            localizer={localizer}
            events={events.filter(
              (event) => event.user === localStorage.getItem("username")
            )}
            startAccessor="start"
            endAccessor="end"
          />
        )}
      </div>
    </div>
  );
}
