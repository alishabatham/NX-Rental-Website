import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bike,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  Check,
  CircleDollarSign,
  Globe2,
  Grid2X2,
  Headphones,
  Menu,
  MoveRight,
  PackageCheck,
  PanelTop,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const businessFeatures = [
  { icon: Grid2X2, title: 'Vehicle management', copy: 'Add vehicles, update details and track availability.' },
  { icon: CalendarDays, title: 'Booking management', copy: 'View upcoming, active and completed bookings.' },
  { icon: Users, title: 'Customer management', copy: 'Keep customer details and rental history together.' },
  { icon: SlidersHorizontal, title: 'Availability management', copy: 'See which vehicles are available, booked or unavailable.' },
  { icon: BarChart3, title: 'Rental records', copy: 'Keep a record of every rental, payment and return.' },
  { icon: CircleDollarSign, title: 'Payment management', copy: 'Track rental payments, deposits and balances.' },
];

const vehicleCategories = [
  { id: 'bikes', label: 'Bikes', icon: Bike, description: 'Two-wheelers for short trips and daily travel.', meta: 'Check availability', color: 'orange' },
  { id: 'scooters', label: 'Scooters', icon: Bike, description: 'Easy city travel for quick, flexible rides.', meta: 'Check availability', color: 'teal' },
  { id: 'cars', label: 'Cars', icon: CarFront, description: 'Cars for daily use, travel and longer trips.', meta: 'Check availability', color: 'ink' },
  { id: 'other', label: 'Other vehicles', icon: BriefcaseBusiness, description: 'Vans and utility vehicles for work or groups.', meta: 'Check availability', color: 'teal' },
];

const ecosystemItems = [
  { icon: Store, label: 'Rental businesses', copy: 'Manage vehicles, bookings and daily operations.' },
  { icon: CarFront, label: 'Vehicle listings', copy: 'Add prices, locations and availability.' },
  { icon: Users, label: 'Customers', copy: 'Find, compare and book rental vehicles.' },
  { icon: Globe2, label: 'Rental records', copy: 'Keep booking, payment and return details together.' },
];

function Logo({ height = 44, variant = 'auto' }: { height?: number; variant?: 'light' | 'dark' | 'auto' }) {
  return (
    <a href="#top" className="nx-logo-link" data-testid="link-logo">
      <img
        src={variant === 'light' ? '/nx-logo-light.png' : '/nx-logo.png'}
        alt="NX RENTAL"
        style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
        className={`nx-logo-img ${variant === 'light' ? 'nx-logo-img-light' : ''}`}
      />
    </a>
  );
}

function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`section-label ${dark ? 'section-label-dark' : ''}`}><span className="section-label-line" />{children}</div>;
}

function OutlineButton({ children, href, onClick, dark = false, testId }: { children: ReactNode; href?: string; onClick?: () => void; dark?: boolean; testId: string }) {
  const className = `nx-button nx-button-outline ${dark ? 'nx-button-outline-dark' : ''}`;
  if (href) return <a href={href} className={className} onClick={onClick} data-testid={testId}>{children}<ArrowRight size={16} /></a>;
  return <button type="button" className={className} onClick={onClick} data-testid={testId}>{children}<ArrowRight size={16} /></button>;
}

function SolidButton({ children, href, onClick, dark = false, testId }: { children: ReactNode; href?: string; onClick?: () => void; dark?: boolean; testId: string }) {
  const className = `nx-button nx-button-solid ${dark ? 'nx-button-solid-dark' : ''}`;
  if (href) return <a href={href} className={className} onClick={onClick} data-testid={testId}>{children}<ArrowDownRight size={16} /></a>;
  return <button type="button" className={className} onClick={onClick} data-testid={testId}>{children}<ArrowDownRight size={16} /></button>;
}

