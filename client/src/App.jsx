// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowseGuides from "./pages/BrowseGuides";
import GuideProfile from "./pages/GuideProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import GuidePanel from "./pages/GuidePanel";
import "bootstrap/dist/css/bootstrap.min.css";
import GuideRegisterForm from "./pages/GuideRegisterForm";
import AuthenticatedUserProfile from "./pages/AuthenticatedUserProfile";
import PaymentTest from "./pages/Payment";
import AdvanceSearch from "./components/AdvanceSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TourPackages from "./pages/TourPackages";
import PackageManageForm from "./pages/PackageManageForm";
import PackageManagerPanel from "./pages/PackageMangerPanel";
import ManagePackages from "./pages/ManagePackages";
import AddTourPackage from "./pages/AddSpare";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Booking from "./pages/Booking";
import BookingPage from "./pages/BookingCustomer";
import BookingPageAdmin from "./pages/BookingAdmin";
import LanguageTranslator from "./pages/LanguageTranslator";
import { WeatherComponent } from "./pages/Weather";
import BookingPageGuide from "./pages/BookingGuide";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse-guides" element={<BrowseGuides />} />
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-package" element={<PackageManageForm />} />
        <Route path="/guide_profile" element={<GuideProfile />} />
        <Route path="/signup-guide" element={<GuideRegisterForm />} />
        <Route path="/guide-panel" element={<GuidePanel />} />
        {/* user profile page */}
        <Route path="/profile" element={<AuthenticatedUserProfile />} />
        {/* Admin and Guide Routes */}g
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/package-panel" element={<ManagePackages />} />
        <Route path="/packages/add-package" element={<AddTourPackage />} />
        <Route path="/admin/bookings" element={<BookingPageAdmin />} />
        <Route path="/item/:itemId" element={<ItemDetailsPage />} />
        <Route path="/payment/:itemid/:price" element={<Booking />} />
        {/* Booking & payment */}
        <Route path="/paymentguide/:guideid/:fee" element={<PaymentTest />} />
        <Route path="/AdvanceSearch" element={<AdvanceSearch />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/bookings-guide" element={<BookingPageGuide />} />
        <Route path="/translator" element={<LanguageTranslator />} />
        <Route path="/weather" element={<WeatherComponent />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
