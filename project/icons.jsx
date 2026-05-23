// Small icon library — clean line icons
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'arrow-right':
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-down':
      return <svg {...props}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'arrow-up-right':
      return <svg {...props}><path d="M7 17L17 7M8 7h9v9"/></svg>;
    case 'plus':
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'download':
      return <svg {...props}><path d="M12 4v12M6 12l6 6 6-6M4 20h16"/></svg>;
    case 'pin':
      return <svg {...props}><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'football':
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 3l3 4-1 5-4 1-3-4 2-5z"/></svg>;
    case 'flag':
      return <svg {...props}><path d="M4 4v17"/><path d="M4 4h12l-2 4 2 4H4"/></svg>;
    case 'coffee':
      return <svg {...props}><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z"/><path d="M16 11h2a2 2 0 1 1 0 4h-2"/><path d="M7 3v2M11 3v2"/></svg>;
    case 'sparkle':
      return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case 'image':
      return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-7 7"/></svg>;
    case 'pen':
      return <svg {...props}><path d="M14 3l7 7-11 11H3v-7L14 3z"/><path d="M14 3l7 7"/></svg>;
    case 'grid':
      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'briefcase':
      return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
    case 'rocket':
      return <svg {...props}><path d="M5 19l-1 1M9 15l-4 4M15 4l5 5-8 8-5-5 8-8z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>;
    case 'feather':
      return <svg {...props}><path d="M20 4c-6 0-12 6-12 14 0 0 8 0 12-4 4-4 4-10 0-10z"/><path d="M8 18l-4 4M16 8L8 16"/></svg>;
    case 'twitter':
      return <svg {...props}><path d="M22 5.8a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1 4 4 0 0 0-6.8 3.6 11 11 0 0 1-8-4 4 4 0 0 0 1.2 5.3A4 4 0 0 1 3 9.7v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.5a11 11 0 0 0 6 1.7c7 0 11-5.9 11-11v-.5A8 8 0 0 0 22 5.8z"/></svg>;
    case 'linkedin':
      return <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-13h4v2a4 4 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'dribbble':
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 3.5c4 5 6 11 6.5 17M3.5 14c5-1.5 12-1.5 17 1.5M20.5 8c-5 2-12 1.5-17-1.5"/></svg>;
    case 'instagram':
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>;
    case 'mail':
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
