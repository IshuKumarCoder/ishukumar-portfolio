export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 bg-black">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold tracking-tighter mb-4 md:mb-0">
          Ishu<span className="text-primary">.dev</span>
        </div>
        
        <div className="text-sm text-muted-foreground text-center md:text-right">
          <p>© {new Date().getFullYear()} Ishu Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
