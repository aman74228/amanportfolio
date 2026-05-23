const App = () => (
  <React.Fragment>
    <PageLoader />
    <Cursor />
    <Nav />
    <Hero />
    <Marquee />
    <SelectedWork />
    <AboutTeaser />
    <AiDesign />
    <Testimonials />
    <FAQ />
    <Engagement />
    <Footer />
  </React.Fragment>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