function DashboardStage() {
  return (
    <div className="dashboard-stage" aria-label="NX Rental dashboard preview">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><img src="/nx-logo-light.png" alt="NX RENTAL" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} /></div>
        <nav className="dashboard-sidebar-nav" aria-label="Dashboard sections">
          <span className="dashboard-nav-item is-active"><PanelTop size={11} />Dashboard</span>
          <span className="dashboard-nav-item"><CarFront size={11} />Vehicles</span>
          <span className="dashboard-nav-item"><CalendarDays size={11} />Bookings</span>
          <span className="dashboard-nav-item"><Users size={11} />Customers</span>
          <span className="dashboard-nav-item"><CircleDollarSign size={11} />Payments</span>
          <span className="dashboard-nav-item"><BarChart3 size={11} />Reports</span>
          <span className="dashboard-nav-item"><SlidersHorizontal size={11} />Availability</span>
        </nav>
        <div className="dashboard-sidebar-rule" />
        <span className="dashboard-sidebar-label">Fleet management</span>
        <span className="dashboard-nav-item"><PackageCheck size={11} />Maintenance</span>
        <span className="dashboard-nav-item"><SlidersHorizontal size={11} />Settings</span>
        <div className="dashboard-upgrade"><Sparkles size={13} /><b>Upgrade to Pro</b><small>More analytics for your team.</small><span>Upgrade now <ArrowRight size={10} /></span></div>
      </aside>

      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="dashboard-search"><Search size={11} /><span>Search vehicles, bookings, customers...</span></div>
          <div className="dashboard-user"><span className="dashboard-notification"><CircleDollarSign size={11} /></span><span className="dashboard-avatar">A</span><span className="dashboard-user-name"><b>Aarav Sharma</b><small>Admin</small></span><span className="dashboard-chevron">⌄</span></div>
        </div>
        <div className="dashboard-heading">
          <div><h3>Welcome back, Aarav!</h3><p>Here's an overview of your rental business.</p></div>
          <div className="dashboard-date"><CalendarDays size={10} /><span>Sep 28, 2026 — Oct 4, 2026</span><b>⌄</b></div>
        </div>
        <div className="dashboard-stat-grid">
          <div className="dashboard-stat"><span className="dashboard-stat-icon is-purple"><CarFront size={14} /></span><span><small>Total vehicles</small><strong>42</strong><em>↗ 12%</em></span><i className="dashboard-sparkline spark-purple" /></div>
          <div className="dashboard-stat"><span className="dashboard-stat-icon is-green"><CalendarDays size={14} /></span><span><small>Active bookings</small><strong>18</strong><em>↗ 8%</em></span><i className="dashboard-sparkline spark-green" /></div>
          <div className="dashboard-stat"><span className="dashboard-stat-icon is-blue"><Users size={14} /></span><span><small>Total customers</small><strong>214</strong><em>↗ 18%</em></span><i className="dashboard-sparkline spark-blue" /></div>
          <div className="dashboard-stat"><span className="dashboard-stat-icon is-pink"><CircleDollarSign size={14} /></span><span><small>Revenue this month</small><strong>₹1,24,500</strong><em>↗ 24%</em></span><i className="dashboard-sparkline spark-pink" /></div>
        </div>
        <div className="dashboard-insights">
          <div className="dashboard-panel revenue-panel"><div className="dashboard-panel-head"><b>Revenue overview</b><span>Monthly⌄</span></div><div className="dashboard-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="dashboard-axis"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div>
          <div className="dashboard-panel ring-panel"><div className="dashboard-panel-head"><b>Booking status</b></div><div className="dashboard-ring-wrap"><div className="dashboard-ring"><strong>18</strong><small>Active</small></div><ul><li><i className="ring-green" />Confirmed <b>60%</b></li><li><i className="ring-yellow" />Pending <b>20%</b></li><li><i className="ring-blue" />Completed <b>15%</b></li><li><i className="ring-pink" />Cancelled <b>5%</b></li></ul></div></div>
          <div className="dashboard-panel ring-panel"><div className="dashboard-panel-head"><b>Vehicle availability</b></div><div className="dashboard-ring-wrap"><div className="dashboard-ring availability-ring"><strong>42</strong><small>Total</small></div><ul><li><i className="ring-green" />Available <b>28</b></li><li><i className="ring-blue" />Booked <b>10</b></li><li><i className="ring-yellow" />Maintenance <b>3</b></li><li><i className="ring-pink" />Unavailable <b>1</b></li></ul></div></div>
        </div>
        <div className="dashboard-lower">
          <div className="dashboard-panel bookings-panel"><div className="dashboard-panel-head"><b>Recent bookings</b><a href="#business">View all <ArrowRight size={9} /></a></div><div className="dashboard-table-head"><span>#</span><span>Customer</span><span>Vehicle</span><span>Pickup — Drop</span><span>Status</span><span>Amount</span></div><div className="dashboard-booking-row"><span>RB001</span><b>PK <small>Priya Khurana</small></b><span>Hyundai i20</span><span>Sep 28 — Sep 30<small>Indore</small></span><em className="status-confirmed">Confirmed</em><strong>₹4,800</strong></div><div className="dashboard-booking-row"><span>RB002</span><b>AR <small>Amit Rajput</small></b><span>Mahindra Thar</span><span>Sep 27 — Oct 1<small>Bhopal</small></span><em className="status-pending">Pending</em><strong>₹12,000</strong></div><div className="dashboard-booking-row"><span>RB003</span><b>SK <small>Sana Khan</small></b><span>Honda Activa</span><span>Sep 27 — Sep 28<small>Indore</small></span><em className="status-completed">Completed</em><strong>₹800</strong></div></div>
          <div className="dashboard-side-panels"><div className="dashboard-panel quick-panel"><div className="dashboard-panel-head"><b>Quick actions</b></div><div className="dashboard-quick-grid"><span><CarFront size={11} />Add vehicle <ArrowRight size={9} /></span><span><CalendarDays size={11} />New booking <ArrowRight size={9} /></span><span><Users size={11} />Add customer <ArrowRight size={9} /></span><span><BarChart3 size={11} />Generate report <ArrowRight size={9} /></span></div></div><div className="dashboard-panel upcoming-panel"><div className="dashboard-panel-head"><b>Upcoming bookings</b><a href="#business">View all <ArrowRight size={9} /></a></div><div className="dashboard-upcoming-row"><CarFront size={15} /><span><b>Mahindra Thar</b><small>Rohit Mehta · Tomorrow</small></span><em className="status-confirmed">Confirmed</em></div><div className="dashboard-upcoming-row"><Bike size={15} /><span><b>Honda Activa</b><small>Kavya Singh · Tomorrow</small></span><em className="status-pending">Pending</em></div></div></div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('cars');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'I need to find a vehicle',
    vehicleType: 'Cars',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = () => setMenuOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (catId: string, label: string) => {
    setActiveCategory(catId);
    setFormData((prev) => ({ ...prev, vehicleType: label }));
  };

  const openModalWithVehicle = (label: string) => {
    setFormData((prev) => ({ ...prev, vehicleType: label }));
    setErrorMsg('');
    setRequestOpen(true);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || 'Failed to send inquiry. Please try again.');
      }
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'I need to find a vehicle',
      vehicleType: 'Cars',
      message: ''
    });
    setRequestOpen(false);
  };

  return (
    <div id="top" className="nx-site">
      <header className="nx-header">
        <div className="nx-container nx-header-inner">
          <Logo />
          <nav className={`nx-nav ${menuOpen ? 'nx-nav-open' : ''}`} aria-label="Main navigation">
            <a href="#top" onClick={navigate} data-testid="link-home">Home</a>
            <a href="#about" onClick={navigate} data-testid="link-about">About</a>
            <a href="#business" onClick={navigate} data-testid="link-management">Management</a>
            <a href="#customers" onClick={navigate} data-testid="link-marketplace">Marketplace</a>
            <a href="#features" onClick={navigate} data-testid="link-features">Features</a>
            <a href="#contact" onClick={navigate} data-testid="link-contact">Contact</a>
            <div className="mobile-nav-cta">
              <SolidButton href="#contact" onClick={() => { navigate(); openModalWithVehicle('General Inquiry'); }} testId="button-mobile-explore">Book / Contact</SolidButton>
            </div>
          </nav>
          <div className="header-actions">
            <a href="#business" className="header-login" data-testid="link-business">For rental businesses</a>
            <SolidButton onClick={() => openModalWithVehicle('Cars')} testId="button-header-explore">Contact NX Rental</SolidButton>
            <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="nx-container hero-grid">
            <div className="hero-copy reveal">
              <SectionLabel>MANAGEMENT SYSTEM · MARKETPLACE</SectionLabel>
              <h1>Manage rentals.<br /><em>Reach more</em><br />customers.</h1>
              <p className="hero-lead">Manage vehicles, bookings and customers in one place. Customers can find and book available vehicles through the marketplace.</p>
              <div className="hero-actions">
                <SolidButton onClick={() => openModalWithVehicle('Cars')} testId="button-explore-vehicles">Contact & Book Now</SolidButton>
                <OutlineButton href="#business" testId="button-manage-business">Manage rental business</OutlineButton>
              </div>
              <div className="hero-note"><span className="hero-note-rule" />For rental businesses and customers.</div>
            </div>
            <div className="hero-visual reveal reveal-delay-one"><DashboardStage /></div>
          </div>
          <div className="hero-ticker" aria-label="Platform capabilities">
            <div className="ticker-track">
              <span>Vehicle management</span><i /> <span>Booking management</span><i /> <span>Vehicle discovery</span><i /> <span>Vehicle management</span><i /> <span>Booking management</span><i /> <span>Vehicle discovery</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="NX Rental principles">
          <div className="nx-container trust-grid">
            <div className="trust-intro"><span>ABOUT NX RENTAL</span><strong>One platform for<br />vehicle rental.</strong></div>
            <div className="trust-item"><Zap size={20} /><span><b>Manage vehicles</b><small>Keep your fleet organized.</small></span></div>
            <div className="trust-item"><ShieldCheck size={20} /><span><b>Track bookings</b><small>See every rental in one place.</small></span></div>
            <div className="trust-item"><Headphones size={20} /><span><b>Find vehicles</b><small>Help customers book with ease.</small></span></div>
          </div>
        </section>

        <section id="about" className="about-section dark-section">
          <div className="nx-container about-grid">
            <div className="about-rail"><SectionLabel dark>01 / ABOUT NX RENTAL</SectionLabel><span className="rail-line" /><span className="rail-word">BUSINESS<br />+ CUSTOMER</span></div>
            <div className="about-content">
              <p className="eyebrow-light">COMPLETE VEHICLE RENTAL ECOSYSTEM</p>
              <h2>One platform.<br /><span>Two solutions.</span></h2>
              <p className="about-copy">NX Rental connects rental businesses and customers in one digital platform. Businesses manage vehicles, bookings and rental operations. Customers discover available vehicles and book with rental providers.</p>
              <a href="#solutions" className="text-link text-link-light" data-testid="link-see-connection">See how it works <ArrowRight size={16} /></a>
            </div>
            <div className="about-signal">
              <div className="signal-ring"><img src="/nx-logo-light.png" alt="NX RENTAL" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} /></div>
              <div className="signal-node signal-node-top"><Store size={15} /><span>Business</span></div>
              <div className="signal-node signal-node-right"><Search size={15} /><span>Customer</span></div>
              <div className="signal-node signal-node-bottom"><PackageCheck size={15} /><span>Bookings</span></div>
              <div className="signal-node signal-node-left"><BarChart3 size={15} /><span>Reports</span></div>
            </div>
          </div>
        </section>

        <section id="solutions" className="solutions-section">
          <div className="nx-container">
            <div className="section-heading-row">
              <div><SectionLabel>02 / TWO CORE SOLUTIONS</SectionLabel><h2>Management system<br /><em>+ marketplace.</em></h2></div>
              <p>Businesses manage rentals. Customers find and book vehicles. NX Rental connects both sides.</p>
            </div>
            <div className="solution-panels">
              <article className="solution-panel solution-panel-operator">
                <div className="panel-top"><span className="panel-number">01</span><BriefcaseBusiness size={25} /><span className="panel-tag">FOR OPERATORS</span></div>
                <h3>Manage your<br /><span>rental business.</span></h3>
                <p>Manage vehicles, bookings, customers, availability and payments from one platform.</p>
                <button type="button" onClick={() => openModalWithVehicle('Business Inquiry')} className="panel-link" data-testid="link-operator-solution">Manage your business <ArrowRight size={16} /></button>
                <div className="panel-visual operator-visual"><div className="dashboard-bar"><span /><span /><span /></div><div className="dashboard-columns"><div /><div /><div /></div><div className="dashboard-chart"><i /><i /><i /><i /><i /><i /><i /></div><small>FLEET PERFORMANCE / LIVE</small></div>
              </article>
              <article className="solution-panel solution-panel-market">
                <div className="panel-top"><span className="panel-number">02</span><Search size={25} /><span className="panel-tag">FOR CUSTOMERS</span></div>
                <h3>Find and book<br /><span>vehicles.</span></h3>
                <p>Browse vehicles, compare options, check availability and contact rental providers.</p>
                <button type="button" onClick={() => openModalWithVehicle('Customer Booking')} className="panel-link panel-link-dark" data-testid="link-customer-solution">Explore vehicles <ArrowRight size={16} /></button>
                <div className="panel-visual market-visual"><div className="market-search"><Search size={13} /><span>Where are you going?</span><b>23</b></div><div className="market-card"><div className="market-car-shape" /><span><b>City / automatic</b><small>Available near you</small></span><strong>₹1,800<small>/day</small></strong></div></div>
              </article>
            </div>
          </div>
        </section>

        <section id="business" className="business-section">
          <div className="nx-container">
            <div className="section-heading-row business-heading">
              <div><SectionLabel>03 / FOR RENTAL BUSINESSES</SectionLabel><h2>Run your rental business<br /><em>from one place.</em></h2></div>
              <p>Manage vehicles, bookings, customers and daily rental operations from one connected system.</p>
            </div>
            <div className="feature-layout" id="features">
              <div className="feature-sidebar">
                <div className="feature-sidebar-top"><PanelTop size={17} /><span>MANAGEMENT SYSTEM</span></div>
                <p>Vehicles, bookings, customers and payments in one place.</p>
                <div className="feature-tabs"><span className="active">Vehicle management</span><span>Booking management</span><span>Reports & analytics</span></div>
                <div className="feature-aside-note"><span>THE RESULT</span><strong>Less manual work.<br />Better control.</strong><ArrowDownRight size={21} /></div>
              </div>
              <div className="feature-grid">
                {businessFeatures.map(({ icon: Icon, title, copy }, index) => (
                  <article className="feature-card" key={title} data-testid={`card-business-feature-${index}`}>
                    <div className="feature-icon"><Icon size={19} /></div><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{copy}</p><ArrowRight className="feature-arrow" size={17} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="customers" className="customer-section">
          <div className="customer-backdrop" />
          <div className="nx-container customer-grid">
            <div className="customer-copy">
              <SectionLabel>04 / FOR CUSTOMERS</SectionLabel>
              <h2>Find a vehicle<br /><em>for your journey.</em></h2>
              <p>Compare vehicles from rental providers, check availability and book what you need.</p>
              <button type="button" onClick={() => openModalWithVehicle('Category Booking')} className="text-link" data-testid="link-customer-cta">Book a vehicle now <ArrowRight size={16} /></button>
            </div>
            <div className="category-picker">
              <div className="category-tabs" role="tablist" aria-label="Vehicle categories">
                {vehicleCategories.map(({ id, label, icon: Icon }) => (
                  <button type="button" role="tab" aria-selected={activeCategory === id} className={activeCategory === id ? 'active' : ''} onClick={() => handleCategorySelect(id, label)} key={id} data-testid={`button-category-${id}`}>
                    <Icon size={17} />{label}
                  </button>
                ))}
              </div>
              <div className="category-card-preview">
                {vehicleCategories.map((cat) => {
                  if (cat.id !== activeCategory) return null;
                  const Icon = cat.icon;
                  return (
                    <div className="cat-preview-box" key={cat.id}>
                      <div className="cat-preview-header">
                        <Icon size={24} />
                        <span>Available Now</span>
                      </div>
                      <h3>{cat.label} Rental</h3>
                      <p>{cat.description}</p>
                      <button type="button" className="nx-button nx-button-solid" onClick={() => openModalWithVehicle(cat.label)}>
                        Book {cat.label} <ArrowRight size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="connection" className="connection-section dark-section">
          <div className="nx-container">
            <div className="connection-head"><SectionLabel dark>05 / HOW IT CONNECTS</SectionLabel><h2>List. Discover.<br /><span>Book. Manage.</span></h2><p>NX Rental connects rental businesses and customers through one platform.</p></div>
            <div className="connection-path">
              <div className="path-line"><i /><i /><i /></div>
              <div className="connection-step"><span className="step-num">01</span><div className="step-icon"><Store size={21} /></div><h3>List vehicles</h3><p>Businesses add vehicles, prices, locations and availability.</p></div>
              <div className="connection-step"><span className="step-num">02</span><div className="step-icon"><Search size={21} /></div><h3>Find a vehicle</h3><p>Customers discover and compare available rental options.</p></div>
              <div className="connection-step"><span className="step-num">03</span><div className="step-icon"><PackageCheck size={21} /></div><h3>Book and manage</h3><p>Customers book. Businesses manage the rental from one place.</p></div>
            </div>
            <div className="connection-footer"><span>THE NX PLATFORM</span><b>Manage rentals.<br />Find vehicles.</b><ArrowDownRight size={24} /></div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="nx-container benefits-grid">
            <div className="benefits-title"><SectionLabel>06 / KEY BENEFITS</SectionLabel><h2>Built for the<br /><em>complete rental journey.</em></h2><p>A simple way for businesses to manage rentals and for customers to find vehicles.</p></div>
            <div className="benefit-metric"><span>FOR BUSINESSES</span><strong>Manage</strong><b>vehicles, bookings<br />and customers</b><small>Keep day-to-day rental work in one place.</small></div>
            <div className="benefit-metric benefit-metric-accent"><span>FOR CUSTOMERS</span><strong>Discover</strong><b>vehicles from<br />rental providers</b><small>Compare options and check availability before booking.</small></div>
          </div>
        </section>

        <section id="platform" className="ecosystem-section">
          <div className="nx-container">
            <div className="ecosystem-heading"><SectionLabel>07 / NX RENTAL ECOSYSTEM</SectionLabel><h2>Everything for vehicle rental<br /><em>in one platform.</em></h2><p>Businesses manage rentals. Customers discover vehicles. NX Rental connects both sides.</p></div>
            <div className="ecosystem-grid">
              {ecosystemItems.map(({ icon: Icon, label, copy }, index) => <article className="ecosystem-card" key={label} data-testid={`card-ecosystem-${index}`}><span className="ecosystem-number">0{index + 1}</span><Icon size={24} /><h3>{label}</h3><p>{copy}</p><ArrowUpRightIcon /></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-rules contact-rules-left" /><div className="contact-rules contact-rules-right" />
          <div className="nx-container contact-inner">
            <SectionLabel dark>08 / CONTACT & BOOKING</SectionLabel>
            <h2>Ready to<br /><span>get started?</span></h2>
            <p>Send an inquiry to save your response directly in MongoDB and receive email updates.</p>

            <div className="contact-form-container">
              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="inline-contact-form">
                  {errorMsg && <div className="form-error-banner">{errorMsg}</div>}
                  <div className="form-grid-2">
                    <label>
                      Full Name *
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Rahul Sharma" required />
                    </label>
                    <label>
                      Email Address *
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
                    </label>
                  </div>
                  <div className="form-grid-2">
                    <label>
                      Phone Number
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Optional phone number" />
                    </label>
                    <label>
                      How can we help?
                      <select name="interest" value={formData.interest} onChange={handleInputChange}>
                        <option value="I need to find a vehicle">I need to find a vehicle</option>
                        <option value="I run a rental business">I run a rental business</option>
                        <option value="Partnership Inquiry">Partnership Inquiry</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Preferred Vehicle / Message
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Mention vehicle type, location, rental dates or requirements..." />
                  </label>
                  <button type="submit" className="nx-button nx-button-solid form-submit-btn" disabled={submitting}>
                    {submitting ? 'Saving to MongoDB & Sending Email...' : 'Submit Inquiry'} <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <div className="contact-success-box">
                  <div className="success-icon"><Check size={32} /></div>
                  <h3>Response Saved & Email Sent!</h3>
                  <p>Your inquiry has been stored in MongoDB collection <strong>nx-rental</strong> and sent to <strong>nexisparkxofficial@nexisparkx.com</strong>.</p>
                  <button type="button" className="nx-button nx-button-outline nx-button-outline-dark" onClick={() => setSubmitted(false)}>
                    Send Another Response
                  </button>
                </div>
              )}
            </div>

            <div className="contact-meta">
              <span>nexisparkxofficial@nexisparkx.com</span><i />
              <span>For rental businesses & customers</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="nx-footer">
        <div className="nx-container footer-top">
          <Logo height={48} variant="light" />
          <p>Complete vehicle rental ecosystem<br />Management system · Marketplace</p>
          <div className="footer-links">
            <div>
              <span>Explore</span>
              <a href="#top" data-testid="link-footer-home">Home</a>
              <a href="#about" data-testid="link-footer-about">About</a>
              <a href="#business" data-testid="link-footer-management">Management</a>
              <a href="#customers" data-testid="link-footer-marketplace">Marketplace</a>
            </div>
            <div>
              <span>Company</span>
              <a href="#features" data-testid="link-footer-features">Features</a>
              <a href="#contact" data-testid="link-footer-contact">Contact</a>
            </div>
          </div>
          <a href="#top" className="footer-top-link" data-testid="link-back-to-top"><ArrowDownRight size={19} />Back to top</a>
        </div>
        <div className="nx-container footer-bottom">
          <span>© 2026 NX Rental. All rights reserved.</span>
          <span>MongoDB Collection: nx-rental</span>
        </div>
      </footer>

      {requestOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="request-title" onClick={() => setRequestOpen(false)}>
          <div className="request-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setRequestOpen(false)} aria-label="Close request form" data-testid="button-close-request">
              <X size={19} />
            </button>
            {!submitted ? (
              <>
                <SectionLabel>CONTACT NX RENTAL</SectionLabel>
                <h2 id="request-title">Tell us what<br /><em>you need.</em></h2>
                <p>Fill out the form below. Your request will be saved in MongoDB and emailed to our team.</p>
                
                {errorMsg && <div className="form-error-banner">{errorMsg}</div>}
                
                <form onSubmit={handleFormSubmit} className="request-form">
                  <label>
                    Full Name *
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required data-testid="input-request-name" />
                  </label>
                  <label>
                    Email address *
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.com" required data-testid="input-request-email" />
                  </label>
                  <label>
                    Phone number
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Optional phone number" data-testid="input-request-phone" />
                  </label>
                  <label>
                    How can we help?
                    <select name="interest" value={formData.interest} onChange={handleInputChange} data-testid="select-request-interest">
                      <option value="I run a rental business">I run a rental business</option>
                      <option value="I need to find a vehicle">I need to find a vehicle</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                    </select>
                  </label>
                  <label>
                    Vehicle / Requirements
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Vehicle model, dates, location..." />
                  </label>
                  <button type="submit" className="nx-button nx-button-solid" disabled={submitting} data-testid="button-submit-request">
                    {submitting ? 'Saving & Sending Email...' : 'Send Request'} <ArrowRight size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="request-success">
                <div className="success-mark"><Check size={25} /></div>
                <SectionLabel>REQUEST SAVED & EMAILED</SectionLabel>
                <h2>Thanks.<br /><em>We received your request.</em></h2>
                <p>Saved to MongoDB <code>nx-rental</code> collection and emailed to <strong>nexisparkxofficial@nexisparkx.com</strong>.</p>
                <button type="button" className="text-link" onClick={resetForm} data-testid="button-close-success">
                  Back to NX Rental <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight className="ecosystem-arrow" size={18} />;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
