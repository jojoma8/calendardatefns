import ClinicHoursSummary from "./ClinicHoursSummary";
import { FaCalendarAlt } from "react-icons/fa";

function SpecialistCard({ name, speciality, schedule }) {
  return (
    <div className="m-5 border-2 w-72 flex flex-col justify-center items-center p-5">
      <div
        className="w-32 h-32 bg-gray-300 rounded-full my-5 p-16 m-10
                    border-4 border-sky-200 "
      ></div>
      <div className="headerText text-lg pb-2">{name}</div>

      <div className="bodyText2 pb-2 text-center">{speciality}</div>
      <div className=" border-2 border-blue-550 rounded-md">
        <div
          className="flex justify-between px-4 py-2 bg-blue-550 text-white
          rounded-t-sm"
        >
          <div className="text-sm">CLINIC HOURS</div>
          <div className="flex  items-center ">
            <FaCalendarAlt className="text-sm" />
          </div>
        </div>
        {schedule != null && (
          <div className="m-2">
            <ClinicHoursSummary day={"Mon"} schedule={schedule} />
            <ClinicHoursSummary day={"Tue"} schedule={schedule} />
            <ClinicHoursSummary day={"Wed"} schedule={schedule} />
            <ClinicHoursSummary day={"Thu"} schedule={schedule} />
            <ClinicHoursSummary day={"Fri"} schedule={schedule} />
            <ClinicHoursSummary day={"Sat"} schedule={schedule} />
            <ClinicHoursSummary day={"Sun"} schedule={schedule} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecialistCard;
