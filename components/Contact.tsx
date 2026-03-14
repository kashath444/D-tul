import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 20px',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* Scanline Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 50%, rgba(74, 4, 4, 0.05) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scanline-scroll 8s linear infinite'
        }} />

        {/* Horizontal Sweep */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'rgba(74, 4, 4, 0.2)',
          boxShadow: '0 0 10px rgba(74, 4, 4, 0.1)',
          animation: 'sweep-pass 10s linear infinite'
        }} />
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(40px, 8vw, 80px)'
      }}>
        {/* Headline Group */}
        <div style={{ textAlign: 'left' }}>
          <h2 className="heading" style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#fff',
            lineHeight: '1.1',
            marginBottom: '30px'
          }}>
            got something worth building?<br />
            skip the small talk.
            <span style={{
              display: 'inline-block',
              width: '0.6em',
              height: '0.1em',
              backgroundColor: 'var(--deep-crimson)',
              marginLeft: '10px',
              verticalAlign: 'middle',
              animation: 'blink-cursor 1s step-end infinite'
            }} />
          </h2>

          <p className="mono" style={{
            color: '#888',
            fontSize: 'clamp(14px, 2vw, 18px)',
            lineHeight: '1.6',
            maxWidth: '600px',
            borderLeft: '2px solid var(--deep-crimson)',
            paddingLeft: '20px'
          }}>
            whether it's a bold product idea or something broken that needs fixing - send the raw details. we'll handle the rest.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '600px'
        }}>
          {/* Name Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              style={{
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid rgba(74, 4, 4, 0.4)',
                borderRadius: '1px',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--deep-crimson)';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(74, 4, 4, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Email Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              style={{
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid rgba(74, 4, 4, 0.4)',
                borderRadius: '1px',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--deep-crimson)';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(74, 4, 4, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Service Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              What do you need?
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid rgba(74, 4, 4, 0.4)',
                borderRadius: '1px',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                outline: 'none',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--deep-crimson)';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(74, 4, 4, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">-- Select Service --</option>
              <option value="architecture">System Architecture</option>
              <option value="development">Full-Stack Development</option>
              <option value="design">Design + Frontend</option>
              <option value="research">Research + Analysis</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell us what's on your mind..."
              style={{
                padding: '12px 14px',
                fontSize: '14px',
                border: '1px solid rgba(74, 4, 4, 0.4)',
                borderRadius: '1px',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                outline: 'none',
                resize: 'vertical',
                minHeight: '140px'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--deep-crimson)';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(74, 4, 4, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Status Messages */}
          {error && (
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(139, 0, 0, 0.1)',
              border: '1px solid rgba(139, 0, 0, 0.6)',
              color: '#ff6b6b',
              borderRadius: '1px',
              fontSize: '13px',
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}>
              ✗ {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(34, 139, 34, 0.1)',
              border: '1px solid rgba(34, 139, 34, 0.6)',
              color: '#90EE90',
              borderRadius: '1px',
              fontSize: '13px',
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}>
              ✓ Message received. We'll get back to you soon.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '14px 24px',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              border: '2px solid var(--deep-crimson)',
              backgroundColor: loading ? 'rgba(74, 4, 4, 0.2)' : 'transparent',
              color: 'var(--deep-crimson)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '1px',
              fontFamily: 'monospace',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'rgba(74, 4, 4, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(74, 4, 4, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Alternative Contact */}
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(74, 4, 4, 0.2)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <span className="mono" style={{
            color: '#666',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Prefer email?
          </span>
          <a href="mailto:dtul.work@gmail.com" style={{
            color: 'var(--deep-crimson)',
            textDecoration: 'none',
            fontSize: '13.5px',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: '600',
            borderBottom: '1px solid rgba(74, 4, 4, 0.3)',
            paddingBottom: '2px',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--deep-crimson)'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(74, 4, 4, 0.3)'}
          >
            dtul.work@gmail.com
          </a>
        </div>
      </div>

      {/* Mobile Stack Override Style Block */}
      <style>
        {`
          @media (max-width: 768px) {
            #contact form {
              max-width: 100%;
            }
          }`}
      </style>
    </section>
  );
};

export default Contact;
