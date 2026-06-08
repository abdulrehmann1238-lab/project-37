"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";

export default function ReservationWizardPage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse step parameter from URL for instant demo console teleporting
  const stepParam = searchParams.get("step");
  const initialStep = stepParam ? parseInt(stepParam, 10) : 1;

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Sync state if stepParam updates from Demo Console
  useEffect(() => {
    if (stepParam) {
      setCurrentStep(parseInt(stepParam, 10));
    }
  }, [stepParam]);

  // Form State
  const [truckName, setTruckName] = useState("Fire & Slice Pizza");
  const [cuisineType, setCuisineType] = useState("Italian / Woodfired");
  const [truckLength, setTruckLength] = useState("28ft");
  const [powerRequired, setPowerRequired] = useState("50A");
  const [permitLicense, setPermitLicense] = useState("SF-FT-94021");

  // Payment Form State
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("424");
  const [cardZip, setCardZip] = useState("94111");

  // Selection Info (Pre-filled or customized)
  const spotName =
    id === "soma-plaza" ? "Soma Plaza Courtyard" : "Pier 14 Water Terminal";
  const spotCategory = id === "soma-plaza" ? "Office Hubs" : "Waterfront";
  const selectedDate = searchParams.get("date") || "2026-06-12";
  const selectedShift = searchParams.get("shift") || "morning";

  const getShiftLabel = () => {
    if (selectedShift === "full") return "Full-Day Shift (10am - 9pm)";
    if (selectedShift === "evening") return "Dinner Shift (4pm - 9pm)";
    return "Lunch Shift (10am - 3pm)";
  };

  const getPrice = () => {
    let rate = 180;
    if (id === "soma-plaza") rate = 220;
    if (selectedShift === "full") return rate * 1.6;
    if (selectedShift === "evening") return rate * 1.1;
    return rate;
  };

  const stepNames = [
    "Choose Location",
    "Choose Date",
    "Select Time",
    "Business Information",
    "Review",
    "Payment Demo",
    "Success",
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      if (currentStep === 6) {
        // Trigger simulated payment loading state
        setIsProcessingPayment(true);
        setTimeout(() => {
          setIsProcessingPayment(false);
          setCurrentStep(7);
        }, 2200);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Horizontal Progress Timeline */}
        <div className="bg-brand-cream/40 border border-brand-navy/5 p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between text-[10px] text-brand-slate font-bold uppercase tracking-wider font-mono mb-2">
            <span>Step {currentStep} of 7</span>
            <span className="text-brand-teal">
              {stepNames[currentStep - 1]}
            </span>
          </div>

          <div className="w-full bg-brand-cream-dark/50 h-1.5 rounded-full overflow-hidden flex">
            {Array.from({ length: 7 }).map((_, idx) => {
              const stepIndex = idx + 1;
              const isCompleted = stepIndex < currentStep;
              const isActive = stepIndex === currentStep;
              return (
                <div
                  key={idx}
                  className={`flex-1 h-full border-r last:border-0 border-brand-warm-white transition-all duration-300 ${
                    isCompleted
                      ? "bg-brand-navy"
                      : isActive
                        ? "bg-brand-teal"
                        : "bg-brand-cream-dark/30"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Wizard Panel Content */}
        <div className="bg-white border border-brand-navy/5 rounded-3xl p-6 sm:p-8 shadow-xl relative min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 flex-grow"
            >
              {/* STEP 1: CHOOSE LOCATION */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                    STEP 1: LOCATION SELECTION
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Confirm target reservation spot
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold">
                    You have selected the following location for booking.
                  </p>

                  <div className="p-5 rounded-2xl bg-brand-cream/40 border border-brand-navy/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-brand-teal shadow-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-brand-cream border border-brand-navy/5 px-2 py-0.5 rounded-full text-brand-slate">
                        {spotCategory}
                      </span>
                      <h4 className="text-base font-extrabold text-brand-navy mt-1">
                        {spotName}
                      </h4>
                      <p className="text-[10px] text-brand-slate font-medium">
                        Zone A Corridor • San Francisco
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE DATE */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                    STEP 2: DATE CALENDAR
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Confirm booking date
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold">
                    Verify date slot compatibility. Dates are checked live for
                    city permitting schedules.
                  </p>

                  <div className="p-5 rounded-2xl bg-brand-cream/40 border border-brand-navy/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-brand-teal shadow-md">
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        SELECTED DATE
                      </span>
                      <h4 className="text-lg font-extrabold text-brand-navy mt-1">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: SELECT TIME */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                    STEP 3: SHIFT SELECT
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Confirm shift slot
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold">
                    Standard lunch and dinner blocks help coordinate peak
                    delivery corridors.
                  </p>

                  <div className="p-5 rounded-2xl bg-brand-cream/40 border border-brand-navy/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-brand-teal shadow-md">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        RESERVED SHIFT
                      </span>
                      <h4 className="text-lg font-extrabold text-brand-navy mt-1">
                        {getShiftLabel()}
                      </h4>
                      <p className="text-[10px] text-brand-slate font-medium">
                        Daily spot rate: ${getPrice()}/shift
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: BUSINESS INFORMATION */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                    STEP 4: VENDOR PROFILE
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Business registration
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold mb-4">
                    Provide food truck registration and license credentials for
                    municipal audit logs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        Truck / Brand Name
                      </label>
                      <input
                        type="text"
                        value={truckName}
                        onChange={(e) => setTruckName(e.target.value)}
                        className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        Cuisine Category
                      </label>
                      <input
                        type="text"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        Truck Length (Max 32ft)
                      </label>
                      <input
                        type="text"
                        value={truckLength}
                        onChange={(e) => setTruckLength(e.target.value)}
                        className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                        Permit License Number
                      </label>
                      <input
                        type="text"
                        value={permitLicense}
                        onChange={(e) => setPermitLicense(e.target.value)}
                        className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                    STEP 5: BOOKING CONFIRMATION
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Review booking details
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold mb-4">
                    Please verify spot selection, shifts, and business
                    information before checking out.
                  </p>

                  <div className="bg-brand-cream/35 border border-brand-navy/5 rounded-2xl p-5 space-y-3 text-xs text-brand-slate font-semibold">
                    <div className="flex justify-between border-b border-brand-navy/5 pb-2">
                      <span>Reserved Spot</span>
                      <span className="text-brand-navy font-extrabold">
                        {spotName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-brand-navy/5 pb-2">
                      <span>Date</span>
                      <span className="text-brand-navy font-extrabold">
                        {selectedDate}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-brand-navy/5 pb-2">
                      <span>Shift</span>
                      <span className="text-brand-navy font-extrabold">
                        {getShiftLabel()}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-brand-navy/5 pb-2">
                      <span>Truck Brand</span>
                      <span className="text-brand-navy font-extrabold">
                        {truckName}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-sm text-brand-navy">
                      <span>Total Invoice</span>
                      <span className="font-mono text-brand-teal font-extrabold">
                        ${(getPrice() + 15).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: STRIPE PAYMENT SIMULATOR */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest font-mono">
                      STEP 6: SECURE CHECKOUT
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-500 font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>STRIPE CHECKOUT SIMULATOR</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Simulate credit card payment
                  </h2>
                  <p className="text-xs text-brand-slate font-semibold">
                    Use any card details for checkout. No actual money will be
                    charged.
                  </p>

                  {/* Credit Card Wrapper */}
                  <div className="p-6 rounded-2xl bg-brand-navy text-brand-warm-white space-y-6 shadow-xl relative overflow-hidden border border-white/10">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="w-full h-full bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-6 h-6 text-brand-teal" />
                        <span className="text-xs font-bold tracking-widest font-mono">
                          SpotReserve Payout
                        </span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-slate-300 font-mono">
                        DEMO MODE
                      </span>
                    </div>

                    {/* Card inputs */}
                    <div className="space-y-4 relative z-10">
                      <div className="space-y-1">
                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widwider font-mono">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-sm font-semibold font-mono bg-white/10 border border-white/10 focus:border-brand-teal/60 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 space-y-1">
                          <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widwider font-mono">
                            Expiry
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full text-xs font-semibold font-mono bg-white/10 border border-white/10 focus:border-brand-teal/60 rounded-xl px-3 py-2.5 text-white focus:outline-none text-center"
                          />
                        </div>
                        <div className="col-span-1 space-y-1">
                          <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widwider font-mono">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            className="w-full text-xs font-semibold font-mono bg-white/10 border border-white/10 focus:border-brand-teal/60 rounded-xl px-3 py-2.5 text-white focus:outline-none text-center"
                          />
                        </div>
                        <div className="col-span-1 space-y-1">
                          <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widwider font-mono">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            value={cardZip}
                            onChange={(e) => setCardZip(e.target.value)}
                            placeholder="ZIP"
                            className="w-full text-xs font-semibold font-mono bg-white/10 border border-white/10 focus:border-brand-teal/60 rounded-xl px-3 py-2.5 text-white focus:outline-none text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-[10px] text-brand-slate font-medium bg-brand-cream/40 p-3 rounded-xl border border-brand-navy/5">
                    <Info className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                    <span>
                      Payment simulates a secured Stripe transaction. Direct
                      bank transfers are optimized upon completion.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 7: RESERVATION SUCCESS TICKETS */}
              {currentStep === 7 && (
                <div className="space-y-6 flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <span className="absolute inline-flex h-20 w-20 rounded-full bg-emerald-500/20 pulse-ring -top-2.5 -left-2.5"></span>
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 relative z-10" />
                  </div>

                  <div className="space-y-2 max-w-sm">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest font-mono">
                      BOOKING CONFIRMED & PERMITTED
                    </span>
                    <h2 className="text-2xl font-extrabold text-brand-navy">
                      Reservation Successful!
                    </h2>
                    <p className="text-xs text-brand-slate font-semibold">
                      Your location spot has been booked. City municipal permits
                      are authorized and signed.
                    </p>
                  </div>

                  {/* Receipt Ticket with QR Code placeholder */}
                  <div className="w-full bg-brand-cream/35 border border-brand-navy/5 rounded-2xl p-5 space-y-4 text-left max-w-md">
                    <div className="flex justify-between border-b border-brand-navy/10 pb-3">
                      <div>
                        <span className="block text-[8px] text-brand-slate font-bold uppercase font-mono">
                          BOOKING REFERENCE
                        </span>
                        <span className="text-sm font-extrabold text-brand-navy font-mono">
                          SR-6092-B14
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] text-brand-slate font-bold uppercase font-mono">
                          STATUS
                        </span>
                        <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-brand-slate">
                      <div>
                        <span className="block text-[8px] font-bold uppercase font-mono">
                          Spot Location
                        </span>
                        <span className="text-brand-navy font-bold">
                          {spotName}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold uppercase font-mono">
                          Shift Block
                        </span>
                        <span className="text-brand-navy font-bold">
                          {selectedShift === "full"
                            ? "Full-Day"
                            : selectedShift === "evening"
                              ? "Dinner"
                              : "Lunch"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold uppercase font-mono">
                          Date
                        </span>
                        <span className="text-brand-navy font-bold">
                          {selectedDate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold uppercase font-mono">
                          Operator
                        </span>
                        <span className="text-brand-navy font-bold">
                          {truckName}
                        </span>
                      </div>
                    </div>

                    {/* QR Code Vector Mock */}
                    <div className="border-t border-brand-navy/10 pt-4 flex items-center justify-between">
                      <div className="w-16 h-16 bg-white border border-brand-navy/10 p-1 rounded-lg flex items-center justify-center shrink-0">
                        {/* Styled QR Block SVG */}
                        <svg
                          className="w-full h-full text-brand-navy"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                        >
                          <rect x="0" y="0" width="30" height="30" />
                          <rect
                            x="10"
                            y="10"
                            width="10"
                            height="10"
                            fill="#fff"
                          />
                          <rect x="70" y="0" width="30" height="30" />
                          <rect
                            x="80"
                            y="10"
                            width="10"
                            height="10"
                            fill="#fff"
                          />
                          <rect x="0" y="70" width="30" height="30" />
                          <rect
                            x="10"
                            y="80"
                            width="10"
                            height="10"
                            fill="#fff"
                          />
                          <rect x="40" y="40" width="20" height="20" />
                          <rect x="40" y="10" width="10" height="20" />
                          <rect x="70" y="40" width="20" height="10" />
                          <rect x="10" y="40" width="20" height="20" />
                          <rect x="80" y="80" width="20" height="20" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] text-brand-slate font-bold uppercase font-mono">
                          PAID AMOUNT
                        </span>
                        <span className="text-lg font-extrabold text-brand-teal font-mono">
                          ${(getPrice() + 15).toFixed(2)}
                        </span>
                        <span className="block text-[8px] text-brand-slate font-semibold mt-1">
                          Receipt emailed to owner
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Navigation Controls */}
          {currentStep < 7 && (
            <div className="border-t border-brand-navy/5 mt-8 pt-6 flex items-center justify-between bg-white shrink-0">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-xs font-bold text-brand-navy transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={isProcessingPayment}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-md shadow-brand-navy/10"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-3 h-3 rounded-full border border-brand-warm-white border-t-transparent animate-spin inline-block mr-1"></span>
                    <span>Processing Secure Payment...</span>
                  </>
                ) : currentStep === 6 ? (
                  <>
                    <span>Pay ${(getPrice() + 15).toFixed(2)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Success actions redirect */}
          {currentStep === 7 && (
            <div className="border-t border-brand-navy/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 bg-white shrink-0">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-brand-warm-white text-xs font-bold text-center transition-all"
              >
                Go to Owner Dashboard
              </Link>
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-brand-navy text-xs font-bold text-center transition-all"
              >
                Browse Marketplace
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
