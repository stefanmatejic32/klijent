import firebaseConfig from "../configfb";

export default function Header() {
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebaseConfig.auth().signOut();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="position-relative">
      <nav className="navbar navbar-light bg-success d-flex justify-content-center ">
        <h3 className="text-white">Appointment Booking</h3>
      </nav>
      <button
        className="position-absolute btn btn-danger  px-4 m-4"
        onClick={handleSubmit}
      >
        Log out
      </button>
    </div>
  );
}
