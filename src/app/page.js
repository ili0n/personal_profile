'use client';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaGithub, FaHome, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';
import styles from './page.module.css';
import portfolio from '../data/portfolio.json';

export default function Home() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const saved = localStorage.getItem('theme') || 'dark';
        if (saved !== theme) {
            setTheme(saved);
        }

        document.documentElement.setAttribute('data-theme', saved);

        const anchors = document.querySelectorAll('a[href^="#"]');
        const onAnchorClick = (e) => {
            e.preventDefault();
            const target = document.querySelector(
                e.currentTarget.getAttribute('href')
            );
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };
        anchors.forEach((a) => a.addEventListener('click', onAnchorClick));

        const sections = document.querySelectorAll('section');
        const navSelector = `.${styles.navItems} a`;
        const onScroll = () => {
            const navLinks = document.querySelectorAll(navSelector);
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionBottom
                ) {
                    navLinks.forEach((item) => {
                        item.style.color = 'var(--color-text)';
                    });
                    const activeLink = document.querySelector(
                        `.${styles.navItems} a[href="#${section.id}"]`
                    );
                    if (activeLink) {
                        activeLink.style.color = 'var(--color-accent)';
                    }
                }
            });
        };
        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => {
            anchors.forEach((a) =>
                a.removeEventListener('click', onAnchorClick)
            );
            window.removeEventListener('scroll', onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        }
        setTheme(next);
    };

    const { hero, about, projects, contact, experience, footer } = portfolio;

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <a href="#" className={styles.logo}>
                        <FaHome />
                    </a>
                    <ul className={styles.navItems}>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#experience">Experience</a>
                        </li>
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                        <li>
                            <button
                                className={styles.themeToggle}
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? '🌙' : '☀️'}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className={styles.main}>
                <section className={styles.hero}>
                    <span className={styles.heroTag}>Hi, my name is</span>
                    <h1>{hero.name}.</h1>
                    <h2>{hero.title}</h2>
                    <p>
                        {hero.intro}
                        {hero.focus}
                    </p>
                    <a href="#projects" className={styles.ctaButton}>
                        Check out my work
                    </a>
                </section>

                <section className={styles.about} id="about">
                    <div className={styles.aboutContent}>
                        <h2>About Me</h2>
                        <p>{about.intro}</p>
                        <p>{about.story}</p>
                        <p>{about.today}</p>
                    </div>
                    <div className={styles.aboutImage}>
                        <Image
                            src="/profile.png"
                            alt="Profile picture"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 200px, 300px"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '400px',
                                maxHeight: '400px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </section>

                {experience && experience.length > 0 && (
                    <section className={styles.experience} id="experience">
                        <h2>Experience</h2>
                        <div className={styles.experienceList}>
                            {experience.map((item) => (
                                <div
                                    key={`${item.company}-${item.role}-${item.duration}`}
                                    className={styles.experienceItem}
                                >
                                    <h3>
                                        {item.role}{' '}
                                        <span className={styles.company}>
                      @ {item.company}
                    </span>
                                    </h3>
                                    <p className={styles.date}>{item.duration}</p>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className={styles.projects} id="projects">
                    <h2>Cool stuff I&apos;ve made</h2>
                    <div className={styles.projectGrid}>
                        {projects?.map((project) => (
                            <article
                                key={project.name}
                                className={styles.projectCard}
                            >
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                {project.tech && (
                                    <ul className={styles.techChips}>
                                        {project.tech.map((t) => (
                                            <li key={t} className={styles.techChip}>
                                                <span>{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.projectLink}
                                    >
                                        View project
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>

                    {/* View more button to GitHub from JSON */}
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.ctaButton}
                        >
                            View more on GitHub
                        </a>
                    </div>
                </section>

                <section className={styles.contact} id="contact">
                    <h2>Contact</h2>
                    <p>{contact.message}</p>
                    <div className={styles.socialLinks}>
                        <a
                            href={`mailto:${contact.email}`}
                            className={styles.socialLink}
                        >
                            <FaEnvelope />
                        </a>
                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.socialLink}
                        >
                            <FaGithub />
                        </a>
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.socialLink}
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>{footer.text}
                <a href={footer.href}>
                    {footer.credit}
                </a>
                </p>
            </footer>
        </>
    );
}
