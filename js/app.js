// ============================================
// Activity Feed Data
// 新しい活動を追加するときは、このリストの先頭に追加するだけ。
// 自動的に日付順（新しいものが上）で表示されます。
// ============================================
const ACTIVITIES = [
    {
        date: '2026-02-01',
        category: 'research',
        title: '筑波大学大学院 入学準備',
        description: '筑波大学大学院への進学に向けた研究計画の策定と、POMDP攻撃モデル研究の拡張方針を整理中。',
        link: null,
    },
    {
        date: '2025-12-15',
        category: 'research',
        title: 'POMDPを用いた自律型攻撃エージェントの設計と評価（卒業論文）',
        description: '不完全情報下での攻撃行動をPOMDPで定式化し、ベースライン3方策を上回る性能を達成。マルチホスト・ファイアウォール環境への拡張も実施。',
        link: 'pages/research.html',
    },
    {
        date: '2025-08-20',
        category: 'event',
        title: 'Security Camp 2025',
        description: 'AI Agent開発ゼミに参加。最先端のセキュリティAIエージェント技術について集中的に学習・開発を実施。',
        link: 'https://qiita.com/HexagonMD/items/6112032b6a99f3c37092',
        linkLabel: '参加レポート',
    },
    {
        date: '2025-10-15',
        category: 'event',
        title: 'Security Camp 2025 Mini チューター',
        description: 'セキュリティ・キャンプミニにチューターとして参加。後進の育成に貢献。',
        link: null,
    },
    {
        date: '2024-09-01',
        category: 'certification',
        title: '基本情報技術者試験 合格',
        description: '基本情報技術者試験に合格。情報技術の基礎知識を体系的に証明。',
        link: null,
    },
    {
        date: '2025-06-01',
        category: 'article',
        title: 'セキュリティ×AI研究の知見をQiitaで発信',
        description: 'POMDP研究やセキュリティに関する技術記事をQiitaで公開。コミュニティへの知識共有を継続中。',
        link: 'https://qiita.com/HexagonMD',
        linkLabel: 'Qiitaプロフィール',
    },
];

// ============================================
// App Module
// ============================================
const App = {
    init() {
        this.initTheme();
        this.initScrollProgress();
        this.initActivityFeed();
        this.initCounters();
        this.initSkillBars();
        this.initLightbox();
        this.initScrollReveal();
    },

    // ------- Theme Toggle -------
    initTheme() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        const updateTooltip = () => {
            const current = document.documentElement.getAttribute('data-theme');
            toggle.title = current === 'light' ? 'ダークモードにする' : 'ライトモードにする';
        };

        const stored = localStorage.getItem('theme');
        if (stored) {
            document.documentElement.setAttribute('data-theme', stored);
        }
        updateTooltip();

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateTooltip();
        });
    },

    // ------- Scroll Progress -------
    initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = `${pct}%`;
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
    },

    // ------- Activity Feed (Wantedly-like) -------
    initActivityFeed() {
        const grid = document.getElementById('feedGrid');
        const filters = document.getElementById('feedFilters');
        const emptyState = document.getElementById('feedEmpty');
        if (!grid || !filters) return;

        // Sort activities by date (newest first)
        const sorted = [...ACTIVITIES].sort((a, b) => new Date(b.date) - new Date(a.date));

        const renderCards = (filter = 'all') => {
            const filtered = filter === 'all'
                ? sorted
                : sorted.filter(a => a.category === filter);

            if (filtered.length === 0) {
                grid.innerHTML = '';
                if (emptyState) emptyState.style.display = 'block';
                return;
            }
            if (emptyState) emptyState.style.display = 'none';

            grid.innerHTML = filtered.map(activity => {
                const dateStr = new Date(activity.date).toLocaleDateString('ja-JP', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });
                const isExternal = activity.link && activity.link.startsWith('http');
                const linkTarget = isExternal ? ' target="_blank" rel="noopener"' : '';
                const linkLabel = activity.linkLabel || '詳細を見る';

                return `
                <${activity.link ? 'a' : 'div'} 
                    class="feed-card" 
                    ${activity.link ? `href="${activity.link}"${linkTarget}` : ''}
                    data-category="${activity.category}"
                >
                    <div class="feed-card-body">
                        <div class="feed-card-meta">
                            <span class="feed-card-date">${dateStr}</span>
                            <span class="feed-card-tag ${activity.category}">${getCategoryLabel(activity.category)}</span>
                        </div>
                        <h3 class="feed-card-title">${activity.title}</h3>
                        <p class="feed-card-desc">${activity.description}</p>
                    </div>
                    ${activity.link ? `
                    <div class="feed-card-footer">
                        <span class="feed-card-link">
                            ${linkLabel}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7v10"/>
                            </svg>
                        </span>
                    </div>` : ''}
                </${activity.link ? 'a' : 'div'}>`;
            }).join('');

            // Re-trigger scroll reveal for new cards
            this.observeNewCards();
        };

        // Filter click handlers
        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards(btn.dataset.filter);
        });

        // Initial render
        renderCards();
    },

    observeNewCards() {
        const cards = document.querySelectorAll('.feed-card:not(.observed)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.classList.add('observed');
            observer.observe(card);
        });
    },

    // ------- Number Counters -------
    initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-count]');
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.count, 10);
                    const duration = 1800;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };

                    updateCounter();
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    },

    // ------- Skill Bars -------
    initSkillBars() {
        const bars = document.querySelectorAll('.skill-bar-fill');
        if (bars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = `${entry.target.dataset.level}%`;
                }
            });
        }, { threshold: 0.5 });

        bars.forEach(bar => observer.observe(bar));
    },

    // ------- Lightbox -------
    initLightbox() {
        const profileImg = document.getElementById('profileImg');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!profileImg || !lightbox || !lightboxImg) return;

        profileImg.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = profileImg.src;
            document.body.style.overflow = 'hidden';
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    },

    // ------- Scroll Reveal -------
    initScrollReveal() {
        const selectors = [
            '.section-header',
            '.about-grid',
            '.skills-grid > *',
            '.research-card',
            '.contact-grid > *',
        ];

        const elements = document.querySelectorAll(selectors.join(','));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    },
};

// Utility
function getCategoryLabel(cat) {
    const labels = {
        research: '研究',
        event: 'イベント',
        certification: '資格・認定',
        article: '記事',
    };
    return labels[cat] || cat;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});