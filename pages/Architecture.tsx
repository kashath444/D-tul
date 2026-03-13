import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Architecture: React.FC = () => {
    return (
        <div className="home_scope">
            <Header isVisible={true} />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                color: '#fff',
                paddingTop: '60px'
            }}>
                <h1 className="heading" style={{ fontSize: '3rem', marginBottom: '20px' }}>ARCHITECTURE</h1>
                <p className="mono" style={{ color: 'var(--deep-crimson)', letterSpacing: '0.2em' }}>COMING SOON</p>
            </div>
            <Footer />
        </div>
    );
};

export default Architecture;
