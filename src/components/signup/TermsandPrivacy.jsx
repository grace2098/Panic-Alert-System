import React from 'react'

const TermsandPrivacy = () => {
  return (
    <div className="flex items-center gap-2 text-gray-600 text-sm">
        <input type="checkbox"/>
        <p>I agree to the {""}<a href="/terms" className="text-primary hover:underline">Terms of Service</a> and {""}<a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></p>
      
    </div>
  )
}

export default TermsandPrivacy
