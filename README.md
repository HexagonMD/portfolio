# Personal Portfolio Website

森 大地 (Daichi Mori) のポートフォリオサイトです。  
東京電機大学 情報システム工学科卒業予定 → 2026年4月より筑波大学大学院 情報理工学位プログラム進学予定。  
現在は株式会社プレイドにてインターンとして勤務しています。

## 公開URL

[https://daichi-mori.net](https://daichi-mori.net)

## サイト構成

| ファイル | 内容 |
|---------|------|
| `index.html` | トップページ — 活動フィード / About / スキル / 研究 / 連絡先 |
| `pages/background.html` | リーダーシップ経験・学び |
| `pages/research.html` | 研究概要 — POMDPを用いた自律型攻撃エージェントの設計と評価 |

## 使用技術

- HTML5 / CSS3 / JavaScript（フレームワーク不使用）
- Google Fonts（Sora・IBM Plex Mono・Noto Sans JP）
- ダーク/ライトテーマ切替対応

## ディレクトリ構成

```
portfolio/
├── index.html
├── css/
│   ├── main.css          # デザインシステム・レイアウト
│   ├── animations.css    # アニメーション定義
│   └── responsive.css    # レスポンシブ対応
├── js/
│   ├── app.js            # フィード描画・テーマ切替・カウンター等
│   ├── navigation.js     # ナビゲーション・スムーススクロール
│   └── animations.js     # ホバーエフェクト
├── assets/images/        # プロフィール画像・ロゴ
├── pages/                # サブページ
├── CNAME                 # カスタムドメイン設定
└── README.md
```

## 活動の追加方法

トップページの活動フィードは `js/app.js` 先頭の `ACTIVITIES` 配列で管理されています。

```js
const ACTIVITIES = [
    {
        date: '2026-02-15',           // YYYY-MM-DD
        category: 'research',         // カテゴリ（下表参照）
        title: 'タイトル',
        description: '説明文',
        link: 'https://example.com',  // 不要なら null
        linkLabel: '詳細を見る',       // 省略可
    },
    // ...
];
```

### カテゴリ一覧

| category | 表示名 | カラー |
|----------|--------|--------|
| `research` | 研究 | ティール |
| `event` | イベント | グリーン |
| `certification` | 資格・認定 | イエロー |
| `article` | 記事 | シアン |

### 補足

- `date` 降順で自動ソートされます
- `link` が `http` で始まる場合は別タブで開きます
- フィードはカテゴリタブで絞り込み可能です
- カテゴリ追加時は `getCategoryLabel()`（app.js）とCSS側のスタイル定義も追加してください

## ライセンス

[LICENSE](LICENSE) を参照してください。