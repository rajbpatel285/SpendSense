import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Contact from "./views/ContactUs";
import FAQ from "./views/FAQ";
import Login from "./views/Login";
import Registration from "./views/Registration";
import Password from "./views/PasswordReset";
import NavBar from "./utils/NavBar";
import PersonalTransaction from "./views/PersonalTransaction/PersonalTransaction";
import AddTransaction from "./views/PersonalTransaction/AddTransaction";
import GroupExpenseDashboard from "./views/GroupExpensesDashboard";
import GroupHistory from "./views/GroupHistory";
import LandingPage from "./views/LandingPage";
import Trends from "./views/DisplayTrend";
import Reports from "./views/ExpenseReport";
import Profile from "./views/ProfilePage";
import CalendarView from "./views/CalenderView";
import { isTokenValid } from "./views/Login/auth";
import UpdateExpensePage from "./views/PersonalTransaction/UpdateExpensePage";
import UpdateIncomePage from "./views/PersonalTransaction/UpdateIncomePage";
import GroupExpenseHomepage from "./views/GroupExpenseHomepage";
import PersonalExpenseHomepage from "./views/PersonalExpenseHomepage";
import AnalyticsHomepage from "./views/AnalyticsHomepage";
import GroupTransaction from "./views/GroupTransaction";
import PricingPage from "./views/Pricing";

const Router = () => {
  const location = useLocation();
  const isValidToken = isTokenValid();
  console.log("isValidToken", isValidToken);
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<NavBar />}>
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Login />} />
        <Route path="/passwordreset" element={<Password />} />
        <Route path="/register" element={<Registration />} />
      </Route>
      {isValidToken ? (
        <Route path="/" element={<NavBar />}>
          <Route path="/homepage" element={<LandingPage />} />

          <Route path="/personal" element={<PersonalTransaction />} />
          <Route path="/addTransaction" element={<AddTransaction />} />
          <Route path="/update/Expense" element={<UpdateExpensePage />} />
          <Route path="/update/Income" element={<UpdateIncomePage />} />
          <Route path="/calender" element={<CalendarView />} />
          <Route path="/groupHistory" element={<GroupHistory />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groupTransaction" element={<GroupTransaction />} />
          <Route
            path="/groupExpenseDashboard"
            element={<GroupExpenseDashboard />}
          />
          <Route
            path="/groupexpensehomepage"
            element={<GroupExpenseHomepage />}
          />
          <Route
            path="/personalExpenseHomepage"
            element={<PersonalExpenseHomepage />}
          />
          <Route path="/analyticsHomepage" element={<AnalyticsHomepage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default Router;
