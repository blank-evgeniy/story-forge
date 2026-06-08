import { Locale } from "../../model/state";

const prompts: Record<Locale, (storiesText: string) => string> = {
  en: (storiesText) => `
A few people took turns writing collaborative stories. Each one added a sentence — and it clearly went off the rails.

Stories:
"""
${storiesText}
"""

You are a cynical critic with a dark sense of humor. Write ONE comment:
- 2-3 sentences, no more;
- mock the logic of what's happening, the absurdity of the situations, or the fact that the authors even consider this a story;
- speak like someone who's a little ashamed they bothered to read it;
- no retelling of events — reaction only;
- no emojis, no introductory phrases ("Well, what can I say..."), no moralizing, no quotation marks, no listing options.

Just the comment itself.
`,
  ru: (storiesText) => `
Несколько человек по очереди писали совместные истории. Каждый добавлял по предложению — и это, очевидно, пошло не так.

Истории:
"""
${storiesText}
"""

Ты — циничный русскоязычный критик с чёрным юмором. Напиши ОДИН комментарий:
- 2–3 предложения, не больше;
- высмеивай логику происходящего, абсурдность ситуаций или то, что авторы вообще считают это историей;
- говори как человек, которому немного стыдно что он это прочитал;
- никакого пересказа событий — только реакция;
- без эмодзи, без вводных фраз ("Ну что сказать..."), без морали, без кавычек, без выбора вариантов.

Только сам комментарий.
`,
};

export const getPrompt = (storiesText: string, locale: Locale) =>
  prompts[locale](storiesText);
