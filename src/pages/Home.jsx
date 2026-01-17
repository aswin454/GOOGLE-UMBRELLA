import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CloudRain, Sun } from 'lucide-react';
import './Home.css';

const CountUp = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (!entry.isIntersecting) {
                    setCount(0); // Reset count when out of view
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        let animationFrameId;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(ease * end));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
};

const AnimatedSection = ({ children, className = '', style = {} }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className={`${className} ${isVisible ? 'visible' : ''}`} style={style}>
            {children}
        </div>
    );
};

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const milestoneRef = useRef(null);

    const heroImages = [
        "/images/home_hero_connected.jpg",
        "/images/home_hero_2.jpg",
        "/images/home_hero_3.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
        }, 2500); // Change image every 2.5 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle dark mode when milestone is more than 30% visible
                setIsDarkMode(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (milestoneRef.current) {
            observer.observe(milestoneRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`home-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <section className="hero">
                <div className="container hero-container">
                    <AnimatedSection className="hero-content">
                        <h1 className="hero-title">
                            Stay Dry, <span className="text-gradient">Google Style</span>
                        </h1>
                        <p className="hero-text">
                            Experience the perfect blend of technology and fashion. The Google Umbrella isn't just about keeping you dry—it's about making a statement in every weather.
                        </p>
                        <div className="hero-actions">
                            <Link to="/shop" className="btn btn-primary">
                                Shop Collection <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </AnimatedSection>
                    <div className="hero-image-wrapper">
                        {heroImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`Google Umbrella Hero ${index + 1}`}
                                className={`hero-image hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="milestone" ref={milestoneRef}>
                <AnimatedSection className="container milestone-container">
                    <div className="milestone-badge">History in the Making</div>
                    <h2 className="milestone-title">The First Tech Giant to <br /> Engineer the Elements</h2>
                    <p className="milestone-text">
                        We didn't just build an umbrella; we re-imagined protection. Google stands alone as the first major technology company to apply software-level precision to physical weather defense.
                    </p>
                    <div className="milestone-stats">
                        <div className="stat-item">
                            <span className="stat-number">
                                <CountUp end={1} suffix="st" />
                            </span>
                            <span className="stat-label">Tech Umbrella</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                <CountUp end={4} suffix="+" />
                            </span>
                            <span className="stat-label">Patents</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                <CountUp end={100} suffix="%" />
                            </span>
                            <span className="stat-label">Innovation</span>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            <section className="features">
                <div className="container">
                    <h2 className="section-title">Why Google Umbrella?</h2>
                    <div className="grid grid-cols-3">
                        <AnimatedSection className="feature-card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="feature-icon feature-1">
                                <Shield size={32} />
                            </div>
                            <h3>Smart Protection</h3>
                            <p>Advanced hydrophobic coating ensures you stay perfectly dry even in the heaviest downpours.</p>
                        </AnimatedSection>
                        <AnimatedSection className="feature-card animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <div className="feature-icon feature-2">
                                <Sun size={32} />
                            </div>
                            <h3>UV Shield</h3>
                            <p>Not just for rain. Our specialized fabric blocks 99% of harmful UV rays on sunny days.</p>
                        </AnimatedSection>
                        <AnimatedSection className="feature-card animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                            <div className="feature-icon feature-3">
                                <CloudRain size={32} />
                            </div>
                            <h3>Wind Resistant</h3>
                            <p>Engineered aerodynamics allow the structure to withstand wind gusts up to 60mph.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
