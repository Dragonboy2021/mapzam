# 🌎  Mapzam
### 簡単に各国の情報を検索してクイズを行うことで学習するアプリケーション

![toppage](https://i.gyazo.com/aec454c1dd731f4b4c76413fb3732c3a.jpg)

<br>

# 💭 概要

### 海外各国の基礎情報、国旗、写真、地図の検索ができます。
### 国際知識の向上を目的とするためです。
### 地理(Map)と試験 (Exam)を足してできたアプリです。
<br>

自身の国際知識の向上のために、各国の情報を検索して、クイズを行う。

<br>

# 🌐  本番環境
### **http://54.65.61.196/**

#### ログイン情報(テスト用)
- Eメール test@test.com
- パスワード test123

<br>

# 💻  利用方法

#### `☆ 新規登録・ログイン`
[![Image from Gyazo](https://i.gyazo.com/04f475072acd95de8e3e8f8236d95ead.gif)](https://gyazo.com/04f475072acd95de8e3e8f8236d95ead)

#### `☆ ユーザーページ`
[![Image from Gyazo](https://i.gyazo.com/464417e74f6d1d75f67681b594b0493b.gif)](https://gyazo.com/464417e74f6d1d75f67681b594b0493b)

#### `☆ 検索ページ`
[![Image from Gyazo](https://i.gyazo.com/0e49a445153af980d8931871800e2fcd.gif)](https://gyazo.com/0e49a445153af980d8931871800e2fcd)

#### `☆ クイズページ`
[![Image from Gyazo](https://i.gyazo.com/f4240e72363dbe45dc4c58e90a78b507.gif)](https://gyazo.com/f4240e72363dbe45dc4c58e90a78b507)

#### `☆ 採点ページ`
[![Image from Gyazo](https://i.gyazo.com/f50a21506595a757229ec94c721f53f3.gif)](https://gyazo.com/f50a21506595a757229ec94c721f53f3)

#### `☆ スコアページ`
[![Image from Gyazo](https://i.gyazo.com/2c7d7fd2dca3616c84fe997d46109393.gif)](https://gyazo.com/2c7d7fd2dca3616c84fe997d46109393)

<br>

# ✅ 課題解決

| ユーザーストーリーから考える課題   | 課題解決   |
| ---------------------------- |------------
| 海外の情報を検索する課題         | 各国の名前を検索すると簡単な国々の情報、写真、国旗、地理を表示する
| 海外の情報を覚える課題           |  クイズを行うことで学習する |

<br>

# 📦  機能一覧

| 機能            | 概要             |
| -------------- | -----------------|
| ユーザー管理機能  | 新規登録・ログイン・ログアウトが可能                  |
| ユーザーページ    | ユーザーの過去解いたクイズのスコアを表示が可能         |
| 各国検索機能     | 国々の基礎情報、国旗、写真、地図の検索が可能           |
| クイズ機能       | 登録されたユーザーはランダムで作成される各国の問題が表示することが可能      |
| クイズ採点機能  　| クイズを採点することが可能                          |
| スコア表示機能   | 全てのユーザーが解いたクイズのスコアを表示することが可能  |

<br>

# ⚙️ 工夫したポイント
- Rails APIサーバーを設計し、Devise Token ライブラリーを投入してAngularで繋げること。

<br>

# 📎  ローカルでの動作方法

git clone git@github.com:Dragonboy2021/mapzam.git
<br>
cd mapzam
<br>
touch .env (.example.env フィアルに沿ってGoogleAPI KeyとPEXELS API Keyを記入する)
<br>
bundle install
<br>
npm install
<br>
ng build
<br>
rails db:create
<br>
rails db:migrate
<br>
http://localhost:3000

<br>

# 🚜 開発環境

- Node v.14.15.5
- Angular CLI 11.2.9
- mysql Ver. 14
- Rails 6.0.3.6
- Ruby 2.6.5
- Pexels API https://www.pexels.com/api/
- Google Map API https://developers.google.com/maps

<br>

# 🧪 テスト
bundle exec rspec

<br>

# 🗄️ DB設計

## User テーブル
| Column        | Type       | Options     |
| ------------- | ---------- | ----------- |
| name          | string     | null: false |
| email         | string     | null: false |
| password      | string     | null: false |

### Associate
- has_many :quizzes

## Quiz テーブル
| Column        | Type       | Options                        |
| ------------- | ---------- | ------------------------------ |
| score         | integer    | null: false                    |

### Associate
- belongs_to :user