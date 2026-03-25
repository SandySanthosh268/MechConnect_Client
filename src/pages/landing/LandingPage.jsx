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
import { Footer } from '../../components/common/Footer';

// Realistic Unsplash placeholders for landing page visuals
const HERO_IMAGE = "/assets/hero.png";
const CAR_SERVICE_IMAGE = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800";
const BIKE_SERVICE_IMAGE = "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800";
const OIL_CHANGE_IMAGE = "/assets/Oil Change.jpg";
const BRAKE_REPAIR_IMAGE = "/assets/Brake Service.jpg";

// Testimonial avatars
const AVATAR_1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150";
const AVATAR_2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150";

// Mechanic Categories
const CATEGORY_CAR = "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800";
const CATEGORY_BIKE = "https://images.unsplash.com/photo-1620050854497-6a454dbd4ab8?auto=format&fit=crop&q=80&w=800";

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    { title: 'Car Repair', icon: <Car size={24} />, desc: 'Full car diagnostics, engine repair, and maintenance.', img: CAR_SERVICE_IMAGE },
    { title: 'Bike Servicing', icon: <Bike size={24} />, desc: 'Expert bike mechanics for all brands and models.', img: BIKE_SERVICE_IMAGE },
    { title: 'Oil Change', icon: <Wrench size={24} />, desc: 'Quick and professional oil and filter replacement.', img: OIL_CHANGE_IMAGE },
    { title: 'Brake Repair', icon: <ShieldCheck size={24} />, desc: 'Safety first with comprehensive brake inspections.', img: BRAKE_REPAIR_IMAGE },
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
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">MechConnect</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
          <a href="#services" className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-primary transition-colors">How it works</a>
          <Button variant="ghost" onClick={() => navigate('/login')} className="font-black dark:text-white dark:hover:text-primary">Sign In</Button>
          <Button onClick={() => navigate('/register')} className="font-black">Get Started</Button>
        </div>
        <button className="md:hidden p-2 text-slate-900 dark:text-white"><Search size={24} /></button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center pt-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src={HERO_IMAGE} 
              alt="Garage Hero" 
              className="w-full h-full object-cover" 
            />
            {/* Dark overlay to ensure text visibility on hero image */}
            <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/80"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  <Star size={16} fill="currentColor" className="text-yellow-400" />
                  <span>Trusted by 10,000+ Vehicle Owners</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8 italic">
                  Find Trusted Mechanics <span className="text-primary not-italic">Near You</span>
                </h1>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-semibold">
                  Book car or bike repair services instantly with verified professional mechanics. Transparent pricing, real-time tracking, and expert care.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button size="lg" className="h-16 px-10 text-lg shadow-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary-dark transition-all duration-300 scale-105" onClick={() => navigate('/register')}>
                    Book a Mechanic <ChevronRight size={20} className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 border-white/40 text-white font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm" onClick={() => navigate('/register')}>
                    Join as a Mechanic
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4 block">Process</span>
              <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">How it Works</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                Experience seamless vehicle maintenance with our streamlined 4-step process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[2.75rem] left-0 w-full h-0.5 bg-slate-200 -z-0"></div>

              {steps.map((step, idx) => (
                <div key={step.id} className="relative group z-10">
                  <div className="flex flex-col items-center">
                    {/* Step Number Badge */}
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-50 text-slate-900 font-black flex items-center justify-center shadow-lg mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-110">
                      {step.id}
                    </div>
                    
                    {/* Content Card */}
                    <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2 transition-all duration-500 w-full text-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-semibold">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services / Categories Section */}
        <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Our Services</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-semibold">Comprehensive auto care solutions for cars and motorcycles.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="relative group rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                  <div className="absolute inset-0 z-0">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[320px]">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{service.title}</h3>
                    <p className="text-slate-300 font-medium">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Browse by Category</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-semibold">Find highly specialized experts tailored specifically to your vehicle type.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { title: 'Car Mechanics', icon: <Car size={32} />, img: CATEGORY_CAR, desc: 'Specialized experts for sedans, SUVs, and luxury cars.' },
                { title: 'Bike Mechanics', icon: <Bike size={32} />, img: CATEGORY_BIKE, desc: 'Certified professionals for sports bikes, cruisers, and scooters.' }
              ].map((category, idx) => (
                <div key={idx} className="relative group rounded-[40px] overflow-hidden shadow-2xl h-[400px] cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src={category.img} alt={category.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                  </div>
                  <div className="relative z-10 p-10 h-full flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-3xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-xl shadow-black/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-4xl font-black text-white mb-3 tracking-tight">{category.title}</h3>
                    <p className="text-slate-300 font-medium text-lg leading-relaxed">{category.desc}</p>
                    <div className="mt-8 flex items-center gap-2 text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Find Specialists <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">What Our Customers Say</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-semibold">Real feedback from thousands of satisfied vehicle owners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Sarah Jenkins", role: "Car Owner", avatar: AVATAR_1, review: "MechConnect completely changed how I handle car maintenance. I found a top-rated mechanic in 5 minutes, booked a slot, and the service was impeccable. No more waiting at the garage!" },
                { name: "Michael Chang", role: "Bike Enthusiast", avatar: AVATAR_2, review: "The transparency is what I love most. Knowing exactly how much a service will cost upfront and reading real reviews gives me so much peace of mind. Highly recommend!" }
              ].map((t, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative">
                  <div className="flex items-center gap-1 text-yellow-400 mb-6">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic mb-8">"{t.review}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20" />
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[48px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Wrench size={200} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tight leading-tight">Need a mechanic today?</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-xl mx-auto relative z-10 font-bold opacity-90">Join thousands of customers who trust MechConnect for their vehicle care needs.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-50 h-16 px-12 text-xl font-black uppercase tracking-widest border-none" onClick={() => navigate('/register')}>
                  Book Now
                </Button>
                <Button size="lg" variant="ghost" className="text-white border-2 border-white/30 h-16 px-12 text-xl font-black uppercase tracking-widest" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
