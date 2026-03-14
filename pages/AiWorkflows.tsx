import React, { useState, useMemo, useLayoutEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/WorkflowStyles.css';
import {
    Search, X, Zap, ShoppingCart, Megaphone, GraduationCap,
    Briefcase, Scale, Calculator, Truck, Stethoscope,
    Users, PackageSearch
} from 'lucide-react';

// ─── Niche Data ───
interface Workflow {
    name: string;
    desc: string;
    price: string;
    tier: 'low' | 'mid' | 'high';
}
interface Niche {
    id: string;
    title: string;
    audience: string;
    icon: React.ReactNode;
    tags: string[];
    summary: string;
    workflows: Workflow[];
    hooks: string[];
    startingPrice: string;
}

const NICHES: Niche[] = [
    {
        id: 'digital-marketing',
        title: 'Digital Marketing Agencies',
        audience: 'Performance Ad Agency Founders',
        icon: <Megaphone size={22} />,
        tags: ['marketing', 'agencies'],
        summary: 'Automate client reporting, lead routing, and onboarding. Stop paying account managers to copy-paste data.',
        workflows: [
            { name: 'Instant Lead-to-WhatsApp Pipeline', desc: 'FB Ad lead captured → AI scores intent → personalized WhatsApp sent in 3 seconds → lead added to CRM.', price: '₹8,000', tier: 'low' },
            { name: 'Auto Weekly Report Generator', desc: 'Pulls Meta & Google Ads spend/ROAS → AI writes performance summary → generates PDF → emails client every Friday.', price: '₹25,000', tier: 'mid' },
            { name: 'Full Agency Onboarding OS', desc: 'Stripe payment → auto-create Slack channel + Drive folder → NDA via PandaDoc → Onboarding form → AI drafts first 3 ad copies.', price: '₹75,000', tier: 'high' },
            { name: 'Automated Client Check-in Bot', desc: 'Bi-weekly WhatsApp to clients asking satisfaction score. Low scores auto-alert the agency owner.', price: '₹6,000', tier: 'low' },
        ],
        hooks: [
            '"Stop paying 30k/month for account managers who copy-paste Facebook data into PDFs."',
            '"If you don\'t WhatsApp a lead in 5 minutes, they\'re gone. My system does it in 3 seconds."',
            '"Clients leave because of bad communication, not bad ads. Automate your touchpoints."',
        ],
        startingPrice: 'From ₹6,000',
    },
    {
        id: 'ecommerce',
        title: 'E-Commerce & D2C Brands',
        audience: 'Shopify / WooCommerce Store Owners',
        icon: <ShoppingCart size={22} />,
        tags: ['ecommerce', 'retail'],
        summary: 'Recover abandoned carts, reduce RTO, and automate post-purchase flows via WhatsApp.',
        workflows: [
            { name: 'WhatsApp Abandoned Cart Recovery', desc: 'Customer drops off checkout → n8n triggers personalized WhatsApp with a 10% "secret" discount within 5 minutes.', price: '₹8,000', tier: 'low' },
            { name: 'COD-to-Prepaid Conversion Bot', desc: 'For COD orders, sends WhatsApp offering 5% off if they switch to prepaid. Reduces RTO by 15-20%.', price: '₹12,000', tier: 'low' },
            { name: 'Post-Purchase Review Harvester', desc: 'After delivery confirmation, AI sends personalized WhatsApp asking for a review with a direct Google/Amazon link.', price: '₹9,000', tier: 'low' },
            { name: 'Full Return & Exchange Automation', desc: 'Customer initiates return via WhatsApp → AI captures reason + images → creates ticket → routes to logistics.', price: '₹55,000', tier: 'high' },
        ],
        hooks: [
            '"You spend 2L/month on Meta Ads but lose 30% at checkout. This bot recovers 15% of those sales."',
            '"Every COD order costs you ₹100 in RTO risk. Convert them to prepaid automatically."',
        ],
        startingPrice: 'From ₹8,000',
    },
    {
        id: 'coaches',
        title: 'Coaches & Info-Products',
        audience: 'Course Creators selling ₹10k-₹2L programs',
        icon: <GraduationCap size={22} />,
        tags: ['coaching', 'education'],
        summary: 'Clone your sales voice into a 24/7 AI closer. Automate student onboarding and testimonial collection.',
        workflows: [
            { name: '24/7 AI DM Sales Closer', desc: 'WhatsApp bot trained on your YouTube videos & past sales calls. Answers objections, pushes to Calendly booking.', price: '₹35,000', tier: 'mid' },
            { name: 'Abandoned Checkout Savior', desc: 'Razorpay/Stripe drop-off → AI Voice Call or personalized WhatsApp offering a secret bonus to close the sale.', price: '₹12,000', tier: 'low' },
            { name: 'Community Auto-Welcomer', desc: 'New Skool/Discord member → n8n DMs a personalized welcome plan based on their entry-tag selection.', price: '₹8,000', tier: 'low' },
            { name: 'Student Success & Testimonial Engine', desc: 'Tracks course progress. Stalled 7 days → encouraging WhatsApp. Completed → auto-requests a video testimonial.', price: '₹1,00,000', tier: 'high' },
        ],
        hooks: [
            '"You sell a ₹50k course. If this bot saves ONE lost checkout a month, it pays for itself infinitely."',
            '"Your DMs are flooded with \'Will this work for me?\' Clone your voice to answer them 24/7."',
            '"Stop begging for reviews. This system extracts 5-star video testimonials automatically."',
        ],
        startingPrice: 'From ₹8,000',
    },
    {
        id: 'recruitment',
        title: 'Recruitment & HR Agencies',
        audience: 'Staffing Firms & Placement Consultants',
        icon: <Users size={22} />,
        tags: ['recruitment', 'agencies'],
        summary: 'Parse 500 resumes into a clean spreadsheet and auto-schedule interviews via WhatsApp.',
        workflows: [
            { name: 'Resume-to-Sheet AI Parser', desc: 'Email/WhatsApp receives CV → AI extracts Name, Experience, Skills, Location → populates Google Sheet instantly.', price: '₹8,000', tier: 'low' },
            { name: 'Auto Interview Scheduler', desc: 'Shortlisted candidate gets WhatsApp with available slots → picks one → auto-adds to Google Calendar + notifies HR.', price: '₹15,000', tier: 'low' },
            { name: 'Candidate Status Update Bot', desc: 'Candidates WhatsApp "status" → AI replies with current stage (Applied / Shortlisted / Interview / Offer).', price: '₹10,000', tier: 'low' },
            { name: 'End-to-End Hiring Pipeline', desc: 'Full automation: JD posted → applications collected → AI shortlists top 20% → schedules interviews → sends offer letter.', price: '₹80,000', tier: 'high' },
        ],
        hooks: [
            '"Your team spends 20 hours per hire manually reading resumes. This AI does it in 20 seconds."',
            '"Candidates ghost interviews because you took 3 days to schedule. This bot does it in 3 minutes."',
        ],
        startingPrice: 'From ₹8,000',
    },
    {
        id: 'real-estate',
        title: 'Real Estate Brokers',
        audience: 'Property Brokers & Builder Sales Teams',
        icon: <Briefcase size={22} />,
        tags: ['real-estate', 'sales'],
        summary: 'Score buyer intent from WhatsApp inquiries and auto-generate property comparison PDFs.',
        workflows: [
            { name: 'WhatsApp "Buyer Intent" Scorer', desc: 'Incoming inquiry analyzed by AI → scored 1-10 for seriousness → high-intent leads auto-routed to senior agent.', price: '₹8,000', tier: 'low' },
            { name: 'Property Matching Bot', desc: 'Buyer says budget + location → AI searches your inventory sheet → sends top 3 matching properties with photos.', price: '₹18,000', tier: 'mid' },
            { name: 'Automated Site Visit Reminder', desc: 'After scheduling, sends WhatsApp reminder 24h and 1h before visit with Google Maps link and agent photo.', price: '₹6,000', tier: 'low' },
            { name: 'Full CRM + PDF Report Generator', desc: 'Complete lead management with auto-generated property comparison PDFs, EMI calculators, and follow-up sequences.', price: '₹75,000', tier: 'high' },
        ],
        hooks: [
            '"You get 200 leads a month. 180 are window shoppers. This AI tells you the 20 who will actually buy."',
            '"Stop sending the same 5 property images manually. This bot curates a personalized brochure instantly."',
        ],
        startingPrice: 'From ₹6,000',
    },
    {
        id: 'legal',
        title: 'Small Law Firms',
        audience: 'Advocates & Legal Consultants',
        icon: <Scale size={22} />,
        tags: ['legal', 'professional'],
        summary: 'Automate case intake, document collection, and client communication for legal practices.',
        workflows: [
            { name: 'AI Case Intake via WhatsApp', desc: 'Client messages with their issue → AI asks qualifying questions → categorizes case type → creates intake form entry.', price: '₹12,000', tier: 'low' },
            { name: 'Document Reminder & Collector', desc: 'Client onboarded → auto-sends checklist of required documents → follows up every 48h until all received.', price: '₹9,000', tier: 'low' },
            { name: 'Automated Legal Document Assembly', desc: 'For standard docs (NDA, Rent Agreements) → client fills form → AI populates template → sends draft for approval.', price: '₹1,00,000', tier: 'high' },
        ],
        hooks: [
            '"Your paralegal spends 3 hours per client collecting documents. This bot does it while they sleep."',
            '"Standard NDAs should not take 2 days. This system drafts them in 2 minutes."',
        ],
        startingPrice: 'From ₹9,000',
    },
    {
        id: 'finance',
        title: 'Chartered Accountants',
        audience: 'Independent CA Firms & Tax Consultants',
        icon: <Calculator size={22} />,
        tags: ['finance', 'professional'],
        summary: 'Automate GST reminders, bank reconciliation, and client document collection.',
        workflows: [
            { name: 'GST Deadline Reminder Bot', desc: 'Automated WhatsApp/Email reminders to all clients 7 days, 3 days, and 1 day before GSTR filing deadlines.', price: '₹4,999', tier: 'low' },
            { name: 'Client Document Collector', desc: 'Sends personalized WhatsApp with checklist: "Upload Form 16, Bank Statement, Investment Proofs." Tracks completion.', price: '₹8,000', tier: 'low' },
            { name: 'AI Bank Reconciliation Bridge', desc: 'Takes PDF bank statement → OCR extracts transactions → AI matches against Tally/Zoho entries → flags mismatches.', price: '₹65,000', tier: 'high' },
        ],
        hooks: [
            '"Your staff spends 30% of the year chasing clients for documents. This bot chases them automatically."',
            '"Bank reconciliation takes 2 days manually. This AI does 90% of it in 2 hours."',
        ],
        startingPrice: 'From ₹4,999',
    },
    {
        id: 'logistics',
        title: 'Courier & Logistics Partners',
        audience: 'Tier 2/3 Delivery & Freight Companies',
        icon: <Truck size={22} />,
        tags: ['logistics', 'operations'],
        summary: 'Automate "Where is my parcel?" queries and damage complaint resolution.',
        workflows: [
            { name: 'WhatsApp Tracking Status Bot', desc: 'Customer sends AWB number → n8n queries tracking API → returns real-time status with ETA via WhatsApp.', price: '₹8,000', tier: 'low' },
            { name: 'Automated Delivery Confirmation', desc: 'Upon delivery scan → auto-sends WhatsApp confirmation with feedback form link to the receiver.', price: '₹6,000', tier: 'low' },
            { name: 'Damage/Complaint Auto-Ticketing', desc: 'Customer reports damage via WhatsApp with photo → AI creates ticket with priority → routes to claims department.', price: '₹50,000', tier: 'high' },
        ],
        hooks: [
            '"Your call center gets 500 calls a day asking \'Where is my parcel?\' This bot answers all of them instantly."',
            '"Damage claims take 5 days to process because of email chains. This system does it in 5 minutes."',
        ],
        startingPrice: 'From ₹6,000',
    },
];

const ALL_TAGS = ['all', 'marketing', 'ecommerce', 'coaching', 'recruitment', 'real-estate', 'legal', 'finance', 'logistics', 'agencies', 'professional', 'operations', 'sales', 'education', 'retail'];

const AiWorkflows: React.FC = () => {
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('all');
    const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);

    useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Lock scroll when modal open
    React.useEffect(() => {
        if (selectedNiche) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedNiche]);

    const filteredNiches = useMemo(() => {
        return NICHES.filter(n => {
            const matchesSearch = search === '' ||
                n.title.toLowerCase().includes(search.toLowerCase()) ||
                n.summary.toLowerCase().includes(search.toLowerCase()) ||
                n.audience.toLowerCase().includes(search.toLowerCase());
            const matchesTag = activeTag === 'all' || n.tags.includes(activeTag);
            return matchesSearch && matchesTag;
        });
    }, [search, activeTag]);

    // Deduplicate tags that actually appear in data
    const visibleTags = useMemo(() => {
        const usedTags = new Set<string>();
        NICHES.forEach(n => n.tags.forEach(t => usedTags.add(t)));
        return ['all', ...Array.from(usedTags)];
    }, []);

    return (
        <div className="home_scope wf-scope">
            <Header isVisible={true} theme="purple" />

            {/* ── Hero ── */}
            <section className="wf-hero">
                <h1 className="wf-hero-title">
                    AI <span>Workflows</span>
                </h1>
                <p className="wf-hero-sub">
                    Find your niche. See the exact processes we automate. Start saving hours today.
                </p>

                {/* Search */}
                <div className="wf-search-bar">
                    <Search size={18} className="wf-search-icon" />
                    <input
                        id="wf-search"
                        type="text"
                        className="wf-search-input"
                        placeholder="Search niches... (e.g. marketing, legal, logistics)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filter Tags */}
                <div className="wf-filter-row">
                    {visibleTags.map(tag => (
                        <button
                            key={tag}
                            className={`wf-tag ${activeTag === tag ? 'active' : ''}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Grid ── */}
            <section className="wf-grid-section">
                <p className="wf-results-count">
                    {filteredNiches.length} {filteredNiches.length === 1 ? 'niche' : 'niches'} found
                </p>

                {filteredNiches.length === 0 ? (
                    <div className="wf-empty">
                        <PackageSearch size={48} className="wf-empty-icon" />
                        <p className="wf-empty-text">No niches match your search. Try a different keyword.</p>
                    </div>
                ) : (
                    <div className="wf-grid">
                        {filteredNiches.map((niche, i) => (
                            <div
                                key={niche.id}
                                className="wf-card wf-animate-in"
                                style={{ animationDelay: `${i * 0.08}s` }}
                                onClick={() => setSelectedNiche(niche)}
                            >
                                <div className="wf-card-header">
                                    <div className="wf-card-icon">{niche.icon}</div>
                                    <div>
                                        <h3 className="wf-card-title">{niche.title}</h3>
                                        <span className="wf-card-audience">{niche.audience}</span>
                                    </div>
                                </div>

                                <p className="wf-card-desc">{niche.summary}</p>

                                <ul className="wf-automation-list">
                                    {niche.workflows.slice(0, 3).map((wf, j) => (
                                        <li key={j} className="wf-automation-item">
                                            <Zap size={14} className="wf-check" />
                                            <span>{wf.name}</span>
                                        </li>
                                    ))}
                                    {niche.workflows.length > 3 && (
                                        <li className="wf-automation-item" style={{ color: 'var(--wf-accent)', fontSize: '11px' }}>
                                            + {niche.workflows.length - 3} more automation{niche.workflows.length - 3 > 1 ? 's' : ''}
                                        </li>
                                    )}
                                </ul>

                                <div className="wf-card-footer">
                                    <span className="wf-price-badge">{niche.startingPrice}</span>
                                    <button className="wf-cta-btn" onClick={(e) => { e.stopPropagation(); setSelectedNiche(niche); }}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Modal ── */}
            {selectedNiche && (
                <div className="wf-modal-overlay" onClick={() => setSelectedNiche(null)}>
                    <div className="wf-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="wf-modal-close" onClick={() => setSelectedNiche(null)}>
                            <X size={22} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
                            <div className="wf-card-icon">{selectedNiche.icon}</div>
                            <div>
                                <h3 style={{ margin: 0 }}>{selectedNiche.title}</h3>
                                <span className="wf-modal-sub">{selectedNiche.audience}</span>
                            </div>
                        </div>

                        <p className="wf-card-desc" style={{ marginTop: '16px' }}>{selectedNiche.summary}</p>

                        {/* Workflows */}
                        <p className="wf-modal-section-title">⚙ Automatable Processes</p>
                        {selectedNiche.workflows.map((wf, i) => (
                            <div key={i} className="wf-modal-workflow">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                    <span className="wf-modal-workflow-name">{wf.name}</span>
                                    <span className={`wf-modal-badge ${wf.tier === 'high' ? 'high' : 'low'}`}>
                                        {wf.tier === 'low' ? 'LOW-TICKET' : wf.tier === 'mid' ? 'MID-TICKET' : 'HIGH-TICKET'}
                                    </span>
                                </div>
                                <p className="wf-modal-workflow-desc">{wf.desc}</p>
                                <p className="wf-modal-workflow-price">{wf.price}</p>
                            </div>
                        ))}

                        {/* Hooks */}
                        <p className="wf-modal-section-title">🪝 Why They Buy</p>
                        {selectedNiche.hooks.map((hook, i) => (
                            <div key={i} className="wf-modal-hook">{hook}</div>
                        ))}

                        {/* CTA */}
                        <a href="/#contact" className="wf-modal-cta">
                            Get This Automation →
                        </a>
                    </div>
                </div>
            )}

            <Footer theme="purple" />
        </div>
    );
};

export default AiWorkflows;
