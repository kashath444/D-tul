import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/FooterPageStyles.css';

const Terms: React.FC = () => {
    React.useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="legal-page">
            <Header isVisible={true} theme="crimson" />
            <main className="legal-main">
                <p className="mono legal-tag">LEGAL_FRAMEWORK</p>
                <h1 className="heading legal-title">TERMS OF SERVICE</h1>
                <p className="mono legal-date">Effective: August 1, 2025</p>

                <div className="mono legal-body">
                    <h2 className="heading legal-section-title">1. ACCEPTANCE OF TERMS</h2>
                    <p>By accessing or using D-TUL's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>

                    <h2 className="heading legal-section-title">2. SERVICES</h2>
                    <p>D-TUL provides web architecture, design systems, AI workflow automation, and digital consulting services. All deliverables, timelines, and pricing are agreed upon in individual project scopes before work commences.</p>

                    <h2 className="heading legal-section-title">3. INTELLECTUAL PROPERTY</h2>
                    <p>Upon full payment, all custom code, designs, and deliverables become the intellectual property of the client. D-TUL retains the right to showcase completed projects in portfolio materials unless a Non-Disclosure Agreement is in effect.</p>

                    <h2 className="heading legal-section-title">4. CLIENT RESPONSIBILITIES</h2>
                    <p>Clients are responsible for providing accurate project requirements, timely feedback, and all necessary content (text, images, branding assets). Delays caused by client inaction may impact delivery timelines.</p>

                    <h2 className="heading legal-section-title">5. LIMITATION OF LIABILITY</h2>
                    <p>D-TUL's total liability for any claim arising from our services shall not exceed the amount paid by the client for the specific project in question. We are not liable for indirect, incidental, or consequential damages.</p>

                    <h2 className="heading legal-section-title">6. GOVERNING LAW</h2>
                    <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in the relevant Indian jurisdiction.</p>

                    <h2 className="heading legal-section-title">7. MODIFICATIONS</h2>
                    <p>D-TUL reserves the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
