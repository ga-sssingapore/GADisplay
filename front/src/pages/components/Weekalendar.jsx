import React, { useState, useEffect } from "react";
import styles from "./css/Weekalendar.module.css";
import WeekalendarRow from "./WeekalendarRow";

function Weekalendar(props) {
  // Get today's date at 12AM GMT +8
  const today =
    props.date.getTime() + props.date.getTimezoneOffset() * 60 * 1000;
  const week_dates = [
    today,
    today + 86400000,
    today + 86400000 * 2,
    today + 86400000 * 3,
    today + 86400000 * 4,
    today + 86400000 * 5,
    today + 86400000 * 6,
  ].map((item) => {
    return new Date(item);
  });

  // Courses this week, days: 0 - 6 Sunday - Saturday, 7: Saturday Odd, 8: Saturday Even
  const courses = [
    {
      name: "DSIFX10SGP",
      start: new Date("2023-05-27T23:59"),
      end: new Date("2023-08-26T18:00"),
      room: 6,
      days: [7],
    },
    {
      name: "USDIFX06SGP",
      start: new Date("2023-05-27T09:00"),
      end: new Date("2023-08-26T18:00"),
      room: 6,
      days: [8],
    },
    {
      name: "SEIFX13SGP",
      start: new Date("2023-03-04T09:00"),
      end: new Date("2023-09-02T18:00"),
      room: 3,
      days: [7],
    },
    {
      name: "UXDI44SGP",
      start: new Date("2023-03-13T09:30"),
      end: new Date("2023-06-02T17:30"),
      room: 6,
      days: [3, 4],
    },
    {
      name: "SEI43SGP",
      start: new Date("2023-03-20T09:30"),
      end: new Date("2023-06-07T17:30"),
      room: 3,
      days: [1, 2, 3, 4],
    },
    {
      name: "Urgent Meeting",
      start: new Date("2023-06-05T12:00"),
      end: new Date("2023-06-05T14:00"),
      room: 3,
      days: [1], // Days will be determined and added by backend after serializing.
    },
  ];

  const allocated_rooms = resolveClassesToDates(courses);

  function resolveClassesToDates(courseArr) {
    // Need to account for ad-hocs as well
    const room1 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 1)
    );
    const room2 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 2)
    );
    const room3 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 3)
    );
    const room4 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 4)
    );
    const room5 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 5)
    );
    const room6 = groupClassesByRooms(
      courseArr.filter((item) => item.room === 6)
    );
    return [room1, room2, room3, room4, room5, room6];
  }

  function groupClassesByRooms(filteredArr) {
    const room = [[], [], [], [], [], [], []];
    // Item may include courses or ad-hocs
    for (const item of filteredArr) {
      for (let i = 0; i < week_dates.length; i++) {
        const date = week_dates[i];
        if (item.end - date < 0) {
          // If end_date - day < 0, course has already ended.
          break;
        }
        const start_diff = item.start - date;
        if (start_diff >= 604800000) {
          // If the course starts next week+, skip this week.
          break;
        } else if (start_diff >= 86400000) {
          // If start_diff >= 24hrs, course has yet to start, skip this day.
          continue;
        } else {
          const day = date.getDay();
          if (day < 6) {
            if (item.days.includes(day)) room[i].push(item);
          } else {
            //Check if item scheduled on a saturday.
            const saturday = item.days.find((ele) => ele >= 6);
            if (saturday) {
              // Assumes courses with sat lessons always starts on sat
              if (
                saturday === 7 &&
                Math.floor((item.start - date) / 604800000) % 2 === 0
              ) {
                room[i].push(item);
              } else if (
                saturday === 8 &&
                Math.floor((item.start - date) / 604800000) % 2 !== 0
              ) {
                room[i].push(item);
              } else if (saturday === 6) {
                room[i].push(item);
              }
            }
          }
        }
      }
    }
    return room;
  }

  return (
    <div className={styles.weekalendar_container}>
      <table className={styles.weekalendar_headers}>
        <thead>
          <tr>
            <td>Room</td>
            {week_dates.map((item, idx) => {
              const dateArr = item.toDateString().split(" ");
              return (
                <td key={idx}>
                  <div>{`${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`}</div>
                  <div>{dateArr[0]}</div>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {resolveClassesToDates(courses).map((item, idx) => {
            return <WeekalendarRow key={idx} id={idx + 1} columns={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Weekalendar;
