# Mapzam

### 簡単に各国の情報を得てクイズを行うことで学習するアプリケーション

# 概要

### 海外各国の情報を

# 機能一覧
| 機能            | 概要             |
| -------------- | -----------------|
| ユーザー管理機能　| 新規登録・ログイン・ログアウトが可能  |


#  追加予定機能

#  ローカルでの動作方法

# 開発環境


# DB設計

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
| score         | string     | null: false                    |
| time          | string     | null: false                    |

### Associate
- belongs_to :user