import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/FooterPageStyles.css';

const Privacy: React.FC = () => {
    React.useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="legal-page">
            <Header isVisible={true} theme="crimson" />
            <main className="legal-main">
                <p className="mono legal-tag">LEGAL_FRAMEWORK</p>
                <h1 className="heading legal-title">PRIVACY POLICY</h1>
                <p className="mono legal-date">Last updated: October 12, 2025</p>

                <div className="mono legal-body">
                    <h2 className="heading legal-section-title">1. INFORMATION WE COLLECT</h2>
                    <p>D-TUL collects minimal personal information necessary to deliver our services. This includes your name, email address, and any project details you voluntarily provide through our contact forms. We do not collect payment information directly — all transactions are handled through secure third-party processors.</p>

                    <h2 className="heading legal-section-title">2. HOW WE USE YOUR DATA</h2>
                    <p>Your information is used exclusively to communicate with you regarding your project inquiries, deliver contracted services, and provide relevant updates about D-TUL's offerings. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>

                    <h2 className="heading legal-section-title">3. COOKIES & ANALYTICS</h2>
                    <p>This website uses minimal analytics to understand traffic patterns and improve user experience. No personally identifiable information is tracked. We use no third-party advertising cookies.</p>

                    <h2 className="heading legal-section-title">4. DATA RETENTION</h2>
                    <p>We retain your contact information for the duration of our business relationship plus 12 months. You may request deletion of your data at any time by emailing <a href="mailto:dtul.work@gmail.com">dtul.work@gmail.com</a>.</p>

                    <h2 className="heading legal-section-title">5. SECURITY</h2>
                    <p>We implement industry-standard security measures to protect your data. All form submissions are transmitted over encrypted HTTPS connections. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.</p>

                    <h2 className="heading legal-section-title">6. CONTACT</h2>
                    <p>For privacy-related inquiries, contact us at <a href="mailto:dtul.work@gmail.com">dtul.work@gmail.com</a>.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
