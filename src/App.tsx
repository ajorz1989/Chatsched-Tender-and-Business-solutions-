import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { SavedListsProvider } from "./contexts/SavedListsContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import RequireAuth from "./components/RequireAuth";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsentBanner from "./components/CookieConsentBanner";
import CookieConsentScript from "./components/CookieConsentScript";
import CtaTracker from "./components/CtaTracker";
import { SchedyLoader } from "./components/schedy";
import Home from "./pages/Home";
import BackToTop from "./components/BackToTop";

// Everything below is lazy-loaded. Same reasoning as the original MapView
// case (kept below, with its own nested Suspense for a page-shaped
// fallback), just applied across the board now that the app has grown to
// 40+ pages: no visitor needs the Admin panel's bundle (which pulls in
// AdminAnalytics/AdminChannelRequests/AdminPayouts/AdminSecurity along
// with it, since those are imported inside Admin.tsx, not routed here
// directly), the Marketing Suite's bundle, or the MFA/auth flow's bundle
// just to load Home. Home/Browse/PublisherProfile stay eager because
// they're the most common first-paint targets — a fresh visit from
// search, social, or a shared link — where an extra chunk fetch before
// anything renders would cost more than it saves.
const TenderAbout = lazy(() => import("./pages/TenderAbout"));
const TenderTrust = lazy(() => import("./pages/TenderTrust"));
const TenderPricing = lazy(() => import("./pages/TenderPricing"));
const TenderHowItWorks = lazy(() => import("./pages/TenderHowItWorks"));
const TenderFaq = lazy(() => import("./pages/TenderFaq"));
const TenderReadiness = lazy(() => import("./pages/TenderReadiness"));
const Tenders = lazy(() => import("./pages/Tenders"));
const TenderFeed = lazy(() => import("./pages/TenderFeed"));
const BidSupport = lazy(() => import("./pages/BidSupport"));
const ComplianceSetup = lazy(() => import("./pages/ComplianceSetup"));
const Consult = lazy(() => import("./pages/Consult"));
const Services = lazy(() => import("./pages/Services"));
const Tools = lazy(() => import("./pages/Tools"));
const ForPartners = lazy(() => import("./pages/ForPartners"));
const Contact = lazy(() => import("./pages/Contact"));
// Advertise + Investors merged into CollaborateWithUs — old URLs redirect below
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const MfaSetup = lazy(() => import("./pages/MfaSetup"));
const MfaVerify = lazy(() => import("./pages/MfaVerify"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));


function RoutedContent() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-[page-fade-in_150ms_ease-out]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<TenderPricing />} />
        <Route path="/tender-readiness" element={<TenderReadiness />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/tenders/feed" element={<TenderFeed />} />
        <Route path="/bid-support" element={<BidSupport />} />
        <Route path="/compliance-setup" element={<ComplianceSetup />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/for-partners" element={<ForPartners />} />
        <Route path="/how-it-works" element={<TenderHowItWorks />} />
        <Route path="/trust" element={<TenderTrust />} />
        <Route path="/faq" element={<TenderFaq />} />
        <Route path="/about" element={<TenderAbout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/tender-readiness" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/mfa-setup" element={<MfaSetup />} />
        <Route path="/mfa-verify" element={<MfaVerify />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/admin" element={<RequireAuth role="admin"><Admin /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ComparisonProvider>
          <SavedListsProvider>
            <CookieConsentProvider>
              <div className="min-h-screen flex flex-col">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-billboard-ink focus:text-billboard-paper focus:font-semibold focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-billboard-green">
                  Skip to main content
                </a>
                <CookieConsentScript />
                <CtaTracker />
                <Header />
                <main id="main-content" tabIndex={-1} className="flex-1 pb-bottom-nav outline-none">
                  <ErrorBoundary>
                    <Suspense fallback={<SchedyLoader />}>
                      <RoutedContent />
                    </Suspense>
                  </ErrorBoundary>
                </main>
                <Footer />
                <BottomNav />
                <BackToTop />
                <CookieConsentBanner />
              </div>
            </CookieConsentProvider>
          </SavedListsProvider>
        </ComparisonProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
