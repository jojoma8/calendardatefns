import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";

function TemplateModal() {
  const currentUser = useAuth();
  //   const { editHolidaysModal, setEditHolidaysModal } = useSignInContext();
  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        // setEditHolidaysModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Holiday Details</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-2">
          <div className="flex flex-col">
            <div>{currentUser?.displayName}</div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
          font-bold py-2 
          rounded shadow-lg hover:shadow-xl transition duration-200 mt-2"
              onClick={() => {
                // handleChangeUserDetails();
              }}
            >
              Update Holidays
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TemplateModal;
