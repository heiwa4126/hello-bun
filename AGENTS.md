# AGENT.md

このリポジトリで作業する AI エージェント向けのメモ。

## プロジェクト概要

`@heiwa4126/hello-bun` — Bun + TypeScript で npm パッケージを書く練習兼テンプレート。
ライブラリ (`hello()` を export) と CLI (`hello-bun`) の両方を提供する。

- ランタイム/ツールチェーン: **Bun** (開発時 1.4.0)
- 言語: TypeScript (`typescript` ^7.0.2)
- 配布形式: **ESM のみ** (`"type": "module"`)、型定義は `tsc --emitDeclarationOnly`
- ライセンス: MIT / repo: https://github.com/heiwa4126/hello-bun

## ディレクトリ構成

```
src/
  index.ts        # パッケージのエントリポイント (hello を re-export)
  hello.ts        # 実装
  hello.test.ts   # bun:test によるテスト (実装と同じ場所に置く)
  cli.ts          # bin エントリポイント (#!/usr/bin/env node)
examples/
  ex1.cjs         # ビルド成果物を CJS から require する例
  ex2.mjs         # ビルド成果物を ESM から import する例
build.ts          # Bun.build による ESM バンドル
tsconfig.json     # 開発用 (noEmit: true)
tsconfig.types.json # .d.ts 生成専用 (tsconfig.json を extends)
dist/esm/         # ビルド成果物 (公開対象、git 管理外)
build/            # 単一バイナリの出力先 (git 管理外)
```

## よく使うコマンド

```sh
bun i                # 依存インストール (preinstall で bun audit が走る)
bun run ex0          # src/cli.ts を直接実行
bun test             # テスト (bun:test)
bun run lint         # oxlint
bun run format       # oxfmt
bun run check        # oxfmt + oxlint --fix (prepack でも実行される)
bun run build        # clean → build:js (Bun.build) → build:types (tsc)
bun run ex1 / ex2    # ビルド後の成果物を CJS / ESM から使う確認
bun run binary       # 単一バイナリ (linux-x64 / windows-x64) を build/ に出力
bun run pack         # build → bun pm pack
```

変更を入れたら最低限 `bun test` と `bun run check` を通す。ビルドに影響する変更なら
`bun run build` まで確認する。

## 規約・注意点

- **インポートは `.js` 拡張子で書く** (`import { hello } from "./hello.js"`)。
  ESM 出力の解決のため。ただしテストファイル内は拡張子なし (`"./hello"`) になっている。
- **インデントはタブ**。`oxfmt` のデフォルト設定に従う (設定ファイルは置いていない)。
- `oxlint` / `oxfmt` は devDependencies に入っているので `bun i` だけで揃う。
  VS Code の oxc 拡張 (`oxc.oxc-vscode`) も `node_modules` のバイナリを自動検出する。
- 新しい公開エントリポイントを追加する場合は、
  `build.ts` の `entrypoints` と `tsconfig.types.json` の `files` の **両方** に足す必要がある。
- 型定義は `bun-plugin-dts` ではなく `tsc --emitDeclarationOnly` で生成する
  (TypeScript v7 で bun-plugin-dts が動かなくなったため)。
- CommonJS 向けのトランスパイルは **未対応**。`examples/ex1.cjs` は ESM 成果物を
  Bun の互換性に頼って読んでいる。
- エディタのフォーマッタは `.vscode/settings.json` で `oxc.oxc-vscode` に統一している
  (CLI 側の `oxfmt` と同じ)。biome は使っていない。
- 単一バイナリは Bun 本体を含むので ~100MB になる。UPX 圧縮は不可。
- 改行は `.gitattributes` で LF 固定 (`*.cmd`/`*.bat` などは例外)。

## リリース手順 (README より)

```sh
git add --all && git commit -am '...'
npm version patch   # bun に version コマンドが無いので npm を使う
git push && git push --tags
npm run build && npm publish --access=public
```

`prepack` / `postpack` で `clean-publish-scripts` が package.json の scripts を
一時的に除去/復元する。publish 周りを触るときはこれを壊さないこと。

## やらないこと

- `dist/`, `build/`, `node_modules/` を手で編集・コミットしない。
- 依存の更新は Dependabot (`.github/dependabot.yml`) が PR を出すので、
  手動でバージョンを上げる必要は基本的にない。
