import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run(
  "ja-simple-user-dictionary",
  {
    rules: [
      {
        ruleId: "ja-simple-user-dictionary",
        rule,
        options: {
          dictionary: [
            {
              pattern: "typo",
            },
            {
              pattern: "ふいんき",
              message: "「ふいんき」ではなく「ふんいき」です。",
            },
          ],
        },
      },
    ],
  },
  {
    valid: [
      "正しい文章です。",
      "形態素解析によって、とうふいんきんは誤記と判定されない。",
    ],
    invalid: [
      {
        text: "文の途中でtypoした。",
        errors: [
          {
            message: "「typo」はユーザー辞書によって禁止されています。",
            line: 1,
            column: 6,
          },
        ],
      },
      {
        text: "ふいんきは誤記です。",
        errors: [
          {
            message: "「ふいんき」ではなく「ふんいき」です。",
            line: 1,
            column: 1,
          },
        ],
      },
    ],
  }
);
