import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { LandingPage } from './components/public/LandingPage';
import { FindWorkersPage } from './components/public/FindWorkersPage';
import { ServicesPage } from './components/public/ServicesPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage } from './components/public/ContactPage';

// Dashboards
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { BookServiceModal } from './components/customer/BookServiceModal';
import { PaymentModal } from './components/customer/PaymentModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { ReviewModal } from './components/customer/ReviewModal';
import { EmergencyServiceModal } from './components/customer/EmergencyServiceModal';

import { Worker, ServiceItem, Booking, PaymentRecord } from './types';

const MainAppContent: React.FC = () => {
  const { activePage, currentUser, bookings, payments } = useApp();

  // Global modal states
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedWorkerForBook, setSelectedWorkerForBook] = useState<Worker | null>(null);
  const [selectedServiceForBook, setSelectedServiceForBook] = useState<ServiceItem | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<Booking | null>(null);

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedPaymentForReceipt, setSelectedPaymentForReceipt] = useState<PaymentRecord | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleOpenBookModal = (worker?: Worker, service?: ServiceItem) => {
    setSelectedWorkerForBook(worker || null);
    setSelectedServiceForBook(service || null);
    setIsBookModalOpen(true);
  };

  const handleOpenPaymentModal = (booking: Booking) => {
    setSelectedBookingForPayment(booking);
    setIsPaymentModalOpen(true);
  };

  const handleOpenReviewModal = (booking: Booking) => {
    setSelectedBookingForReview(booking);
    setIsReviewModalOpen(true);
  };

  const handleOpenReceiptModal = (payment: PaymentRecord) => {
    setSelectedPaymentForReceipt(payment);
    setIsReceiptModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <LandingPage
            onOpenBooking={handleOpenBookModal}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        );
      case 'find-workers':
        return (
          <FindWorkersPage
            onSelectWorker={(worker) => handleOpenBookModal(worker)}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onSelectService={(service) => handleOpenBookModal(undefined, service)}
          />
        );
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            onOpenBooking={() => handleOpenBookModal()}
            onOpenPayment={handleOpenPaymentModal}
            onOpenReview={handleOpenReviewModal}
            onOpenReceipt={handleOpenReceiptModal}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        );
      case 'worker-dashboard':
        return <WorkerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return (
          <LandingPage
            onOpenBooking={handleOpenBookModal}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar onOpenEmergency={() => setIsEmergencyModalOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Booking Service Modal */}
      {isBookModalOpen && (
        <BookServiceModal
          initialWorker={selectedWorkerForBook}
          initialService={selectedServiceForBook}
          isOpen={isBookModalOpen}
          onClose={() => {
            setIsBookModalOpen(false);
            setSelectedWorkerForBook(null);
            setSelectedServiceForBook(null);
          }}
        />
      )}

      {/* Cashless Payment Modal */}
      {isPaymentModalOpen && selectedBookingForPayment && (
        <PaymentModal
          booking={selectedBookingForPayment}
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedBookingForPayment(null);
          }}
          onViewReceipt={(payment) => {
            setSelectedPaymentForReceipt(payment);
            setIsReceiptModalOpen(true);
          }}
        />
      )}

      {/* Digital Receipt Modal */}
      {isReceiptModalOpen && selectedPaymentForReceipt && (
        <ReceiptModal
          payment={selectedPaymentForReceipt}
          isOpen={isReceiptModalOpen}
          onClose={() => {
            setIsReceiptModalOpen(false);
            setSelectedPaymentForReceipt(null);
          }}
        />
      )}

      {/* Performance Review Modal */}
      {isReviewModalOpen && selectedBookingForReview && (
        <ReviewModal
          booking={selectedBookingForReview}
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setSelectedBookingForReview(null);
          }}
        />
      )}

      {/* Emergency SOS Dispatch Modal */}
      {isEmergencyModalOpen && (
        <EmergencyServiceModal
          isOpen={isEmergencyModalOpen}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
