import video from "./assets/SIP&SEE_INVITE.mp4";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import RsvpForm from "./RsvpForm";

const Video = (): JSX.Element => {
  return (
    <div className="h-screen w-screen absolute top-0 right-0 left-0 bottom-0 bg-[#2B6065]">
      <div className="relative">
        <video playsInline autoPlay loop muted className="w-full h-full">
          <source src={video} type="video/mp4" />
        </video>
        <div className="z-20 flex flex-col gap-y-4 items-center object-bottom inset-x-0 bottom-0 p-5 bg-[#2B6065]">
          <RsvpForm />
          <div className="bg-[#2B6065]">
            <AddToCalendarButton
              name="🍼 REDACTED & REDACTED - Sip & See 👶"
              styleLight="--btn-text: #2f4377; --btn-background: #fff;"
              options={["Apple", "Google"]}
              location="World Wide Web"
              startDate="2023-05-06"
              endDate="2023-05-06"
              startTime="13:00"
              endTime="14:30"
              timeZone="America/Los_Angeles"
              icsFile="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N2U4dWRqdmtlc2puMXZmZWJ1MG5lNTcyYnYgdHJvd2lsbGlhbXNAbQ&tmsrc={}"
              buttonStyle="round"
              // label="Add to Calendar"
              hideCheckmark
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Video;
