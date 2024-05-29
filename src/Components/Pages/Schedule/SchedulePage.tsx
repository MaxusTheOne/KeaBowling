import React, { useEffect, useState } from "react";
import "./SchedulePage.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../Security/AuthProvider";
import { getSchedules } from "../../../Services/apiFacade";
import { Schedule } from "../../../Types";

export default function SchedulePage() {
  // Constants
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const localizer = momentLocalizer(moment);
  const [selectedUser, setSelectedUser] = useState("all");

  // Data
  useEffect(() => {
    getSchedules()
      .then((data: Schedule[]) => {
        const fixedDateInData = data.map((schedule) => {
          return {
            ...schedule,
            start: new Date(schedule.start),
            end: new Date(schedule.end),
          };
        });
        setSchedules(fixedDateInData);
      })
      .catch((err) => console.error(err));
  }, []);
  // Create events from data.
  const events = schedules.map((data) => ({
    id: data.id,
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

  // Filter events based on selected user.
  const users = Array.from(new Set(schedules.map((data) => data.username)));
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };
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
            <button
              id="add-event-button"
              onClick={() => navigate("/schedule/add")}
            >
              Add Schedule
            </button>
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
            onSelectEvent={(event) => navigate(`/schedule/${event.id}`)}
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
