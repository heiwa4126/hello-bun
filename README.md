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
bun run lint
bun run format
bun run build
#
git add --all && git commit -am '...'
npm verson patch
git push && git push --tags
npm run build && npm publish --access=public # or `npm run pack`
```

## CommonJS

いまのところ bun には CommonJS へのトランスパイルが無い。
あとで tsc(typescript)でやるように追加する。
