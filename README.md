# Guitar Tab PWA - He's a Pirate

史詩吉他三聲部 - 戰鬥編排版 PWA。

## 專案特性
- **Progressive Web App (PWA)**: 支援離線訪問與安裝至桌面/手機。
- **Modern Tech Stack**: 使用 Node.js 25, Vite, TypeScript, 與 Tailwind CSS。
- **GitHub Actions**: 自動化部署至 GitHub Pages。
- **Epic UI**: 採用玻璃擬態 (Glassmorphism) 設計。

## 專案結構
```text
/pwa_guitar
├── src/
│   ├── data/      # 樂譜數據
│   ├── styles/    # 樣式表
│   ├── types/     # TypeScript 類型定義
│   └── main.ts    # 應用主邏輯
├── .husky/        # Git Pre-commit Hooks
└── public/        # 靜態資源 (Icons, Manifest)
```

## 開發者指南
- **Pre-commit Hook**: 本專案已設置 Husky + lint-staged。每次 `git commit` 前會自動執行 ESLint 修復，確保代碼符合規範。
- `npm run dev`: 啟動開發伺服器。
- `npm run lint`: 手動執行代碼檢查。
- `npm run build`: 構建正式版本。

