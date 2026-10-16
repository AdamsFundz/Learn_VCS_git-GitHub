
const checkboxes = document.querySelectorAll(".lesson-check");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const completed = [...checkboxes].filter(
    checkbox => checkbox.checked
  ).length;

  const total = checkboxes.length;
  const percentage = total ? (completed / total) * 100 : 0;

  progressBar.style.width = `${percentage}%`;
  progressText.textContent =
    `${completed} of ${total} modules completed`;
}

checkboxes.forEach((checkbox, index) => {
  checkbox.checked =
    localStorage.getItem(`vcs-module-${index}`) === "done";

  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      `vcs-module-${index}`,
      checkbox.checked ? "done" : "not-done"
    );

    updateProgress();
  });
});

updateProgress();

const answers = {
  q1: {
    correct: "a",
    explanation: "Git is the version-control tool."
  },
  q2: {
    correct: "b",
    explanation: "git add stages changes for a future commit."
  },
  q3: {
    correct: "b",
    explanation: "git diff shows changes that have not been staged."
  },
  q4: {
    correct: "a",
    explanation:
      "git fetch downloads remote updates without automatically merging them."
  },
  q5: {
    correct: "b",
    explanation:
      "A Pull Request proposes changes for review and possible merging."
  }
};

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quizForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let score = 0;
  let explanations = [];

  for (const [question, answer] of Object.entries(answers)) {
    const selected = quizForm.querySelector(
      `input[name="${question}"]:checked`
    );

    const correct = selected &&
      selected.value === answer.correct;

    if (correct) score++;

    explanations.push(
      `${question.toUpperCase()}: ` +
      `${correct ? "Correct" : "Review"} — ` +
      answer.explanation
    );
  }

  quizResult.innerHTML = "";

  const scoreLine = document.createElement("p");
  scoreLine.textContent =
    `Your score: ${score}/${Object.keys(answers).length}`;

  const explanationList = document.createElement("ul");

  explanations.forEach(text => {
    const item = document.createElement("li");
    item.textContent = text;
    explanationList.appendChild(item);
  });

  quizResult.append(scoreLine, explanationList);
});

quizForm.addEventListener("reset", function () {
  quizResult.replaceChildren();
});
