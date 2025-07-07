import { Button } from "@/components/ui/button";

const LandingNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold gradient-primary">CertExcellence</span>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <a href="/dashboard">Sign In</a>
            </Button>
            <Button asChild>
              <a href="/dashboard">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;