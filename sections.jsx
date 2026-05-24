/* ===== shared little components ===== */
const Reveal = ({ as: Tag = 'div', delay, className = '', children, ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('is-in'); io.unobserve(el); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} data-delay={delay} {...rest}>
      {children}
    </Tag>
  );
};

const LineMask = ({ children, delay, className = '' }) => (
  <span className={`line-mask ${className}`} data-delay={delay}><span>{children}</span></span>
);

/* ===== NAV ===== */
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="nav-logo">Aman <em>Patel</em></a>
      <div className="nav-links">
        <a href="#work" className="nav-link">Work</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </nav>
  );
};

/* ===== HERO ===== */
const Hero = () => {
  const ref = React.useRef(null);
  const [photoColor, setPhotoColor] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => ref.current && ref.current.classList.add('is-in'));
  }, []);
  return (
    <section className="hero" id="top" ref={ref}>
      <Reveal delay="1">
        <h1 className="hero-heading">
          <LineMask delay="1">Hi, I&rsquo;m</LineMask>
          {' '}
          <img
            src="Aman.jpeg"
            alt="Aman Patel"
            className="hero-photo-inline"
            style={{ filter: photoColor ? 'grayscale(0)' : 'grayscale(1)' }}
            onMouseEnter={() => setPhotoColor(true)}
            onMouseLeave={() => setPhotoColor(false)}
          />
          {' '}
          <LineMask delay="2"><span className="accent">Aman!</span></LineMask>
        </h1>
      </Reveal>
      <Reveal delay="3" className="hero-ctas">
        <a href="#" className="btn btn-dark">
          <Icon name="download" size={15}/> Download Resume
        </a>
        <a href="#work" className="text-link">
          View my work <span className="arrow"><Icon name="arrow-right" size={16}/></span>
        </a>
      </Reveal>
    </section>
  );
};

