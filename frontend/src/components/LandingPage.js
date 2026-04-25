import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  CloudRain, 
  Droplets, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail,
  Zap
} from 'lucide-react';
import TypingAnimation from './TypingAnimation';
import ParticleBackground from './ParticleBackground';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    { 
      title: 'Smart Crop Recommendation', 
      desc: 'AI-driven suggestions based on your soil profile and climate data.',
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      color: 'bg-emerald-500/10'
    },
    { 
      title: 'Weather Analysis', 
      desc: 'Real-time monitoring and forecasts to stay ahead of seasonal changes.',
      icon: <CloudRain className="w-6 h-6 text-blue-400" />,
      color: 'bg-blue-500/10'
    },
    { 
      title: 'Watering Schedule', 
      desc: 'Precision irrigation guidance to optimize water usage and plant health.',
      icon: <Droplets className="w-6 h-6 text-sky-400" />,
      color: 'bg-sky-500/10'
    },
    { 
      title: 'Fertilizer Optimization', 
      desc: 'Tailored nutrient recommendations to maximize yield while reducing waste.',
      icon: <FlaskConical className="w-6 h-6 text-amber-400" />,
      color: 'bg-amber-500/10'
    }
  ];

  const steps = [
    { number: '01', title: 'Data Entry', desc: 'Input soil composition and weather metrics.' },
    { number: '02', title: 'AI Prediction', desc: 'System analyzes and predicts the best crop.' },
    { number: '03', title: 'Resource Plan', desc: 'Get detailed water and fertilizer schedules.' }
  ];

  return (
    <div className="bg-[#042f2e] text-slate-200">
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Agri-Tech Revolution 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Empowering Your Harvest with <br />
              <TypingAnimation />
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the future of farming. Our intelligent platform provides data-driven 
              recommendations to help you grow smarter, faster, and more sustainably.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onGetStarted}
                className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/40"
              >
                Start Smart Farming 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#features" className="text-slate-300 hover:text-white px-8 py-4 text-lg font-semibold transition-colors">
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#064e3b]/30">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Core System</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Everything Your Farm Needs</h3>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Our modular system is designed to provide comprehensive support for every stage of the agricultural lifecycle.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -10 }}
              className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm"
            >
              <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Workflow</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">How It Works</h3>
              <p className="text-slate-400 text-lg mb-10">
                Getting started is simple. Our system integrates complex algorithms into a user-friendly interface 
                to deliver actionable insights in seconds.
              </p>
              
              <div className="space-y-8">
                {steps.map((s) => (
                  <div key={s.title} className="flex gap-6">
                    <div className="text-3xl font-black text-slate-800 tabular-nums">{s.number}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
                      <p className="text-slate-400">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-4 shadow-2xl overflow-hidden">
                <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* Mock UI visualization */}
                  <div className="p-8 w-full h-full flex flex-col gap-4">
                    <div className="h-8 w-1/3 bg-slate-800 rounded animate-pulse" />
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="bg-slate-800 rounded-xl animate-pulse" />
                      <div className="bg-slate-800 rounded-xl animate-pulse" />
                      <div className="bg-slate-800 rounded-xl animate-pulse col-span-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#064e3b]/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Our Vision</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">The Future of Agriculture</h3>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              Patel & Co. Smart Farming Hub was born from a passion for combining traditional 
              farming wisdom with cutting-edge artificial intelligence. Our mission is to bridge 
              the technology gap in agriculture, making high-level data analysis accessible 
              to every farmer, regardless of scale.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">94%</div>
                <div className="text-slate-400 font-medium">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">30%</div>
                <div className="text-slate-400 font-medium">Yield Increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">12k+</div>
                <div className="text-slate-400 font-medium">Active Farmers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Join the thousand of farmers who are already optimizing their resources 
            and maximizing their profits with our smart platform.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-emerald-950 px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-2xl"
          >
            Start Smart Farming Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#042f2e] border-t border-emerald-900/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-500 p-1 rounded-lg">
                  <SproutIcon className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Patel & Co.</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Revolutionizing the agricultural industry through data, technology, 
                and a deep respect for the land.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 hover:border-emerald-500 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 hover:border-emerald-500 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 hover:border-emerald-500 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Platform</h5>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Features</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Dashboard</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">API Docs</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Sustainability</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-sm">
            <p>© 2026 Patel & Co. Smart Farming Hub. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SproutIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 20h10" />
    <path d="M10 20c5.5-3 5.5-13 0-13" />
    <path d="M14 20c-5.5-3-5.5-13 0-13" />
    <path d="M12 20V4" />
  </svg>
);

export default LandingPage;
