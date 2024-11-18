# hello-bun (@heiwa4126/hello-bun)

Bun で TypeScript でパッケージを書く練習兼テンプレート。

## install

```sh
npm install @heiwa4126/hello-bun
hello-bun
```

## usage

```javascript
// ESMScript and TypeScript example
import { hello } from "@heiwa4126/hello-bun";

console.log(hello());
console.log(hello("world"));
```

## 開発

```sh
bun i
# サンプル実行
bun run ex0
bun run linklocal
bun run ex1     # CJS
bun run ex2     # ESM

# 以下開発
## ./src の下をいろいろ編集する。
bun test
bun run lint
bun run format
bun run build
#
git add --all && git commit -am '...'
npm verson patch  # bun には version コマンドがない
git push && git push --tags
npm run build && npm publish --access=public # or `npm run pack`

# シングルバイナリ. buildの下にLinux用とWindow用ができる。
bun run binary
# Linux上で作るとWindows版が動かない
```

## CommonJS

いまのところ bun には CommonJS へのトランスパイルが無い。
あとで tsc(typescript)でやるように追加する。

## シングルバイナリ

Linux 上で作ると Windows 版が動かない(Bun 1.1.20)。Windows で作ると動く。
サイズを比較すると 4 byte 違うだけなので、なんか改行コードがどうとかのレベルだと思う。

あとサイズが巨大。bun そのもののバイナリの後ろにバンドルされたスクリプトがついてる感じで、100MB ぐらいになる。
まあ Docker イメージよりは小さいかも。
