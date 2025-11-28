import { useState, useEffect } from 'react';
import '@/App.css';
import axios from 'axios';
import { Menu, X, Dumbbell, Users, Trophy, Calendar, CheckCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to subscribe. Please try again.');
    }
    setLoading(false);
  };

  const handleMembershipInquiry = async (plan) => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    const phone = prompt('Enter your phone number:');
    
    if (!name || !email || !phone) return;
    
    try {
      await axios.post(`${API}/membership`, { name, email, phone, plan });
      toast.success('Membership inquiry submitted! We\'ll contact you soon.');
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-logo">
            <Dumbbell className="logo-icon" />
            <span>ELITE FITNESS</span>
          </div>
          
          <div className="nav-links desktop-only">
            <a onClick={() => scrollToSection('home')} data-testid="nav-home">Home</a>
            <a onClick={() => scrollToSection('programs')} data-testid="nav-programs">Programs</a>
            <a onClick={() => scrollToSection('trainers')} data-testid="nav-trainers">Trainers</a>
            <a onClick={() => scrollToSection('pricing')} data-testid="nav-pricing">Pricing</a>
            <a onClick={() => scrollToSection('contact')} data-testid="nav-contact">Contact</a>
          </div>

          <Button className="join-btn desktop-only" onClick={() => scrollToSection('pricing')} data-testid="nav-join-btn">
            Join Now
          </Button>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-btn">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu" data-testid="mobile-menu">
            <a onClick={() => scrollToSection('home')}>Home</a>
            <a onClick={() => scrollToSection('programs')}>Programs</a>
            <a onClick={() => scrollToSection('trainers')}>Trainers</a>
            <a onClick={() => scrollToSection('pricing')}>Pricing</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
            <Button className="w-full" onClick={() => scrollToSection('pricing')}>Join Now</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in-section">
          <h1 className="hero-title" data-testid="hero-title">
            TRANSFORM YOUR
            <span className="hero-highlight"> BODY & MIND</span>
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Join Elite Fitness and unlock your full potential with world-class trainers,
            state-of-the-art equipment, and a community that motivates.
          </p>
          <div className="hero-cta">
            <Button size="lg" className="cta-primary" onClick={() => scrollToSection('pricing')} data-testid="hero-cta-primary">
              Start Your Journey <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="cta-secondary" onClick={() => scrollToSection('programs')} data-testid="hero-cta-secondary">
              View Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card fade-in-section" data-testid="feature-trainers">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Expert Trainers</h3>
              <p>Certified professionals dedicated to your fitness goals</p>
            </div>
            <div className="feature-card fade-in-section" data-testid="feature-equipment">
              <div className="feature-icon">
                <Dumbbell size={32} />
              </div>
              <h3>Premium Equipment</h3>
              <p>State-of-the-art machines and free weights</p>
            </div>
            <div className="feature-card fade-in-section" data-testid="feature-programs">
              <div className="feature-icon">
                <Trophy size={32} />
              </div>
              <h3>Custom Programs</h3>
              <p>Tailored workouts designed for your success</p>
            </div>
            <div className="feature-card fade-in-section" data-testid="feature-flexible">
              <div className="feature-icon">
                <Calendar size={32} />
              </div>
              <h3>Flexible Schedule</h3>
              <p>24/7 access to fit your busy lifestyle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="programs-section">
        <div className="container">
          <div className="section-header fade-in-section">
            <h2 data-testid="programs-title">Our Programs</h2>
            <p>Choose the perfect program to match your fitness goals</p>
          </div>
          <div className="programs-grid">
            <div className="program-card fade-in-section" data-testid="program-strength">
              <img src="https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" alt="Strength Training" loading="lazy" />
              <div className="program-content">
                <h3>Strength Training</h3>
                <p>Build muscle and increase power with our comprehensive strength programs</p>
                <ul>
                  <li><CheckCircle size={16} /> Progressive overload techniques</li>
                  <li><CheckCircle size={16} /> Personalized workout plans</li>
                  <li><CheckCircle size={16} /> Nutrition guidance</li>
                </ul>
              </div>
            </div>
            <div className="program-card fade-in-section" data-testid="program-cardio">
              <img src="https://images.unsplash.com/photo-1761971976282-b2bb051a5474?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" alt="Cardio Training" loading="lazy" />
              <div className="program-content">
                <h3>Cardio & Conditioning</h3>
                <p>Improve endurance and burn fat with high-intensity cardio workouts</p>
                <ul>
                  <li><CheckCircle size={16} /> HIIT sessions</li>
                  <li><CheckCircle size={16} /> Cycling classes</li>
                  <li><CheckCircle size={16} /> Treadmill training</li>
                </ul>
              </div>
            </div>
            <div className="program-card fade-in-section" data-testid="program-yoga">
              <img src="https://images.unsplash.com/photo-1761971975858-c487bc10daab?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" alt="Yoga" loading="lazy" />
              <div className="program-content">
                <h3>Yoga & Flexibility</h3>
                <p>Enhance mobility and find balance through mindful movement</p>
                <ul>
                  <li><CheckCircle size={16} /> Multiple yoga styles</li>
                  <li><CheckCircle size={16} /> Meditation sessions</li>
                  <li><CheckCircle size={16} /> Flexibility training</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="trainers-section">
        <div className="container">
          <div className="section-header fade-in-section">
            <h2 data-testid="trainers-title">Meet Our Trainers</h2>
            <p>Expert coaches committed to your success</p>
          </div>
          <div className="trainers-grid">
            <div className="trainer-card fade-in-section" data-testid="trainer-1">
              <img src="https://images.unsplash.com/photo-1540205453279-389ebbc43b5b?crop=entropy&cs=srgb&fm=jpg&q=85&w=600" alt="Trainer" loading="lazy" />
              <h3>Sarah Johnson</h3>
              <p className="trainer-role">Head Strength Coach</p>
              <p>10+ years experience in strength and conditioning</p>
            </div>
            <div className="trainer-card fade-in-section" data-testid="trainer-2">
              <img src="https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?crop=entropy&cs=srgb&fm=jpg&q=85&w=600" alt="Trainer" loading="lazy" />
              <h3>Michael Chen</h3>
              <p className="trainer-role">Cardio Specialist</p>
              <p>Marathon runner and certified cardio trainer</p>
            </div>
            <div className="trainer-card fade-in-section" data-testid="trainer-3">
              <img src="https://images.unsplash.com/photo-1567281105113-a9b2effdc9a8?crop=entropy&cs=srgb&fm=jpg&q=85&w=600" alt="Trainer" loading="lazy" />
              <h3>Emma Williams</h3>
              <p className="trainer-role">Yoga Instructor</p>
              <p>Certified yoga teacher with holistic approach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header fade-in-section">
            <h2 data-testid="pricing-title">Membership Plans</h2>
            <p>Flexible options to fit your lifestyle</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card fade-in-section" data-testid="plan-basic">
              <h3>Basic</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> Gym access during off-peak hours</li>
                <li><CheckCircle size={18} /> Access to cardio equipment</li>
                <li><CheckCircle size={18} /> Locker room access</li>
              </ul>
              <Button className="w-full" variant="outline" onClick={() => handleMembershipInquiry('Basic')} data-testid="plan-basic-btn">
                Get Started
              </Button>
            </div>
            <div className="pricing-card featured fade-in-section" data-testid="plan-pro">
              <div className="featured-badge">MOST POPULAR</div>
              <h3>Pro</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">59</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> 24/7 gym access</li>
                <li><CheckCircle size={18} /> All equipment & classes</li>
                <li><CheckCircle size={18} /> Personal locker</li>
                <li><CheckCircle size={18} /> 2 guest passes per month</li>
              </ul>
              <Button className="w-full" onClick={() => handleMembershipInquiry('Pro')} data-testid="plan-pro-btn">
                Get Started
              </Button>
            </div>
            <div className="pricing-card fade-in-section" data-testid="plan-elite">
              <h3>Elite</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">99</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} /> Everything in Pro</li>
                <li><CheckCircle size={18} /> 4 personal training sessions</li>
                <li><CheckCircle size={18} /> Nutrition consultation</li>
                <li><CheckCircle size={18} /> Unlimited guest passes</li>
                <li><CheckCircle size={18} /> Priority class booking</li>
              </ul>
              <Button className="w-full" variant="outline" onClick={() => handleMembershipInquiry('Elite')} data-testid="plan-elite-btn">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header fade-in-section">
            <h2 data-testid="testimonials-title">Success Stories</h2>
            <p>Real results from real members</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card fade-in-section" data-testid="testimonial-1">
              <p className="testimonial-text">"Elite Fitness completely transformed my life. Lost 30 pounds in 4 months and feel stronger than ever!"</p>
              <div className="testimonial-author">
                <strong>John Davis</strong>
                <span>Member since 2023</span>
              </div>
            </div>
            <div className="testimonial-card fade-in-section" data-testid="testimonial-2">
              <p className="testimonial-text">"The trainers here are amazing. They pushed me beyond my limits and helped me achieve goals I never thought possible."</p>
              <div className="testimonial-author">
                <strong>Lisa Martinez</strong>
                <span>Member since 2022</span>
              </div>
            </div>
            <div className="testimonial-card fade-in-section" data-testid="testimonial-3">
              <p className="testimonial-text">"Best gym I've ever joined. The community is so supportive and motivating. Worth every penny!"</p>
              <div className="testimonial-author">
                <strong>David Thompson</strong>
                <span>Member since 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info fade-in-section">
              <h2 data-testid="contact-title">Get In Touch</h2>
              <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Phone size={20} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <span>info@elitefitness.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>123 Fitness Street, New York, NY 10001</span>
                </div>
              </div>
            </div>

            <form className="contact-form fade-in-section" onSubmit={handleContact} data-testid="contact-form">
              <Input
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
                data-testid="contact-name"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
                data-testid="contact-email"
              />
              <Input
                placeholder="Phone Number (Optional)"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                data-testid="contact-phone"
              />
              <Textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
                rows={5}
                data-testid="contact-message"
              />
              <Button type="submit" className="w-full" disabled={loading} data-testid="contact-submit">
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content fade-in-section">
            <h2 data-testid="newsletter-title">Stay Updated</h2>
            <p>Subscribe to our newsletter for fitness tips, exclusive offers, and more</p>
            <form className="newsletter-form" onSubmit={handleNewsletter} data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                data-testid="newsletter-email"
              />
              <Button type="submit" disabled={loading} data-testid="newsletter-submit">
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Dumbbell size={32} />
                <span>ELITE FITNESS</span>
              </div>
              <p>Transform your body and mind with expert guidance</p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Quick Links</h4>
                <a onClick={() => scrollToSection('programs')}>Programs</a>
                <a onClick={() => scrollToSection('trainers')}>Trainers</a>
                <a onClick={() => scrollToSection('pricing')}>Pricing</a>
              </div>
              <div>
                <h4>Support</h4>
                <a href="#">FAQ</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Elite Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;