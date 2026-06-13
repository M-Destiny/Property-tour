import { useState } from 'react'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJ4vsN2HZMoHL_tKYg_ppCZtlp8aOjV_uDJ_c4PjHNXj8fgoaO6fEeh6vPX3tdbV2teQ/exec'

const INITIAL = { name: '', email: '', phone: '', interest: '', message: '' }

export function ContactPage({ onClose }) {
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // text/plain is a "simple" CORS request — no preflight blocked by Google.
      // Apps Script reads the body via e.postData.contents and JSON.parses it.
      // Append timestamp to URL so every request is treated as unique — prevents
      // the browser from returning a cached response after the first submission
      await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, {
        method:  'POST',
        mode:    'no-cors',
        cache:   'no-store',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:    JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      })
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      console.error('Sheet submit error:', err)
      setStatus('error')
    }
  }

  return (
    <>
      <div className="cp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="cp-modal">
          <button className="cp-close" onClick={onClose}>✕</button>

          <div className="cp-left">
            <div className="cp-tag">Get In Touch</div>
            <h2 className="cp-title">Mumbai Tower</h2>
            <p className="cp-city">Mumbai, India</p>
            <p className="cp-body">
              Interested in a unit, a tour, or investment opportunities?
              Fill in the form and our team will get back to you within 24 hours.
            </p>
            <div className="cp-details">
              <div className="cp-detail-row">
                <span className="cp-detail-icon">📍</span>
                <span>G Block, Bandra Kurla Complex, Mumbai 400051</span>
              </div>
              <div className="cp-detail-row">
                <span className="cp-detail-icon">✉</span>
                <span>hello@mumbaitower.in</span>
              </div>
              <div className="cp-detail-row">
                <span className="cp-detail-icon">📞</span>
                <span>+91 22 0000 0000</span>
              </div>
            </div>
          </div>

          <div className="cp-right">
            {status === 'success' ? (
              <div className="cp-success">
                <div className="cp-success-icon">✓</div>
                <h3>Message Sent</h3>
                <p>Thank you! We'll be in touch within 24 hours.</p>
                <button className="cp-submit" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form className="cp-form" onSubmit={submit}>
                <div className="cp-row">
                  <div className="cp-field">
                    <label>Full Name <span>*</span></label>
                    <input required value={form.name} onChange={set('name')} placeholder="John Smith" />
                  </div>
                  <div className="cp-field">
                    <label>Email <span>*</span></label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="cp-row">
                  <div className="cp-field">
                    <label>Phone</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98000 00000" />
                  </div>
                  <div className="cp-field">
                    <label>I'm interested in</label>
                    <select value={form.interest} onChange={set('interest')}>
                      <option value="">Select an option</option>
                      <option value="Residential">Residential Unit</option>
                      <option value="Office">Office Suite</option>
                      <option value="Penthouse">The Penthouse</option>
                      <option value="Retail">Retail Space</option>
                      <option value="Investment">Investment Opportunity</option>
                      <option value="General">General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="cp-field cp-full">
                  <label>Message <span>*</span></label>
                  <textarea required rows={4} value={form.message} onChange={set('message')}
                    placeholder="Tell us about what you're looking for…" />
                </div>
                {status === 'error' && (
                  <p className="cp-error">Submission failed — please try again.</p>
                )}
                <button className="cp-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
