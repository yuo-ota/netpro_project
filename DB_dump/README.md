# 初期設定

- ここに、db_create.sql を置く。
- 当該ファイルの 27 行目の OWNER TO 後の名前を任意の名前に変更する
- このディレクトリで`psql -U postgres -f DB_dump/db_create.sql`を実行
  **ユーザーは既につくられている想定です。**

# 開発中の初期化処理

- このディレクトリでターミナルを開く
- `psql -U yuuta postgres -c "DROP DATABASE IF EXISTS netpro"`
- `psql -U postgres -f DB_dump/db_create.sql`
