// ===== Tab Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.getElementById('nav-toggle');
    const navTabs = document.getElementById('nav-tabs');

    function switchTab(tabId) {
        sections.forEach(s => s.classList.remove('active'));
        tabLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById(tabId);
        if (target) {
            target.classList.add('active');
        }

        tabLinks.forEach(l => {
            if (l.dataset.tab === tabId) {
                l.classList.add('active');
            }
        });

        // Close mobile menu
        navTabs.classList.remove('open');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.tab);
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navTabs.classList.toggle('open');
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navTabs.classList.remove('open');
        }
    });

    // ===== Certification Filters =====
    const certFilters = document.querySelectorAll('.cert-filter');
    const certCards = document.querySelectorAll('.cert-card');

    certFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterVal = filter.dataset.filter;

            certFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            certCards.forEach(card => {
                if (filterVal === 'all' || card.dataset.institution === filterVal) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===== Scroll-triggered fade-in =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .timeline-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
