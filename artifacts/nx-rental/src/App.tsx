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
  { icon: Grid2X2, title: 'One control room', copy: 'Vehicles, bookings, customers, payments and team tasks in one view.' },
  { icon: CalendarDays, title: 'Availability that holds', copy: 'Prevent double-bookings with live calendars, rules and conflict alerts.' },
  { icon: CircleDollarSign, title: 'Payments, reconciled', copy: 'Track deposits, balances and refunds without spreadsheet archaeology.' },
  { icon: SlidersHorizontal, title: 'Fleet operations', copy: 'Move from intake to maintenance to handover with a clear next action.' },
  { icon: BarChart3, title: 'Reports with context', copy: 'Know which vehicles, channels and locations are driving your margin.' },
  { icon: ShieldCheck, title: 'Built for trust', copy: 'Make every handoff documented, visible and easy for your team to own.' },
];

const vehicleCategories = [
  { id: 'city', label: 'City runabouts', icon: CarFront, description: 'Easy to park, easy to choose. Compact cars for errands, visits and everyday freedom.', meta: 'From $29 / day', color: 'orange' },
  { id: 'weekend', label: 'Weekend makers', icon: Bike, description: 'A little more room for the route that starts Friday afternoon and ends somewhere new.', meta: 'From $48 / day', color: 'teal' },
  { id: 'work', label: 'Work movers', icon: BriefcaseBusiness, description: 'Reliable vans and utility vehicles that keep a job, a team or a delivery moving.', meta: 'From $64 / day', color: 'ink' },
];

const ecosystemItems = [
  { icon: Store, label: 'Rental businesses', copy: 'Independent operators and multi-location fleets.' },
  { icon: CarFront, label: 'Every vehicle', copy: 'Cars, vans, bikes and specialty mobility.' },
  { icon: Users, label: 'Every customer', copy: 'Travelers, locals, teams and repeat renters.' },
  { icon: Globe2, label: 'Every route', copy: 'A connected network that grows with demand.' },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`nx-logo ${dark ? 'nx-logo-dark' : ''}`} data-testid="link-logo">
      <span className="nx-logo-mark"><span /><span /></span>
      <span>NX<span className="nx-logo-muted">RENTAL</span></span>
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

