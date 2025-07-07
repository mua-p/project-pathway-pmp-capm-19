// Update this page (the content is just a fallback if you fail to update the page)

import LandingNav from "@/components/LandingNav";

const Index = () => {
  return <div className="min-h-screen relative overflow-hidden">
      <LandingNav />
      {/* Masterful Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-accent"></div>
      
      {/* Floating Ambient Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-scale-gentle" style={{
        animationDelay: '3s'
      }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-premium/5 rounded-full blur-3xl animate-float-gentle" style={{
        animationDelay: '6s'
      }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-success/5 rounded-full blur-3xl animate-scale-gentle" style={{
        animationDelay: '9s'
      }}></div>
      </div>

      {/* Hero Section - Refined */}
      <div className="relative">
        <div className="ambient-glow">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl gradient-hero leading-tight">
                    Professional Certification<br />
                    <span className="block gradient-primary">Excellence Platform</span>
                  </h1>
                  <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed font-light">
                    Elevate your professional standing with sophisticated, AI-powered certification training designed for discerning professionals
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <a href="/dashboard" className="group">
                    <button className="btn-masterpiece px-8 py-3 text-base hover-lift">
                      <span className="relative z-10 flex items-center gap-3">
                        Begin Your Journey
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Refined Grid */}
      <div className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <h2 className="text-3xl md:text-4xl gradient-hero mb-4">
              Engineered for Professionals
            </h2>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed font-light">
              Meticulously crafted features that define the future of professional certification training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            title: "Adaptive Learning Path",
            description: "9 PMP stages and 6 CAPM stages with intelligent difficulty progression that adapts to your unique learning style",
            gradient: "gradient-success",
            delay: "0.1s"
          }, {
            icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
            title: "AI-Powered Intelligence",
            description: "GPT-4 integration creates fresh, scenario-based questions that evolve with your progress and challenge your understanding",
            gradient: "gradient-primary",
            delay: "0.2s"
          }, {
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            title: "Emotional Analytics",
            description: "Deep insights into your learning patterns with personalized recommendations that understand your motivation",
            gradient: "gradient-premium",
            delay: "0.3s"
          }, {
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            title: "Immersive Timing",
            description: "Realistic exam conditions with intelligent time management and psychological preparation for peak performance",
            gradient: "gradient-to-r from-warning to-warning-light",
            delay: "0.4s"
          }, {
            icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            title: "Global Harmony",
            description: "Seamless experience across 15 languages with culturally intelligent content that respects diverse learning preferences",
            gradient: "gradient-to-r from-info to-info-light",
            delay: "0.5s"
          }, {
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            title: "Instant Mastery",
            description: "Comprehensive explanations that transform confusion into clarity with expert insights and real-world applications",
            gradient: "gradient-to-r from-accent to-accent-light",
            delay: "0.6s"
          }].map((feature, index) => <div key={index} className="card-masterpiece group p-6 animate-fade-in-up hover-glow" style={{
            animationDelay: feature.delay
          }}>
                <div className={`w-12 h-12 bg-${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 animate-glow-pulse`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl gradient-hero mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground-secondary">
              Start with our free trial, then upgrade to unlock all features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Trial */}
            <div className="card-masterpiece p-6 text-center flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2 text-foreground">Free Trial</h3>
                <p className="text-sm text-foreground-secondary mb-4">Perfect for getting started</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">$0</span>
                  <span className="text-foreground-secondary">/month</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-foreground-secondary">
                  <li>Access to Stage 1</li>
                  <li>AI-powered questions</li>
                  <li>Detailed explanations</li>
                </ul>
              </div>
              <button className="btn-masterpiece w-full py-2 text-sm mt-auto">
                <a href="/dashboard" className="block">
                  Start Free Trial
                </a>
              </button>
            </div>

            {/* Premium */}
            <div className="card-masterpiece p-6 text-center border-2 border-primary/20 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2 text-foreground">Premium</h3>
                <p className="text-sm text-foreground-secondary mb-4">Complete exam preparation</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">$10</span>
                  <span className="text-foreground-secondary">/month</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-foreground-secondary">
                  <li>All 9 PMP stages</li>
                  <li>All 6 CAPM stages</li>
                  <li>Unlimited practice</li>
                  <li>Multi-language support</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
              <button className="btn-premium-masterpiece w-full py-2 text-sm mt-auto">
                Get Premium Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA - Refined */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-scale-gentle"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl gradient-hero">
                Elevate Your Professional Standing
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-3xl mx-auto font-light">
                Join an exclusive community of professionals committed to excellence and continuous advancement.
              </p>
            </div>
            
            <div className="pt-6">
              <a href="/dashboard" className="group inline-block">
                <button className="btn-premium-masterpiece px-10 py-4 text-lg font-bold hover-lift">
                  <span className="relative z-10 flex items-center gap-4">
                    <span>Start Your Excellence Journey</span>
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-3 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </a>
            </div>
            
            <div className="text-center space-y-3 pt-4">
              <p className="text-sm text-foreground-muted font-light">Free to start • No credit card required</p>
              <div className="flex items-center justify-center gap-6 text-xs text-foreground-muted">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant Access
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-Powered Learning
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Expert Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;