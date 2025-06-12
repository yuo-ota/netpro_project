# netpro_project
### メンバー
- 23FI049 佐藤直弥
- 23FI072 綱島優太
- 23FI070 辻颯斗
- 
## 概要
3年前期**ネットワークプログラミングと演習**の最終課題のプロジェクトレポジトリです。

## 技術スタック
- **Vite + React + TypeScript** (フロントエンド)
- **Spring + Java** (バックエンド)

## 注意事項
- こまめにコミットをしてPRを上げてね
- 各自命名規則等は意識してね
  - [TypeScript 命名規則](https://qiita.com/mistylady/items/21843c01f0b7289a6c83)
  - [React+@ 命名規則](https://note.com/m0t0_taka/n/n059f233429f2)
  - [Java 命名規則](https://qiita.com/rkonno/items/1b30daf83854fecbb814)
  - [Java Spring 命名規則](https://qiita.com/masterpiecehack/items/89bd70a3eacfec9cf166)

### 連絡事項
- フロントエンドとバックエンドを1つのレポジトリで管理しているため、全般的なものを除き``.gitignore``ファイルは``/frontend/``, ``/backend/``内に各自用意してね

## 環境構築法
多分やらなくて大丈夫だと思う...
### フロントエンド
**履歴**
```
npm create vite@latest
  Project name: frontend
  Select a framework: › React
  Select a variant: › TypeScript
cd frontend
npm install
npm install tailwindcss @tailwindcss/vite
```
**多分こっちだけすればいいかな**
```
cd frontend
npm install
npm run dev
```

### バックエンド
```
Spring Boot Extension Packが入っていることを確認
上部の検索欄で
java: Create Java Project
Spring Boot
Maven Project
3.5.0
Java
jp.ac.dendai
backend
Jar
21
Spring Webs
net_projectディレクトリを選択

cd backend
mvn clean install
mvn spring-boot:run
```

