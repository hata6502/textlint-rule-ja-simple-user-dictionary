# textlint-rule-ja-simple-user-dictionary

シンプルなユーザー辞書をもとに校正するtextlintルール。

## 特長

### シンプルな辞書定義

正規表現を使わずに辞書を定義します。
なぜ辞書に登録されているか、説明を書くこともできます。

### 文脈に合ったマッチング

形態素解析を行い、単語単位で入力文章と辞書データをマッチングします。
文脈に合わない不正確なマッチを防ぎます。

### 置換機能なし

文脈が崩れやすいため、文章の置換機能はありません。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-simple-user-dictionary

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "ja-simple-user-dictionary": {
      "dictionary": [
        {
          "pattern": "typo"
        },
        {
          "pattern": "ふいんき",
          "message": "「ふいんき」ではなく「ふんいき」です。"
        }
      ]
    }
  }
}
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © Tomoyuki Hata
