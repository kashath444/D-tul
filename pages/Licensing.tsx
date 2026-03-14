import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/FooterPageStyles.css';

const Licensing: React.FC = () => {
    React.useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="legal-page">
            <Header isVisible={true} theme="crimson" />
            <main className="legal-main">
                <p className="mono legal-tag">LEGAL_FRAMEWORK</p>
                <h1 className="heading legal-title">LICENSING</h1>
                <p className="mono legal-date">Version 2.0 — September 2025</p>

                <div className="mono legal-body">
                    <h2 className="heading legal-section-title">CLIENT DELIVERABLES</h2>
                    <p>All custom code, designs, and digital assets created for client projects are delivered under a <strong style={{ color: '#fff' }}>Full Ownership License</strong>. Upon final payment, clients receive complete rights to use, modify, distribute, and sublicense all deliverables without restriction.</p>

                    <h2 className="heading legal-section-title">D-TUL FRAMEWORKS & TOOLS</h2>
                    <p>Proprietary frameworks, workflow templates, and internal tools developed by D-TUL remain the intellectual property of D-TUL. Clients receive a perpetual, non-transferable license to use these tools within the scope of their project.</p>

                    <h2 className="heading legal-section-title">OPEN SOURCE DEPENDENCIES</h2>
                    <p>D-TUL projects may incorporate open-source libraries (React, Three.js, GSAP, Tailwind CSS, etc.). These libraries retain their original licenses (MIT, Apache 2.0, Standard GSAP License, etc.). Full dependency lists and their respective licenses are provided with each project delivery.</p>

                    <h2 className="heading legal-section-title">PORTFOLIO RIGHTS</h2>
                    <p>Unless covered by an NDA, D-TUL retains the right to feature completed projects in marketing materials, case studies, and portfolio showcases. Clients may opt out of this by written request prior to project commencement.</p>

                    <h2 className="heading legal-section-title">QUESTIONS</h2>
                    <p>For licensing inquiries, contact <a href="mailto:dtul.work@gmail.com">dtul.work@gmail.com</a>.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Licensing;
