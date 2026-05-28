import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

import { RoomState } from "../../model/state";
import { getPrompt } from "./prompt";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

export async function generateCommentary(
  room: RoomState,
): Promise<{ success: boolean; text: string }> {
  const storiesText = room.stories
    .map((story, i) => {
      const ownerName =
        room.players.get(story.ownerId)?.username ?? "Неизвестный";
      const lines = story.sentences
        .map((s) => {
          const author =
            room.players.get(s.playerId)?.username ?? "Неизвестный";
          const twistPart = s.twist ? ` [twist: ${s.twist.content}]` : "";
          return `  [${author}]${twistPart}: ${s.content}`;
        })
        .join("\n");
      return `История ${i + 1} (начата игроком ${ownerName}):\n${lines}`;
    })
    .join("\n\n");

  const models = [
    "openrouter/owl-alpha",
    "google/gemma-4-26b-a4b-it:free",
    "qwen/qwen3-next-80b-a3b-instruct:free",
    "meta-llama/llama-3.2-3b-instruct:free",
  ];

  const prompt = getPrompt(storiesText);

  for (const model of models) {
    try {
      const { text } = await generateText({
        maxOutputTokens: 500,
        model: openrouter(model),
        prompt,
      });
      return {
        success: true,
        text,
      };
    } catch (err) {
      console.warn(`AI model ${model} failed \n\n`, err);
    }
  }

  return {
    success: false,
    text: "Не удалось получить ИИ-комментарий",
  };
}
