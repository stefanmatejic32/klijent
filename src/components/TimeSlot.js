import React, { useState, useEffect, useCallback } from "react";
import apibooking from "../api/apibooking";
export default function TimeSlot(props) {
  const { selectDate } = props;
  const [timesavailable, setTimesavailable] = useState([]);
  const [selected, setSelected] = useState("");

  const getAvailability = useCallback(
    async (selectDate) => {
      const selectDateDate = new Date(selectDate);
      const response = await apibooking.get("/timeslots", {
        headers: {},
        params: {
          year: selectDateDate.getYear() + 1900,
          month: selectDateDate.getMonth() + 1,
          day: selectDateDate.getDate(),
        },
      });

      setTimesavailable(response.data.timeslots);
    },
    [setTimesavailable]
  );

  useEffect(() => {
    getAvailability(selectDate);
  }, [getAvailability, selectDate]);

  function addHourTimezone(item) {
    var itemhour = item.substring(0, 2);
    var inttime = parseInt(itemhour);
    inttime = inttime + 1; //add hour to int
    itemhour = inttime.toString();
    var itemminute = item.substring(3, 5); // return to string
    return itemhour + ":" + itemminute;
  }
  function onButtonClick(item) {
    props.onClickProp(item);

    setSelected(item);
  }
  return (
    <div className="card text-center bg-light">
      {!timesavailable && (
        <h5 className="card-title  p-2">No times available for this date</h5>
      )}
      {timesavailable && (
        <h5 className="card-title  p-2">
          Please select one of available times
        </h5>
      )}
      {timesavailable && (
        <div className="card-body">
          {timesavailable.map((item) => (
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              key={item.startTime}
              onClick={() => onButtonClick(item)}
            >
              {addHourTimezone(
                item.startTime.substring(1, item.startTime.length - 4)
              )}
              {selected == item && <div>selected</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
