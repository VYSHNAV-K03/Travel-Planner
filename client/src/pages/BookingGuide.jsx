import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../utils/axiosConfig";

const BookingPageGuide = () => {
  const [packageBookings, setPackageBookings] = useState([]);
  const [guidebookings, setguidebookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/cart/bookings"); // Fetch tour package bookings
        setPackageBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  console.log("packageBookings", packageBookings);
  console.log("guidebookings", guidebookings);

  // Function to cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axiosInstance.patch(`/cart/bookings/${bookingId}/cancel`); // Update booking status
      setPackageBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      alert("Booking has been cancelled.");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    const fetchBookingsGuide = async () => {
      try {
        const response = await axiosInstance.get("/cart/bookings/guidepanel"); // Fetch tour package bookings
        setguidebookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookingsGuide();
  }, []);

  console.log("packageBookings", packageBookings);

  // Function to cancel booking
  const handleCancelBookingGuide = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axiosInstance.patch(`/cart/bookings/${bookingId}/cancel/guide`); // Update booking status
      setguidebookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      alert("Booking has been cancelled.");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking.");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      {guidebookings.length === 0 ? (
        <div className="text-center">
          <p>You have no guide bookings yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>User Name</th>
                <th>Contact</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {guidebookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking._id}</td>
                  <td>{booking.userId?.name}</td>
                  <td>{booking.userId?.email}</td>
                  <td>${booking.amountPaid}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPageGuide;
