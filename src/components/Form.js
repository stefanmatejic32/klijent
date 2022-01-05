import { useState, useCallback, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import TimeSlot from "./TimeSlot";
import apibooking from "../api/apibooking";
import { AuthContext } from "../Auth";

export default function Form() {
  const { currentUser } = useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [selectDate, setSelectDate] = useState(
    new Date("Thu Jan 01 2022 00:00:00")
  );
  const [selectTime, setSelectTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [success, setSuccess] = useState(false);
  const successMessage = () => {
    return (
      <>
        {success && (
          <div className="alert alert-success m-2" role="alert">
            Your Appointment is booked
          </div>
        )}
      </>
    );
  };
  const bookAvailable = useCallback(
    async (selectDate, selectTime, userName) => {
      var selectDate = new Date(selectDate);

      let selectTimeHour = selectTime.substring(1, 3);
      let selectTimeMinute = selectTime.substring(4, 6);
      selectTimeHour = parseInt(selectTimeHour);
      selectTimeHour = selectTimeHour + 1;
      selectTimeMinute = parseInt(selectTimeMinute);
      if (selectTimeMinute == 0) {
        selectTimeMinute = "00";
      }
      const response = await apibooking.post(
        "/book",
        {},
        {
          headers: {},
          params: {
            year: selectDate.getYear() + 1900,
            month: selectDate.getMonth() + 1,
            day: selectDate.getDate(),
            hour: selectTimeHour,
            minute: selectTimeMinute,
            user: currentUser.email.toString() + " " + userName,
          },
          data: {
            year: selectDate.getYear() + 1900,
            month: selectDate.getMonth() + 1,
            day: selectDate.getDate(),
            hour: selectTimeHour,
            minute: selectTimeMinute,
            user: currentUser.email.toString() + " " + userName,
          },
        }
      );

      setSelectDate(selectDate);
      if (response.data.success == true) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    },
    [setSuccess, setSelectDate]
  );
  const bookAppointment = () => {
    setSuccess(true);
    setuserName("");
    setDescription("");
    setSelectedDate("");
  };

  const onChange = (value) => {
    setSelectDate(value);
    var date = new Date(value),
      dayOfDate = ("0" + date.getDate()).slice(-2),
      month = ("0" + (date.getMonth() + 1)).slice(-2);
    setSelectedDate([dayOfDate, month, date.getFullYear()].join("-"));
    setSuccess(false);
  };
  return (
    <>
      <div className="container">
        <div className="justify-content-center">
          <h5 className="form-floating d-flex justify-content-center p-4">
            Schedule a consultation
          </h5>
          <h5 className="form-floating d-flex justify-content-center p-4">
            {"You are logged in as " + currentUser.email}
          </h5>
          <form>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                required
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
              ></input>
              <label>Additional Message</label>
            </div>
            <div className="form-floating d-flex justify-content-center p-4">
              <div className="react-calendar ">
                <Calendar onClickDay={onChange} value={selectDate} required />
              </div>
            </div>
          </form>

          <TimeSlot
            selectDate={selectDate}
            onClickProp={(item) => setSelectTime(item.startTime)}
          ></TimeSlot>
          {successMessage()}
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-lg btn-success  p-3 m-2"
              onClick={() => bookAvailable(selectDate, selectTime, userName)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
