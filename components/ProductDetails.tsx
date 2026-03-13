import React from 'react';

const ProductDetails: React.FC = () => {
    return (
        <section
            id="product-details"
            style={{
                height: '100vh',
                background: '#020617',
                borderTop: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
            }}
        >
            <div className="mono" style={{ color: '#334155', fontSize: '12px', letterSpacing: '0.5em' }}>
                PRODUCT_DETAILS_INFRASTRUCTURE_PENDING
            </div>
        </section>
    );
};

export default ProductDetails;
