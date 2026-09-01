# hello-bun (@heiwa4126/hello-bun)

Bun で TypeScript でパッケージを書く練習兼テンプレート。

## (publishした場合の) install

```sh
npm install @heiwa4126/hello-bun
hello-bun
```

## (publishした場合の) usage

```javascript
// ESMScript and TypeScript example
import { hello } from "@heiwa4126/hello-bun";

console.log(hello());
console.log(hello("world"));
```

## 開発

```sh
bun i
# ./src/cli.ts を実行
bun run ex0

# 以下開発
## ./src の下をいろいろ編集する。
bun test
bun run lint
bun run format

## ビルド
bun run build
## ビルド後
bun exec hello-bun
bun run ex1     # CJS
bun run ex2     # ESM
#
git add --all && git commit -am '...'
npm version patch  # bun には version コマンドがない
git push && git push --tags
npm run build && npm publish --access=public # or `npm run pack`

# シングルバイナリ. buildの下にLinux用とWindow用ができる。
bun run binary
```

## CommonJS

いまのところ bun には CommonJS へのトランスパイルが無い。
あとで tsc(typescript)でやるように追加する。

## シングルバイナリ

サイズが巨大。bun そのもののバイナリの後ろにバンドルされたスクリプトがついてる感じで、100MB ぐらいになる。
まあ Docker イメージよりは小さいかも。

UPX はできない

## TypeScript v7 と DTS

v7 で [bun-plugin-dts - npm](https://www.npmjs.com/package/bun-plugin-dts) が動かなくなりました。
v5 にもどすのはイヤだったので、

- 明示的に typescript を依存に含め
- dts は `tsc --emitDeclarationOnly` で作る

ように `bun run build` を改造しました。
