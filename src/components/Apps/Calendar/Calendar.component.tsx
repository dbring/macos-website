import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import clsx from "clsx";
import { addMonths, format } from "date-fns";
import { useAtom } from "jotai";
import { Suspense, lazy, useState } from "react";
import { calendarAppStore } from "../../../stores/Calendar.store";
import { AppIcon } from "../../Utils/AppIcon.component";
import "./Calendar.styles.scss";

const DayView = lazy(() => import("./Views/DayView.component"));
const MonthView = lazy(() => import("./Views/MonthView.component"));
const WeekView = lazy(() => import("./Views/WeekView.component"));
const YearView = lazy(() => import("./Views/YearView.component"));

type ViewOptions = "year" | "month" | "week" | "day";

const Calendar = () => {
  const [view] = useState<ViewOptions>("month");
  const [selectedDate, setSelectedDate] = useAtom(calendarAppStore);

  const goToday = () => {
    setSelectedDate(new Date());
  };

  const goPrevMonth = () => {
    setSelectedDate(addMonths(selectedDate, -1));
  };

  const goNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <section className="calendar-container">
      <header
        className={clsx("app-window-drag-handle", "calendar-titleBar")}
      ></header>

      <section className="calendar-mainArea">
        <div className="calendarHeader">
          <div>
            <span className="month">{format(selectedDate, "MMMM")}</span>{" "}
            <span className="year">{format(selectedDate, "yyyy")}</span>
          </div>
          <div className="calendar-controlButtons">
            <button onClick={goPrevMonth}>
              <AppIcon size={18} path={mdiChevronLeft} />
            </button>
            <button onClick={goToday}>Today</button>
            <button onClick={goNextMonth}>
              <AppIcon size={18} path={mdiChevronRight} />
            </button>
          </div>
        </div>
        <Suspense fallback={<></>}>
          {view === "year" && <YearView />}
          {view === "month" && <MonthView />}
          {view === "week" && <WeekView />}
          {view === "day" && <DayView />}
        </Suspense>
      </section>
    </section>
    // </CalendarAppContext.Provider>
  );
};
function isLeapYear(arg0: number) {
  throw new Error("Function not implemented.");
}

export default Calendar;