/* ===== DESCRIPTION ===== */
const DescSection = () => {
  const ref = React.useRef(null);
  const words = "I’m a UX and Product Designer based in Ahmedabad. I love making pixels behave — and occasionally convince stakeholders that ‘make it pop’ isn’t a design brief.".split(' ');

  React.useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const spans = Array.from(section.querySelectorAll('.desc-word'));

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / window.innerHeight
      ));
      spans.forEach((span, i) => {
        const wordProg = Math.max(0, Math.min(1, (progress - i / spans.length) * spans.length));
        const r = Math.round(0x3A + (0xF5 - 0x3A) * wordProg);
        const g = Math.round(0x37 + (0xF2 - 0x37) * wordProg);
        const b = Math.round(0x30 + (0xEE - 0x30) * wordProg);
        span.style.color = `rgb(${r},${g},${b})`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="desc-section" ref={ref}>
      <p className="desc-text">
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className="desc-word">{word}</span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
};

/* ===== MARQUEE ===== */
const Marquee = () => {
  const items = [
    'UX Research', 'Figma', 'Wireframing', 'Prototyping',
    { accent: 'Design that works.' },
    'Adobe XD', 'Visual Design', 'Notion', 'Design Systems',
    { accent: 'Pixels with purpose.' },
    'FigJam', 'Information Architecture', 'User Testing',
    { accent: 'Less lorem, more logic.' },
    'Responsive Design', 'Interaction Design', 'Design Thinking',
  ];
  const renderRun = (key) => (
    <div className="marquee-run" key={key} style={{ display: 'flex' }}>
      {items.map((it, i) => (
        <span className={`marquee-item ${typeof it === 'object' ? 'accent' : ''}`} key={i}>
          {typeof it === 'object' ? it.accent : it}
          <span className="sep">/</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="marquee">
      <div className="marquee-track">
        {renderRun('a')}
        {renderRun('b')}
      </div>
    </section>
  );
};

/* ===== SELECTED WORK ===== */
const WorkCard = ({ tags, title, goal, metrics, imageLabel }) => (
  <div className="work-card">
    <div className="work-image">
      <div className="work-image-label">{imageLabel}</div>
      <div className="work-image-cta">View Case Study <Icon name="arrow-right" size={14}/></div>
    </div>
    <div className="work-body">
      <div className="work-tags">
        {tags.map(t => <span className="work-tag" key={t}>{t}</span>)}
      </div>
      <h3 className="work-title">{title}</h3>
      <p className="work-goal">{goal}</p>
      <div className="work-metrics">
        {metrics.map((m, i) => (
          <div className="work-metric" key={i}><span className="metric-dot"></span>{m}</div>
        ))}
      </div>
    </div>
    <div className="work-card-foot">
      <a href="#" className="text-link">Checkout case study <span className="arrow"><Icon name="arrow-right" size={14}/></span></a>
      <Icon name="arrow-up-right" size={16}/>
    </div>
  </div>
);

const SelectedWork = () => (
  <section className="section" id="work">
    <div className="container">
      <Reveal className="section-header">
        <div className="section-eyebrow-wrap">
          <span className="eyebrow">02 — Selected Work</span>
          <h2 className="section-title">
            <LineMask delay="1">Projects that</LineMask><br/>
            <LineMask delay="2"><span className="muted-italic">shipped.</span></LineMask>
          </h2>
        </div>
        <a href="#" className="text-link is-muted">View all work <span className="arrow"><Icon name="arrow-right" size={14}/></span></a>
      </Reveal>

      <Reveal delay="1" className="work-grid">
        <WorkCard
          tags={['Mobile App', 'Fintech']}
          title="Plume — neobank for freelancers"
          goal="Rebuilt onboarding & invoicing for solo earners across South Asia."
          metrics={[
            'Cut activation drop-off by 38% in eight weeks',
            'Shipped 14 screens & a 60-token design system',
            'Lead designer · partnered with 2 engineers',
          ]}
          imageLabel="[ product shot — Plume app ]"
        />
        <WorkCard
          tags={['SaaS', 'Dashboard']}
          title="Mosaic — analytics for indie publishers"
          goal="Turned dense data into a calm, scannable editorial dashboard."
          metrics={[
            'Increased time-on-task by 2.1× in usability tests',
            'Designed 9 chart types and a unified empty-state language',
            'Solo design · shipped in 6 weeks',
          ]}
          imageLabel="[ product shot — Mosaic dashboard ]"
        />
      </Reveal>

      <Reveal delay="2" className="work-more">
        More projects coming soon — currently shipping with two early-stage teams.
      </Reveal>
    </div>
  </section>
);

/* ===== ABOUT TEASER ===== */
const AboutTeaser = () => (
  <section className="section section-dark" id="about">
    <div className="container">
      <Reveal className="about-head">
        <div className="about-head-left">
          <span className="location-pill"><span className="dot"></span>Ahmedabad · India</span>
          <h2 className="section-title">
            <LineMask delay="1">The designer</LineMask><br/>
            <LineMask delay="2">behind the</LineMask><br/>
            <LineMask delay="3"><span className="accent">work.</span></LineMask>
          </h2>
        </div>
        <a href="#" className="text-link">More about me <span className="arrow"><Icon name="arrow-right" size={14}/></span></a>
      </Reveal>

      <div className="trait-grid">
        {[
          { n: '01', line: 'I sketch on napkins before opening Figma.' },
          { n: '02', line: 'Five years of shipping, not just shipping pretty.' },
          { n: '03', line: 'I read the research papers nobody asked me to.' },
          { n: '04', line: 'Allergic to vibes-based design decisions.' },
        ].map((t, i) => (
          <Reveal key={t.n} delay={String(i + 1)} className="trait-card">
            <span className="trait-num">{t.n}</span>
            <p className="trait-line">&ldquo;{t.line}&rdquo;</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay="2" className="personality-row">
        <span className="personality-pill"><Icon name="football" size={15}/>Weekend footballer</span>
        <span className="personality-pill"><Icon name="flag" size={15}/>F1 at midnight</span>
        <span className="personality-pill"><Icon name="coffee" size={15}/>Cafe hunter</span>
        <span className="personality-pill"><Icon name="pin" size={15}/>Ahmedabad</span>
      </Reveal>
    </div>
  </section>
);

/* ===== AI + DESIGN ===== */
const AiDesign = () => {
  const tools = [
    { icon: 'sparkle', badge: 'Reasoning', name: 'ChatGPT & Claude', line: 'Pressure-tests copy, IA, and edge cases before review.' },
    { icon: 'image', badge: 'Imagery', name: 'Midjourney & DALL·E', line: 'Mood boards and concept art in minutes, not days.' },
    { icon: 'pen', badge: 'Writing', name: 'Notion AI', line: 'Tidies briefs, agendas, and the occasional roast deck.' },
    { icon: 'grid', badge: 'Wireframes', name: 'Relume', line: 'Section scaffolds I rip apart and rebuild on purpose.' },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-eyebrow-wrap">
            <span className="eyebrow">03 — AI + Design</span>
            <h2 className="section-title">
              <LineMask delay="1">My unfair</LineMask><br/>
              <LineMask delay="2"><span className="accent">advantage.</span></LineMask>
            </h2>
          </div>
          <p className="ai-intro">AI doesn&rsquo;t do the work.<br/>It keeps up with me while I do.</p>
        </Reveal>

        <div className="ai-grid">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={String(i + 1)} className="ai-card">
              <div className="ai-icon-box"><Icon name={t.icon} size={20}/></div>
              <span className="ai-badge">{t.badge}</span>
              <h3 className="ai-name">{t.name}</h3>
              <p className="ai-line">{t.line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay="2" className="ai-note">
          <span className="dot"></span>
          <span>The effort is still real. AI handles the groundwork. <em>I handle the craft.</em></span>
        </Reveal>
      </div>
    </section>
  );
};

/* ===== TESTIMONIALS ===== */
const Testimonials = () => {
  const items = [
    {
      quote: 'Aman shipped a design system in the time most teams spend arguing about button radii.',
      initials: 'SR', name: 'Sara R.', role: 'Engineering Lead · Plume'
    },
    {
      quote: 'He asks the awkward question early — the one that saves you a quarter of rework.',
      initials: 'KV', name: 'Karthik V.', role: 'PM · Mosaic Analytics'
    },
    {
      quote: 'Calm, fast, and absurdly thoughtful about edge cases. Easy hire next time.',
      initials: 'MN', name: 'Maya N.', role: 'Founder · Quill Studio'
    },
  ];
  return (
    <section className="section testimonials-section">
      <div className="container">
        <Reveal className="section-header" style={{ gridTemplateColumns: '1fr' }}>
          <div className="section-eyebrow-wrap">
            <span className="eyebrow">04 — Testimonials</span>
            <h2 className="section-title">
              <LineMask delay="1">What people</LineMask><br/>
              <LineMask delay="2"><span className="muted-italic">say.</span></LineMask>
            </h2>
          </div>
        </Reveal>

        <div className="test-grid">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={String(i + 1)} className="test-card">
              <div className="test-quote-mark">&ldquo;</div>
              <p className="test-quote">{t.quote}</p>
              <div className="test-divider"></div>
              <div className="test-author">
                <div className="test-avatar">{t.initials}</div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== FAQ ===== */
const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'What kind of teams do you work best with?', a: 'Small product teams (3–20) who care about craft, ship weekly, and aren’t allergic to research. I do my best work shoulder-to-shoulder with PMs and engineers, not in a Figma silo.' },
    { q: 'Are you available for freelance projects?', a: 'Yes — I take on 1–2 freelance engagements per quarter, typically 4 to 8 weeks. Scoping calls are free and I’ll tell you honestly if your problem isn’t a fit.' },
    { q: 'Do you handle visual design as well as UX?', a: 'Both. I trained as a graphic designer before falling into product, so I sketch the IA in the morning and pick typography in the afternoon. Same brain, same week.' },
    { q: 'What’s your typical process for a new project?', a: 'Discovery → IA & flows → mid-fi exploration → hi-fi & tokens → handoff & QA. Weekly demos throughout. I share my Figma file from day one, no big-reveal theater.' },
    { q: 'How do you collaborate with engineers?', a: 'I write component specs in the same repo as the code, review PRs for spacing & states, and keep a running list of design debt. If you ship without me, that’s a feature.' },
    { q: 'Can you join my team full-time?', a: 'Open to it for the right team — product-led, design-mature, and willing to relocate me or work async across IST. Reach out and we’ll talk.' },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal className="section-header" style={{ gridTemplateColumns: '1fr' }}>
          <div className="section-eyebrow-wrap">
            <span className="eyebrow">05 — FAQs</span>
            <h2 className="section-title">
              <LineMask delay="1">Things you</LineMask><br/>
              <LineMask delay="2">might wonder.</LineMask>
            </h2>
          </div>
        </Reveal>

        <Reveal delay="1" className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'is-open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq-icon"><Icon name="plus" size={14}/></span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

/* ===== ENGAGEMENT ===== */
const Engagement = () => {
  const cards = [
    {
      kind: 'dark', icon: 'briefcase', label: 'Project-based',
      title: 'Freelance',
      desc: 'Short, focused engagements — 4 to 8 weeks. Ideal for product launches, redesigns, and design systems.',
      cta: 'Start a project', ctaKind: 'btn-accent'
    },
    {
      kind: 'accent', icon: 'rocket', label: 'Looking for · Most prominent',
      title: 'Full-time',
      desc: 'Open to senior product or design-systems roles at companies that ship weekly and trust their designers.',
      cta: 'See my resume', ctaKind: 'btn-light'
    },
    {
      kind: 'light', icon: 'feather', label: 'Weekly newsletter',
      title: 'Substack',
      desc: 'Field notes on UX, AI, and shipping under pressure. Short essays, no hot takes, no growth hacks.',
      cta: 'Subscribe', ctaKind: 'btn-dark'
    },
  ];
  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="section-header" style={{ gridTemplateColumns: '1fr' }}>
          <div className="section-eyebrow-wrap">
            <span className="eyebrow">06 — Engagement</span>
            <h2 className="section-title">
              <LineMask delay="1">Here&rsquo;s how we can</LineMask><br/>
              <LineMask delay="2"><span className="accent">connect.</span></LineMask>
            </h2>
          </div>
        </Reveal>

        <div className="engage-grid">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={String(i + 1)} className={`engage-card ${c.kind}`}>
              <div className="engage-icon-box"><Icon name={c.icon} size={22}/></div>
              <span className="engage-label">{c.label}</span>
              <h3 className="engage-title">{c.title}</h3>
              <p className="engage-desc">{c.desc}</p>
              <a href="#" className={`btn ${c.ctaKind} engage-cta`}>{c.cta} <Icon name="arrow-right" size={14}/></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== FOOTER ===== */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#top" className="nav-logo">Aman <em>Patel</em></a>
          <p className="footer-tagline">A product &amp; UX designer making pixels behave from Ahmedabad, India.</p>
        </div>
        <div>
          <div className="footer-col-title">Navigation</div>
          <div className="footer-links">
            <a href="#work" className="footer-link">Selected Work</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#contact" className="footer-link">Engagement</a>
            <a href="#" className="footer-link">Resume</a>
            <a href="#" className="footer-link">Substack</a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Elsewhere</div>
          <div className="footer-socials">
            <a href="#" className="social-box" aria-label="Twitter"><Icon name="twitter" size={16}/></a>
            <a href="#" className="social-box" aria-label="LinkedIn"><Icon name="linkedin" size={16}/></a>
            <a href="#" className="social-box" aria-label="Dribbble"><Icon name="dribbble" size={16}/></a>
            <a href="#" className="social-box" aria-label="Instagram"><Icon name="instagram" size={16}/></a>
            <a href="#" className="social-box" aria-label="Email"><Icon name="mail" size={16}/></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 Aman Patel — All rights reserved.</div>
        <span className="footer-pill"><span className="dot"></span>Available for opportunities</span>
        <div className="right">Designed &amp; built by Aman Patel</div>
      </div>
    </div>
  </footer>
);

/* ===== CUSTOM CURSOR ===== */
const Cursor = () => {
  React.useEffect(() => {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let dx = rx, dy = ry;
    let raf;

    const move = (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(loop);
    };
    loop();

    const over = (e) => {
      if (e.target.closest('a, button, .work-card, .ai-card, .test-card, .engage-card, .personality-pill, .trait-card, .faq-q, .social-box')) {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
      }
    };
    const out = (e) => {
      if (e.target.closest('a, button, .work-card, .ai-card, .test-card, .engage-card, .personality-pill, .trait-card, .faq-q, .social-box')) {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      dot.remove(); ring.remove();
    };
  }, []);
  return null;
};

/* ===== PAGE LOADER ===== */
const PageLoader = () => {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setHidden(true), 500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`page-loader ${hidden ? 'is-hidden' : ''}`}>
      <div className="page-loader-mark">Aman <em>Patel</em></div>
    </div>
  );
};

Object.assign(window, {
  Reveal, LineMask, Nav, Hero, DescSection, Marquee, SelectedWork, AboutTeaser,
  AiDesign, Testimonials, FAQ, Engagement, Footer, Cursor, PageLoader,
});
