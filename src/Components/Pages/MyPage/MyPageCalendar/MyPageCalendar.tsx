import { Link } from "react-router-dom";
import "./MyPageCalendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const mockData = [
  {
    bookingInformation: {
      id: 1,
      booking_typeid: 1,
      user_id: 1,
      people_amount: 3,
      reservation_date_time: new Date("02/04/2024/12:30:00"),
      reservation_length_minutes: 90,
      booking_type: "Bowling Lane",
    },
    // If it is a bowling lane, it will have is_child_friendly boolean.
    bookingType: {
      is_child_friendly: false,
      id: 1,
    },
    user: {
      id: 1,
      date_created: new Date("11.01.2023"),
      date_edited: new Date("14.03.2024"),
      date_last_login: new Date("18.04.2024"),
      email: "mockemailaddress@mail.com",
      name: "James Johnson McAdams",
      roles: ["ADMIN", "USER", "RESERVATION-STAFF"],
    },
  },
  {
    bookingInformation: {
      id: 2,
      booking_typeid: 2,
      user_id: 2,
      people_amount: 6,
      reservation_date_time: new Date("01/11/2023/12:30:00"),
      reservation_length_minutes: 120,
      booking_type: "Air Hockey Table",
    },
    // If it is a bowling lane, it will have is_child_friendly boolean.
    bookingType: {
      id: 1,
    },
    user: {
      id: 2,
      date_created: new Date("01/11/2023"),
      date_edited: new Date("14.03.2024"),
      date_last_login: new Date("18.04.2024"),
      email: "acoolemail@email.com",
      name: "Sarah Jessica Adams",
      roles: ["USER", "RESERVATION-STAFF"],
    },
  },
];

export default function MyPageCalendar() {
  const events = mockData.map((data) => ({
    start: data.bookingInformation.reservation_date_time,
    end: moment(data.bookingInformation.reservation_date_time)
      .add(data.bookingInformation.reservation_length_minutes, "minutes")
      .toDate(),
    title:
      data.bookingInformation.booking_type +
      " - " +
      (data.bookingInformation.reservation_date_time
        ? data.bookingInformation.reservation_date_time.getHours()
        : "") +
      ":" +
      (data.bookingInformation.reservation_date_time
        ? data.bookingInformation.reservation_date_time.getMinutes()
        : "") +
      " - " +
      data.bookingInformation.people_amount +
      " people",
  }));

  return (
    <div id="calendar-page-container">
      <Link to="/my-page" className="link-no-underline" id="return-button">
        <h1>↩</h1>
      </Link>
      <h1 id="calendar-page-title">MyPageCalendar</h1>
      <div id="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
}