function VehicleStage() {
  return (
    <div className="vehicle-stage" aria-label="NX Rental vehicle operations visual">
      <div className="stage-grid" />
      <div className="stage-sun" />
      <div className="stage-label stage-label-top"><span className="stage-dot" />Live fleet / 08:42</div>
      <div className="vehicle-shadow" />
      <div className="vehicle">
        <div className="vehicle-roof" />
        <div className="vehicle-window vehicle-window-left" />
        <div className="vehicle-window vehicle-window-right" />
        <div className="vehicle-hood" />
        <div className="vehicle-lamp" />
        <div className="vehicle-wheel vehicle-wheel-left"><span /></div>
        <div className="vehicle-wheel vehicle-wheel-right"><span /></div>
      </div>
      <div className="stage-route"><span>SEA</span><MoveRight size={14} /><span>PDX</span><b>2h 58m</b></div>
      <div className="stage-card stage-card-booking">
        <span className="mini-icon"><CalendarDays size={14} /></span>
        <span><b>New booking</b><small>Riley · 3 days</small></span>
        <Check size={16} className="stage-check" />
      </div>
      <div className="stage-card stage-card-rate">
        <small>Utilization today</small><strong>78.4%</strong><span className="rate-line"><i /></span>
      </div>
      <div className="stage-label stage-label-bottom">01 / 05 &nbsp; OPERATIONS IN MOTION</div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('city');
  const activeVehicle = vehicleCategories.find((category) => category.id === activeCategory) ?? vehicleCategories[0];

  const navigate = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="top" className="nx-site">
      <header className="nx-header">
        <div className="nx-container nx-header-inner">
          <Logo />
          <nav className={`nx-nav ${menuOpen ? 'nx-nav-open' : ''}`} aria-label="Main navigation">
            <a href="#platform" onClick={navigate} data-testid="link-platform">Platform</a>
            <a href="#solutions" onClick={navigate} data-testid="link-solutions">Solutions</a>
            <a href="#customers" onClick={navigate} data-testid="link-customers">For customers</a>
            <a href="#about" onClick={navigate} data-testid="link-about">About NX</a>
            <div className="mobile-nav-cta"><SolidButton href="#contact" testId="button-mobile-get-started">Get started</SolidButton></div>
          </nav>
          <div className="header-actions">
            <a href="#contact" className="header-login" data-testid="link-sign-in">Sign in</a>
            <SolidButton onClick={() => setRequestOpen(true)} testId="button-header-get-started">Get started</SolidButton>
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
              <SectionLabel>THE RENTAL OPERATING SYSTEM</SectionLabel>
              <h1>Every vehicle.<br /><em>One clear</em> direction.</h1>
              <p className="hero-lead">NX Rental brings the rental business and the rental customer into the same confident journey — from first search to final handover.</p>
              <div className="hero-actions">
                <SolidButton href="#solutions" testId="button-explore-platform">Explore the platform</SolidButton>
                <OutlineButton href="#contact" testId="button-talk-to-team">Talk to our team</OutlineButton>
              </div>
              <div className="hero-note"><span className="hero-note-rule" />For operators building a better way to move.</div>
            </div>
            <div className="hero-visual reveal reveal-delay-one"><VehicleStage /></div>
          </div>
          <div className="hero-ticker" aria-label="Platform capabilities">
            <div className="ticker-track">
              <span>Fleet management</span><i /> <span>Booking intelligence</span><i /> <span>Customer confidence</span><i /> <span>Fleet management</span><i /> <span>Booking intelligence</span><i /> <span>Customer confidence</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="NX Rental principles">
          <div className="nx-container trust-grid">
            <div className="trust-intro"><span>WHY NX</span><strong>The connective layer<br />rental has been missing.</strong></div>
            <div className="trust-item"><Zap size={20} /><span><b>Clear by default</b><small>Less admin. Better decisions.</small></span></div>
            <div className="trust-item"><ShieldCheck size={20} /><span><b>Reliable by design</b><small>Every promise has a record.</small></span></div>
            <div className="trust-item"><Headphones size={20} /><span><b>Human when needed</b><small>Support that knows your route.</small></span></div>
          </div>
        </section>

        <section id="about" className="about-section dark-section">
          <div className="nx-container about-grid">
            <div className="about-rail"><SectionLabel dark>01 / THE ECOSYSTEM</SectionLabel><span className="rail-line" /><span className="rail-word">CONNECTED<br />BY DESIGN</span></div>
            <div className="about-content">
              <p className="eyebrow-light">The rental journey is not two products.</p>
              <h2>It is one relationship,<br /><span>moving both ways.</span></h2>
              <p className="about-copy">Operators need a sharper view of their fleet. Customers need a simpler way to choose. NX Rental is the infrastructure between those needs — a living system where availability, trust and action stay in sync.</p>
              <a href="#connection" className="text-link text-link-light" data-testid="link-see-connection">See how it connects <ArrowRight size={16} /></a>
            </div>
            <div className="about-signal">
              <div className="signal-ring"><span>NX</span></div>
              <div className="signal-node signal-node-top"><Store size={15} /><span>Business</span></div>
              <div className="signal-node signal-node-right"><Search size={15} /><span>Customer</span></div>
              <div className="signal-node signal-node-bottom"><PackageCheck size={15} /><span>Handover</span></div>
              <div className="signal-node signal-node-left"><BarChart3 size={15} /><span>Insight</span></div>
            </div>
          </div>
        </section>

        <section id="solutions" className="solutions-section">
          <div className="nx-container">
            <div className="section-heading-row">
              <div><SectionLabel>02 / TWO SIDES. ONE SYSTEM.</SectionLabel><h2>Built around the<br /><em>real work</em> of rental.</h2></div>
              <p>Whether you run ten vehicles from one location or a growing network across a region, NX keeps the details useful and the bigger picture visible.</p>
            </div>
            <div className="solution-panels">
              <article className="solution-panel solution-panel-operator">
                <div className="panel-top"><span className="panel-number">01</span><BriefcaseBusiness size={25} /><span className="panel-tag">FOR OPERATORS</span></div>
                <h3>Run the fleet.<br /><span>Not the paperwork.</span></h3>
                <p>One operating view for every vehicle, booking, customer and dollar. Give your team the confidence to move quickly without losing the thread.</p>
                <a href="#business" className="panel-link" data-testid="link-operator-solution">Explore management <ArrowRight size={16} /></a>
                <div className="panel-visual operator-visual"><div className="dashboard-bar"><span /><span /><span /></div><div className="dashboard-columns"><div /><div /><div /></div><div className="dashboard-chart"><i /><i /><i /><i /><i /><i /><i /></div><small>FLEET PERFORMANCE / LIVE</small></div>
              </article>
              <article className="solution-panel solution-panel-market">
                <div className="panel-top"><span className="panel-number">02</span><Search size={25} /><span className="panel-tag">FOR CUSTOMERS</span></div>
                <h3>Find your next<br /><span>right vehicle.</span></h3>
                <p>Browse with context, compare with confidence and book without second-guessing. The right vehicle is closer than it feels.</p>
                <a href="#customers" className="panel-link panel-link-dark" data-testid="link-customer-solution">Explore the marketplace <ArrowRight size={16} /></a>
                <div className="panel-visual market-visual"><div className="market-search"><Search size={13} /><span>Where are you going?</span><b>23</b></div><div className="market-card"><div className="market-car-shape" /><span><b>City / automatic</b><small>Available near you</small></span><strong>$42<small>/day</small></strong></div></div>
              </article>
            </div>
          </div>
        </section>

        <section id="business" className="business-section">
          <div className="nx-container">
            <div className="section-heading-row business-heading">
              <div><SectionLabel>03 / FOR RENTAL BUSINESSES</SectionLabel><h2>Control the day.<br /><em>Grow the fleet.</em></h2></div>
              <p>Make the operational stuff feel lighter. NX turns scattered activity into a calm, shared rhythm your whole team can work from.</p>
            </div>
            <div className="feature-layout">
              <div className="feature-sidebar">
                <div className="feature-sidebar-top"><PanelTop size={17} /><span>NX CONTROL ROOM</span></div>
                <p>One system from first inquiry to vehicle return.</p>
                <div className="feature-tabs"><span className="active">All capabilities</span><span>Daily operations</span><span>Growth & insight</span></div>
                <div className="feature-aside-note"><span>THE RESULT</span><strong>More visibility.<br />Fewer surprises.</strong><ArrowDownRight size={21} /></div>
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
            <div className="customer-copy"><SectionLabel>04 / FOR PEOPLE ON THE MOVE</SectionLabel><h2>Choose the vehicle<br /><em>that fits the moment.</em></h2><p>Not every trip needs the same answer. NX makes the choice feel considered, local and refreshingly clear.</p><a href="#contact" className="text-link" data-testid="link-customer-cta">Start exploring <ArrowRight size={16} /></a></div>
            <div className="category-picker">
              <div className="category-tabs" role="tablist" aria-label="Vehicle categories">
                {vehicleCategories.map(({ id, label, icon: Icon }) => <button type="button" role="tab" aria-selected={activeCategory === id} className={activeCategory === id ? 'active' : ''} onClick={() => setActiveCategory(id)} key={id} data-testid={`button-category-${id}`}><Icon size={17} />{label}</button>)}
              </div>
              <div className={`category-feature category-feature-${activeVehicle.color}`}>
                <div className="category-feature-top"><span>AVAILABLE NEAR YOU</span><span className="category-live"><i />LIVE</span></div>
                <div className="category-illustration"><div className="category-circle" /><div className="category-car"><span /><span /><span /></div></div>
                <div className="category-feature-bottom"><div><h3>{activeVehicle.label}</h3><p>{activeVehicle.description}</p></div><div className="category-price">{activeVehicle.meta}<ArrowRight size={16} /></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="connection" className="connection-section dark-section">
          <div className="nx-container">
            <div className="connection-head"><SectionLabel dark>05 / THE CONNECTION</SectionLabel><h2>When both sides<br /><span>see the same road.</span></h2><p>Every interaction adds signal to the next one. That is how a rental ecosystem gets smarter, not just bigger.</p></div>
            <div className="connection-path">
              <div className="path-line"><i /><i /><i /></div>
              <div className="connection-step"><span className="step-num">01</span><div className="step-icon"><Store size={21} /></div><h3>List</h3><p>Operators publish a vehicle with real availability, pricing and context.</p></div>
              <div className="connection-step"><span className="step-num">02</span><div className="step-icon"><Search size={21} /></div><h3>Choose</h3><p>Customers discover an answer that fits the trip, not just a search result.</p></div>
              <div className="connection-step"><span className="step-num">03</span><div className="step-icon"><PackageCheck size={21} /></div><h3>Move</h3><p>Handover happens with everyone on the same page — before, during and after.</p></div>
            </div>
            <div className="connection-footer"><span>THE NX LOOP</span><b>Better information in.<br />Better journeys out.</b><ArrowDownRight size={24} /></div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="nx-container benefits-grid">
            <div className="benefits-title"><SectionLabel>06 / WHY IT MATTERS</SectionLabel><h2>Less friction.<br /><em>More forward.</em></h2><p>NX Rental is practical technology with a human point of view: make the next step obvious, then get out of the way.</p></div>
            <div className="benefit-metric"><span>01</span><strong>31<sup>%</sup></strong><b>less time spent<br />on manual coordination</b><small>when every team member works from the same live view.</small></div>
            <div className="benefit-metric benefit-metric-accent"><span>02</span><strong>4.8<sup>/5</sup></strong><b>customer confidence<br />at the point of booking</b><small>because clarity is part of the product, not an afterthought.</small></div>
          </div>
        </section>

        <section id="platform" className="ecosystem-section">
          <div className="nx-container">
            <div className="ecosystem-heading"><SectionLabel>07 / THE NX ECOSYSTEM</SectionLabel><h2>A better rental world<br /><em>starts in one place.</em></h2><p>There is no single way to rent. There should be one clear way to connect it all.</p></div>
            <div className="ecosystem-grid">
              {ecosystemItems.map(({ icon: Icon, label, copy }, index) => <article className="ecosystem-card" key={label} data-testid={`card-ecosystem-${index}`}><span className="ecosystem-number">0{index + 1}</span><Icon size={24} /><h3>{label}</h3><p>{copy}</p><ArrowUpRightIcon /></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-rules contact-rules-left" /><div className="contact-rules contact-rules-right" />
          <div className="nx-container contact-inner">
            <SectionLabel dark>08 / START A CONVERSATION</SectionLabel>
            <h2>Ready to put your<br /><span>fleet in motion?</span></h2>
            <p>Tell us what you are building. We will show you the clearest next step.</p>
            <SolidButton onClick={() => setRequestOpen(true)} dark testId="button-contact-start">Talk to the NX team</SolidButton>
            <div className="contact-meta"><span>hello@nxrental.co</span><i /><span>+1 206 555 0184</span><i /><span>Seattle · Portland · Everywhere</span></div>
          </div>
        </section>
      </main>

      <footer className="nx-footer">
        <div className="nx-container footer-top"><Logo dark /><p>The rental operating system<br />for every vehicle in motion.</p><div className="footer-links"><div><span>Explore</span><a href="#platform" data-testid="link-footer-platform">Platform</a><a href="#solutions" data-testid="link-footer-solutions">Solutions</a><a href="#customers" data-testid="link-footer-customers">Customers</a></div><div><span>Company</span><a href="#about" data-testid="link-footer-about">About NX</a><a href="#contact" data-testid="link-footer-contact">Contact</a><a href="#contact" data-testid="link-footer-careers">Careers</a></div></div><a href="#top" className="footer-top-link" data-testid="link-back-to-top"><ArrowDownRight size={19} />Back to top</a></div>
        <div className="nx-container footer-bottom"><span>© 2025 NX Rental, Inc.</span><span>Made for the people who keep the world moving.</span><div><a href="#contact" data-testid="link-footer-privacy">Privacy</a><a href="#contact" data-testid="link-footer-terms">Terms</a><a href="#contact" data-testid="link-footer-status">System status</a></div></div>
      </footer>

      {requestOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="request-title" onClick={() => setRequestOpen(false)}>
        <div className="request-modal" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="modal-close" onClick={() => setRequestOpen(false)} aria-label="Close request form" data-testid="button-close-request"><X size={19} /></button>
          {!submitted ? <><SectionLabel>LET'S TALK</SectionLabel><h2 id="request-title">Make the next<br /><em>move clearer.</em></h2><p>Leave a few details and our team will be in touch within one business day.</p><form onSubmit={handleSubmit} className="request-form"><label>Work email<input type="email" name="email" placeholder="you@company.com" required data-testid="input-request-email" /></label><label>What are you working on?<select name="interest" defaultValue="operator" data-testid="select-request-interest"><option value="operator">Managing a rental business</option><option value="marketplace">Finding vehicles for customers</option><option value="partner">Partnering with NX</option></select></label><button type="submit" className="nx-button nx-button-solid" data-testid="button-submit-request">Send request <ArrowRight size={16} /></button></form></> : <div className="request-success"><div className="success-mark"><Check size={25} /></div><SectionLabel>REQUEST RECEIVED</SectionLabel><h2>We will be<br /><em>in touch soon.</em></h2><p>Thanks for reaching out. We are already routing your note to the right person.</p><button type="button" className="text-link" onClick={() => setRequestOpen(false)} data-testid="button-close-success">Back to NX Rental <ArrowRight size={16} /></button></div>}
        </div>
      </div>}
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
