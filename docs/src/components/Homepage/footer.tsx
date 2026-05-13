const Footer = () => (
  <footer className="relative w-full min-h-16 z-50 border-t border-border/50">
    <div className="mx-auto max-w-6xl min-h-16 flex items-center justify-center px-5 py-4 text-muted-foreground text-sm text-center">
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Markdown Reader · Mindfire FOSS</p>
    </div>
  </footer>
);

export default Footer;
