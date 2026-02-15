// ============================================
// Activity Feed Data
// 新しい活動を追加するときは、このリストの先頭に追加するだけ。
// 自動的に日付順（新しいものが上）で表示されます。
// ============================================
const ACTIVITIES = [
    {
        date: '2025-12-01',
        endDate: null,
        category: 'intern',
        title: '株式会社プレイド Signalsチーム インターン開始',
        description: 'フルスタックエンジニアとして従事。AIチャットのトークン数削減・回答精度向上のためのバックエンドツールやワーキングメモリの開発、広告媒体コネクタの機能開発・改善を担当。',
        link: null,
    },
    {
        date: '2025-10-27',
        category: 'intern',
        title: 'SCSKセキュリティ株式会社 インターン',
        description: '3日間のインターンシップに参加。脆弱性診断体験ワークやCTFに取り組み、実践的なセキュリティスキルを習得。',
        link: null,
    },
    {
        date: '2026-02-28',
        category: 'research',
        title: 'POMDPを用いた自律型攻撃エージェントの設計と評価（卒業論文）',
        description: '不完全情報下での攻撃行動をPOMDPで定式化し、ベースライン3方策を上回る性能を達成。マルチホスト・ファイアウォール環境への拡張も実施。',
        link: 'pages/research.html',
    },
    {
        date: '2025-08-11',
        category: 'event',
        title: 'Security Camp 2025 Z3『セキュリティ用AI Agent開発ゼミ』',
        description: '8/11〜16の5日間のチーム開発で、DNS・Shodan・VirusTotalを組み合わせたFQDN探索ツールを開発。PlaywrightでCAPTCHAを回避したスクレイピングによるFQDN補完等を担当。',
        link: 'https://qiita.com/HexagonMD/items/6112032b6a99f3c37092',
        linkLabel: '参加レポート',
    },
    {
        date: '2026-03-26',
        category: 'event',
        title: 'セキュリティキャンプコネクト2026 AIレッドチーミングクラス チューター',
        description: '3/26〜29の4日間、AIレッドチーミングクラスにチューターとして参加予定。LLMやマルチエージェントシステムに内在するセキュリティ課題を扱い、プロンプトインジェクションやエージェント間通信の脅威を座学と実践で再現・分析するクラス。',
        link: 'https://www.ipa.go.jp/jinzai/security-camp/2025/connect/ai.html',
        linkLabel: '詳細ページ',
    },
    {
        date: '2025-10-18',
        category: 'event',
        title: 'Security Camp 2025 Mini チューター',
        description: '10/18〜19の2日間、セキュリティ・キャンプミニにチューターとして参加。得意分野であるLLMやエージェントについてのサポートを行い、後進の育成に貢献。',
        link: null,
    },
    {
        date: '2024-09',
        category: 'certification',
        title: '基本情報技術者試験 合格',
        description: '基本情報技術者試験に合格。情報技術の基礎知識を体系的に証明。',
        link: null,
    },
    {
        date: '2025-03',
        category: 'certification',
        title: 'TOEIC 685点',
        description: 'TOEIC Listening & Reading Testで685点を取得。',
        link: null,
    },
    {
        date: '2021-11',
        category: 'certification',
        title: '英検2級 合格',
        description: '実用英語技能検定2級に合格。',
        link: null,
    },
    {
        date: '2021-10-23',
        category: 'certification',
        title: '高校サッカー部 歴代最高記録達成',
        description: 'ゲームキャプテンとしてチームを率い、埼玉県高校サッカー選手権予選でシード無しの予選上がりから唯一のベスト16を達成。高校歴代最高成績を更新。',
        link: null,
    },
    {
        date: '2025-12-07',
        category: 'article',
        title: '【実機 Cisco 3725 から IOS を抽出して GNS3 に導入するまで】手順まとめ',
        description: '実機のCisco 3725ルータからIOSイメージを抽出し、GNS3上で動作させるまでの手順を解説。',
        link: 'https://qiita.com/HexagonMD/items/55d7ad816b448291c30a',
        linkLabel: 'Qiita記事',
    },
    {
        date: '2025-10-26',
        category: 'article',
        title: 'Vue初心者がVue Fes Japan 2025に参加して感じたAIとチーム開発のリアル',
        description: 'Vue Fes Japan 2025に参加し、Vue初心者の視点からAIとチーム開発について感じたことを共有。',
        link: 'https://qiita.com/HexagonMD/items/e433467a06fb682fe9b7',
        linkLabel: 'Qiita記事',
    },
    {
        date: '2025-09-06',
        category: 'article',
        title: '早稲田大学大学院 基幹理工学研究科 外部一般入試 合格体験記',
        description: '2025年7月実施の早稲田大学大学院 外部一般入試の合格体験記。TOEIC対策・専門科目勉強法・面接対策について共有。',
        link: 'https://note.com/hexa_penta1025/n/n2cead173ae90',
        linkLabel: 'note記事',
    },
    {
        date: '2025-09-04',
        category: 'article',
        title: '筑波大学 大学院システム情報工学研究群 外部推薦入試 合格体験記',
        description: '2025年筑波大学大学院 システム情報工学研究群の外部推薦入試の合格体験記。',
        link: 'https://note.com/hexa_penta1025/n/na3bbeca49992',
        linkLabel: 'note記事',
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
                const fmtDate = (d) => {
                    const parts = d.split('-');
                    if (parts.length === 2) {
                        return new Date(d + '-01').toLocaleDateString('ja-JP', {
                            year: 'numeric', month: 'long'
                        });
                    }
                    return new Date(d).toLocaleDateString('ja-JP', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });
                };
                let dateStr = '';
                if (activity.date) {
                    const start = fmtDate(activity.date);
                    if ('endDate' in activity) {
                        const end = activity.endDate ? fmtDate(activity.endDate) : '現在';
                        dateStr = `${start} — ${end}`;
                    } else {
                        dateStr = start;
                    }
                }
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
                            ${dateStr ? `<span class="feed-card-date">${dateStr}</span>` : ''}
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
        intern: 'インターン',
        certification: '資格・実績',
        article: '記事',
    };
    return labels[cat] || cat;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});