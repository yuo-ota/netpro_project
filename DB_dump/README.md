# 初期設定
- ここに、db_create.sqlを置く。
- 当該ファイルの27行目のOWNER TO後の名前を任意の名前に変更する
- このディレクトリで``psql -U yuuta -f db_create.sql``を実行
- **yuutaは適宜変更してね**

# 開発中の初期化処理
- このディレクトリでターミナルを開く
- ``psql -U yuuta -c "DROP DATABASE IF EXISTS test``
- ``psql -U yuuta -f db_create.sql``
- **yuutaは適宜変更してね**