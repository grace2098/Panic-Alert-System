import React from 'react'
import {TermsModal, PrivacyModal} from "../signup/TermsandPrivacy"
import { useState } from 'react'
const Footer = () => {
   const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full p-5 bg-surface text-gray-600 text-sm text-center border-t border-outline-variant">
      <p>@ 2026 SENTINOA Safety System. All rights reserved</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button type="button" onClick={() => setShowPrivacy(true)} className="hover:underline">
          Privacy Policy
        </button>
        <button type="button" onClick={() => setShowTerms(true)} className="hover:underline">
          Terms of Service
        </button>
        <a href="mailto:olachi@gmail.com" className="hover:underline">Contact Us</a>
        <p>About Us</p>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  )
}


export default Footer
