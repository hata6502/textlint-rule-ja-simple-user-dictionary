import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import { tokenize } from "kuromojin";

const reporter: TextlintRuleReporter = (context, userOptions) => {
  const { getSource, report, RuleError, Syntax } = context;

  const options: {
    dictionary: { pattern: string; message?: string }[];
  } = {
    dictionary: [],
    ...userOptions,
  };

  return {
    async [Syntax.Str](node) {
      const tokens = await tokenize(getSource(node));
      const surfaceForms = tokens.map(({ surface_form }) => surface_form);

      options.dictionary.forEach(({ pattern, message }) => {
        let currentPattern = pattern;
        let index = 0;

        surfaceForms.forEach((surfaceForm) => {
          const surfaceFormLength = surfaceForm.length;

          index += surfaceFormLength;

          if (currentPattern.startsWith(surfaceForm)) {
            currentPattern = currentPattern.slice(surfaceFormLength);

            if (currentPattern !== "") {
              return;
            }

            const ruleError = new RuleError(
              message ||
                `「${pattern}」はユーザー辞書によって禁止されています。`,
              { index: index - pattern.length }
            );

            report(node, ruleError);
          }

          currentPattern = pattern;
        });
      });
    },
  };
};

const module: TextlintRuleModule = reporter;

export default module;
