function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>?/g, "");
}

function toUSD(cents: number) {
  return Math.round(cents * 100);
}

export { stripHTMLTags, toUSD };
