function renderQuiz(containerId, quizData) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(quizData)) return;

  container.innerHTML = quizData.map((q, qi) => {
    const options = q.options
      .map((opt, oi) => {
        return `\n          <button class="quiz-btn" data-qi="${qi}" data-oi="${oi}">${opt}</button>`;
      })
      .join("");

    return `\n      <div class="quiz-card">\n        <div class="quiz-question">${qi + 1}. ${q.question}</div>\n        <div class="quiz-options">${options}</div>\n        <div class="quiz-explain" id="quiz-explain-${qi}">${q.explanation}</div>\n      </div>`;
  }).join("");

  container.addEventListener("click", (event) => {
    const btn = event.target.closest(".quiz-btn");
    if (!btn) return;

    const qi = Number(btn.dataset.qi);
    const oi = Number(btn.dataset.oi);
    const q = quizData[qi];
    const card = btn.closest(".quiz-card");
    if (!card || !q) return;
    if (card.dataset.locked === "true") return;

    const buttons = card.querySelectorAll(".quiz-btn");
    buttons.forEach((b, idx) => {
      b.classList.add("disabled");
      if (idx === q.answer) b.classList.add("correct");
    });

    if (oi !== q.answer) btn.classList.add("incorrect");

    const explain = card.querySelector(`#quiz-explain-${qi}`);
    if (explain) explain.classList.add("show");
    card.dataset.locked = "true";
  });
}
