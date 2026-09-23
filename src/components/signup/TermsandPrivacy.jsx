import React, { useState } from "react";

export const TermsModal = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl max-w-120 w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        aria-label="Close"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Terms of Service
      </h2>

      <div className="text-sm text-gray-600 leading-7 space-y-3 text-left">
        <p className="text-gray-500">Effective Date: July 2026</p>

        <h3 className="font-semibold text-green-700 pt-2">1. Introduction</h3>
        <p>
          Welcome to SENTINOA. By accessing or using the SENTINOA website and
          wearable emergency alert system, you acknowledge that you have read,
          understood, and agreed to these Terms of Service. These terms govern
          your use of the platform, including device registration, emergency
          contact management, and the associated web-based incident logging
          services.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          2. Purpose of the Service
        </h3>
        <p>
          SENTINOA is designed as a standalone wearable emergency alert system
          that assists users during emergency situations by transmitting SMS
          notifications containing GPS location information to pre-registered
          emergency contacts. The platform also provides web-based incident
          logging whenever mobile data connectivity is available. While every
          effort has been made to design a reliable system, SENTINOA is intended
          to serve as a supplementary personal safety tool and should never be
          considered a replacement for emergency response services, law
          enforcement agencies, or medical professionals.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          3. User Responsibilities
        </h3>
        <p>
          By creating an account, you agree to provide accurate and up-to-date
          information during registration and to maintain the confidentiality of
          your login credentials. You are responsible for ensuring that your
          registered emergency contacts remain current and that your assigned
          device is used only for its intended purpose. Users are expected to
          operate the system responsibly and to avoid intentionally triggering
          false emergency alerts except during authorized testing or
          maintenance.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          4. Device Registration
        </h3>
        <p>
          Each wearable device is identified by a unique Device ID that is
          linked to a single user account. Attempting to register, modify, or
          gain unauthorized access to a device assigned to another individual is
          strictly prohibited. SENTINOA reserves the right to suspend or
          terminate accounts involved in unauthorized or fraudulent activities.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          5. Emergency Alerts & System Availability
        </h3>
        <p>
          During an emergency, the wearable device may obtain GPS coordinates,
          transmit SMS notifications to registered emergency contacts, and
          synchronize emergency records with the cloud whenever mobile data
          connectivity becomes available. The successful delivery of SMS
          messages, GPS acquisition, and cloud synchronization depends on
          factors beyond the control of the system, including mobile network
          coverage, satellite visibility, device power availability, and service
          provider reliability. Consequently, SENTINOA cannot guarantee
          uninterrupted operation under all conditions.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          6. Disclaimer & Limitation of Liability
        </h3>
        <p>
          SENTINOA is currently developed as an academic research and
          engineering project. Although the system is designed using established
          engineering principles and industry-standard technologies, users
          acknowledge that prototype limitations may exist. The developers,
          supervisors, and affiliated institutions shall not be held liable for
          any injury, loss, damage, or other consequences arising from hardware
          malfunction, communication failures, network outages, incorrect GPS
          readings, delayed message delivery, or improper use of the system.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          7. Updates to These Terms
        </h3>
        <p>
          These Terms of Service may be updated periodically as the project
          evolves and additional features become available. Continued use of the
          platform after any modifications signifies your acceptance of the
          revised terms.
        </p>
      </div>
    </div>
  </div>
);

export const PrivacyModal = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl max-w-120 w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        aria-label="Close"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold text-green-700 mb-4">Privacy Policy</h2>

      <div className="text-sm text-gray-600 leading-7 space-y-3 text-left">
        <p className="text-gray-500">Effective Date: July 2026</p>

        <h3 className="font-semibold text-green-700 pt-2">1. Introduction</h3>
        <p>
          At SENTINOA, protecting the privacy and security of user information
          is a fundamental part of our system design. This Privacy Policy
          explains what information we collect, how it is used, and the measures
          taken to protect it while using the SENTINOA platform and wearable
          emergency alert system.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          2. Information We Collect
        </h3>
        <p>
          During registration, we may collect your name, email address, assigned
          Device ID, and emergency contact information. When an emergency alert
          is triggered, the wearable device may also collect GPS coordinates,
          timestamps, alert status, and synchronization records. Location data
          is only collected during emergency events or authorized testing and is
          not used for continuous tracking.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          3. How Your Information Is Used
        </h3>
        <p>
          The information collected is used solely to operate the emergency
          alert system, associate wearable devices with registered users, manage
          emergency contacts, record incident history, synchronize device
          activity with the web platform, and improve the reliability and
          performance of the system. SENTINOA does not use personal information
          for advertising or unrelated commercial purposes.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          4. Data Storage & Synchronization
        </h3>
        <p>
          User information and emergency records are securely stored in a cloud
          database. When mobile data is unavailable, emergency events may be
          stored temporarily on the wearable device until connectivity is
          restored, at which point they are automatically synchronized with the
          cloud. This offline-first design helps preserve critical emergency
          information.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          5. Information Sharing
        </h3>
        <p>
          SENTINOA does not sell, rent, or disclose personal information to
          third parties. Information is shared only with the emergency contacts
          selected by the user during an active emergency and with authorized
          project personnel or academic supervisors when required for system
          evaluation, maintenance, or research purposes.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">6. Data Security</h3>
        <p>
          We implement reasonable technical and organizational safeguards to
          protect user information against unauthorized access, alteration, or
          accidental loss. However, no internet-based system can guarantee
          absolute security, and users are encouraged to protect their account
          credentials and keep their information up to date.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">7. Your Rights</h3>
        <p>
          Users may update their profile information, modify emergency contacts,
          request removal of their account, or disconnect their wearable device
          from the platform, subject to any applicable academic research or
          record retention requirements associated with the project.
        </p>

        <h3 className="font-semibold text-green-700 pt-2">
          8. Changes to This Policy
        </h3>
        <p>
          As SENTINOA continues to evolve, this Privacy Policy may be updated to
          reflect new features, security improvements, or changes in applicable
          regulations. Continued use of the platform after such updates
          constitutes acceptance of the revised Privacy Policy.
        </p>
      </div>
    </div>
  </div>
);

// `checked` / `onChange` are now controlled by the parent (SignupContainer)
// so signup can actually require the box to be ticked before submitting --
// previously this checkbox held no state at all, so nothing enforced it.
const TermsandPrivacy = ({ checked, onChange }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <p className="text-xs">
        I agree to the{" "}
        <button
          type="button"
          onClick={() => setShowTerms(true)}
          className="text-primary hover:underline"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          type="button"
          onClick={() => setShowPrivacy(true)}
          className="text-primary hover:underline"
        >
          Privacy Policy
        </button>
      </p>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default TermsandPrivacy;