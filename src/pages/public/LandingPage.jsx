import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Star,
  Users,
  Wrench,
  Bike,
  Car
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card } from '../../components/ui';

// Image paths from assistant generation
const HERO_IMAGE = "/assets/hero.png";
const CAR_SERVICE_IMAGE = "/assets/car.png";
const BIKE_SERVICE_IMAGE = "/assets/bike.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    { title: 'Car Repair', icon: <Car size={24} />, desc: 'Full car diagnostics, engine repair, and maintenance.', img: CAR_SERVICE_IMAGE },
    { title: 'Bike Servicing', icon: <Bike size={24} />, desc: 'Expert bike mechanics for all brands and models.', img: BIKE_SERVICE_IMAGE },
    { title: 'Oil Change', icon: <Wrench size={24} />, desc: 'Quick and professional oil and filter replacement.' },
    { title: 'Brake Repair', icon: <ShieldCheck size={24} />, desc: 'Safety first with comprehensive brake inspections.' },
  ];

  const steps = [
    { id: 1, title: 'Find Mechanic', icon: <Search size={28} />, desc: 'Search nearby verified mechanics based on your vehicle type.' },
    { id: 2, title: 'Book Service', icon: <Calendar size={28} />, desc: 'Schedule a repair or maintenance at your preferred time.' },
    { id: 3, title: 'Track Progress', icon: <Clock size={28} />, desc: 'Stay updated with real-time status of your vehicle service.' },
    { id: 4, title: 'Pay & Review', icon: <CheckCircle2 size={28} />, desc: 'Secure payment and share your honest feedback.' },
  ];

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/20">
      {/* Public Navbar */}
      <nav className="nav-blur h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
            <Wrench size={20} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">MechConnect</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold text-slate-600 hover:text-primary transition-colors">Home</Link>
          <a href="#services" className="font-semibold text-slate-600 hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" className="font-semibold text-slate-600 hover:text-primary transition-colors">How it works</a>
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
          <Button onClick={() => navigate('/register')}>Get Started</Button>
        </div>
        <button className="md:hidden p-2 text-slate-600"><Search size={24} /></button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center pt-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src={HERO_IMAGE} 
              alt="Garage Hero" 
              className="w-full h-full object-cover opacity-10 blur-[1px]" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
                  <Star size={16} fill="currentColor" />
                  <span>Trusted by 10,000+ Vehicle Owners</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                  Find Trusted Mechanics <span className="text-primary italic">Near You</span>
                </h1>
                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Book car or bike repair services instantly with verified professional mechanics. Transparent pricing, real-time tracking, and expert care.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="h-16 px-10 text-lg shadow-2xl" onClick={() => navigate('/register')}>
                    Book a Mechanic Now <ChevronRight size={20} className="ml-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg bg-white" onClick={() => navigate('/register')}>
                    Become a Mechanic
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Get your vehicle fixed in 4 simple steps without the hassle of waiting at the garage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.id} className="relative group">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    <div className="absolute -top-4 -right-4 text-6xl font-black text-slate-100 group-hover:text-primary/10 transition-colors -z-10">
                      0{step.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div className="max-w-xl text-left">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Our Premium Services</h2>
                <p className="text-slate-500">From routine maintenance to complex engine repairs, our verified mechanics handle it all.</p>
              </div>
              <Button variant="ghost" className="text-primary font-bold">View All Services <ChevronRight size={20} /></Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <Card key={i} className="p-0 overflow-hidden group border-none shadow-xl hover:shadow-2xl">
                  {service.img && (
                    <div className="h-48 overflow-hidden relative">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">{service.icon}</div>
                      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">{service.desc}</p>
                    <button className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all">
                      Learn More <ChevronRight size={16} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Why Choose <span className="text-primary-light">MechConnect?</span></h2>
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck className="text-secondary" />, title: 'Verified Mechanics', desc: 'Every shop is background checked and skill verified.' },
                  { icon: <Clock className="text-secondary" />, title: 'Real-time Updates', desc: 'Track your vehicle stage-by-stage from your dashboard.' },
                  { icon: <Truck className="text-secondary" />, title: 'Pickup & Drop', desc: 'Save time with our dedicated vehicle pickup service.' },
                  { icon: <Users className="text-secondary" />, title: 'Transparent Pricing', desc: 'No hidden costs. See service rates before you book.' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{f.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square bg-primary/20 rounded-[40px] absolute -inset-4 rotate-6 z-0"></div>
              <img 
                src={HERO_IMAGE} 
                alt="Feature" 
                className="rounded-[40px] shadow-3xl relative z-10 rotate-[-2deg] hover:rotate-0 transition-transform duration-500" 
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[40px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Wrench size={200} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Need a mechanic today?</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-xl mx-auto relative z-10">Join thousands of customers who trust MechConnect for their vehicle care needs.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 h-16 px-12 text-xl" onClick={() => navigate('/register')}>
                  Book Now
                </Button>
                <Button size="lg" variant="ghost" className="text-white border-2 border-white/30 h-16 px-12 text-xl" onClick={() => navigate('/register')}>
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <Wrench size={16} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tighter">MechConnect</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">The ultimate platform for vehicle owners to connect with professional, verified mechanics for reliable services.</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h5>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link to="#" className="hover:text-primary">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary">Our Process</Link></li>
                <li><Link to="#" className="hover:text-primary">Verified Mechanics</Link></li>
                <li><Link to="#" className="hover:text-primary">Contact Support</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Services</h5>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link to="#" className="hover:text-primary">Car Repair</Link></li>
                <li><Link to="#" className="hover:text-primary">Bike Servicing</Link></li>
                <li><Link to="#" className="hover:text-primary">Engine Diagnostics</Link></li>
                <li><Link to="#" className="hover:text-primary">Oil Change</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h5>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link to="#" className="hover:text-primary">Twitter</Link></li>
                <li><Link to="#" className="hover:text-primary">Instagram</Link></li>
                <li><Link to="#" className="hover:text-primary">LinkedIn</Link></li>
                <li><Link to="#" className="hover:text-primary">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <p>© 2026 MechConnect Technologies. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="#" className="hover:text-slate-600">Privacy Policy</Link>
              <Link to="#" className="hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
