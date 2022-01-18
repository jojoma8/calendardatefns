function OurDoctors() {
  return (
    <div>
      <div className="bg-cyan-50 px-20">
        <div className="headerText text-4xl pt-20">Our Doctors</div>
        <div className="bodyText  pt-10 pb-20">
          NXTgen E-Clinic offers access to expert specialists via a secured
          video consultation platform. Scroll down to see our doctors’ profiles,
          specialty and schedule. Consultation fees already include
          e-prescription and lab requests, if deemed necessary. Fees vary per
          doctor but start as low as PHP 670.
        </div>
        <div className="pb-10">
          <button
            className="btn py-3 text-white
         w-full sm:w-3/6"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="m-10 border-2">
            <div className="flex  bg-cyan-50">
              <div
                className="w-32 h-32 bg-sky-300 rounded-full my-10 p-16 m-10
                    border-4 border-orange-500"
              ></div>
              <div className="py-5">
                <div className="headerText pt-5 text-xl">
                  Otorhinolaryngology - Head and Neck Surgery (ENT)
                </div>
                <div className="bodyText pt-5 ">
                  Specializes in the management of medical conditions of the
                  ears, nose and sinuses, throat, voice box; and performs
                  procedures and/or surgeries for obstructive conditions and
                  tumors of the head and neck including thyroid masses and
                  cancers.
                </div>
                <div className="linkText pt-5">See our doctors</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="m-5 border-2 w-5/12 flex flex-col justify-center items-center p-5">
                <div
                  className="w-32 h-32 bg-gray-300 rounded-full my-5 p-16 m-10
                    border-4 border-sky-200 "
                ></div>
                <div className="headerText text-lg pb-2">Doc Daryl</div>
                <div className="bodyText2 pb-2 text-center">
                  Otorhinolaryngology (Ear, Nose and Throat) - Head and Neck
                  Surgery; Laryngology
                </div>
                <div className="linkText">Clinic Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurDoctors;
