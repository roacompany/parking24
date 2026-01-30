import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const VehicleInfo = lazy(() => import('./pages/VehicleInfo'));
const ReservationInfo = lazy(() => import('./pages/ReservationInfo'));
const ReservationComplete = lazy(() => import('./pages/ReservationComplete'));
const ReservationLookup = lazy(() => import('./pages/ReservationLookup'));
const SpecialParkingDetail = lazy(() => import('./pages/SpecialParkingDetail'));
const UsageGuide = lazy(() => import('./pages/UsageGuide'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CustomerService = lazy(() => import('./pages/CustomerService'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminReservations = lazy(() => import('./pages/AdminReservations'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const CompanyInfo = lazy(() => import('./pages/CompanyInfo'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const BusinessInfo = lazy(() => import('./pages/BusinessInfo'));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-info" element={<VehicleInfo />} />
          <Route path="/reservation-info" element={<ReservationInfo />} />
          <Route path="/reservation-complete" element={<ReservationComplete />} />
          <Route path="/reservation-lookup" element={<ReservationLookup />} />
          <Route path="/special-parking/:specialId" element={<SpecialParkingDetail />} />
          <Route path="/usage-guide" element={<UsageGuide />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/business-info" element={<BusinessInfo />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;