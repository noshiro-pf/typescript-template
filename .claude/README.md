# `.claude/` について

## `settings.json`

Claude Code のプロジェクト設定。**厳密な JSON** としてパースされるため、
`//` 形式のコメントは書けない (書くとファイル全体がパース失敗し、
allow / deny / sandbox のすべてが無効になる)。
そのため各ルールの意図はこのファイルに記載する。

### `permissions.deny` の各ルールと理由

| ルール                      | 理由                                 |
| :-------------------------- | :----------------------------------- |
| `Bash(git add .)`           | 意図しないファイルのステージング防止 |
| `Bash(git add -A)`          | 同上                                 |
| `Bash(git push -f *)`       | 強制プッシュ防止                     |
| `Bash(git push --force *)`  | 同上                                 |
| `Bash(git reset --hard *)`  | 変更の破棄防止                       |
| `Bash(git checkout .)`      | 変更の破棄防止                       |
| `Bash(git clean -f *)`      | 追跡外ファイルの削除防止             |
| `Bash(git -C *)`            | 他ディレクトリでの操作防止           |
| `Bash(npm publish *)`       | 意図しないパッケージ公開防止         |
| `Bash(yarn publish *)`      | 同上                                 |
| `Bash(pnpm publish *)`      | 同上                                 |
| `Bash(curl *)`              | 意図しない外部通信の防止             |
| `Bash(wget *)`              | 同上                                 |
| `Read(./.env)`              | 環境変数ファイルの秘匿               |
| `Read(./.env.*)`            | 同上                                 |
| `Edit(./.env)`              | 同上                                 |
| `Edit(./.env.*)`            | 同上                                 |
| `Read(~/.ssh/**)`           | SSH 鍵                               |
| `Read(~/.aws/**)`           | AWS 認証情報                         |
| `Read(~/.config/gcloud/**)` | GCP 認証情報                         |

### 優先順位についての注意

Claude Code の権限は **`deny` > `ask` > `allow`** の順に評価される。
`ask` にある `Bash(rm *)` と `Bash(mv *)` が `allow` 側の同名エントリに
優先するため、`rm` と `mv` は `allow` に記載があっても実際には毎回確認が入る。

### パターン記法について

`Bash(ls *)` と `Bash(ls:*)` は等価だが、Claude Code が
"Yes, don't ask again" で自動生成するのは **space 形式** のため、
このファイルは space 形式に統一している。colon 形式で書くと
自動追記のたびに混在が発生する。

なお末尾の ` *` は語境界を要求する。`Bash(ls *)` は `ls -la` に一致するが
`lsof` には一致しない（`Bash(ls*)` は両方に一致してしまう）。
