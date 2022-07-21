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
        let splittedPattern = pattern.split(',');
        for(let currentPattern of splittedPattern) {
          let duplicatedCurrentPattern = currentPattern;
          let index = 0;

          surfaceForms.forEach((surfaceForm) => {
            const surfaceFormLength = surfaceForm.length;

            index += surfaceFormLength;

            if (duplicatedCurrentPattern.startsWith(surfaceForm)) {
              duplicatedCurrentPattern = duplicatedCurrentPattern.slice(surfaceFormLength);

              if (duplicatedCurrentPattern !== "") {
                return;
              }

              const ruleError = new RuleError(
                message ??
                  `「${currentPattern}」はユーザー辞書によって禁止されています。`,
                { index: index - currentPattern.length }
              );

              report(node, ruleError);
            }

            duplicatedCurrentPattern = currentPattern;
          });
        }
      });
    },
  };
};

const module: TextlintRuleModule = reporter;

export default module;
