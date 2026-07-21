import React from 'react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0f2a4a', color: '#fff', padding: '20px 24px', marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <strong>Travel-Mate</strong>
          <div style={{ marginTop: '6px', fontSize: '14px' }}>
            © 2026 Travel-Mate. Developed for modern secure travel planning. All rights reserved.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
