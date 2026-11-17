const state = {
  tasks: defaultTasks.map((text, index) => ({ text, done: false, id: index + 1 })),
  quizHistory: [],
  plans: [],
  recent: [],
  sessions: 0
};

let currentFlash = 0;
let flashFlipped = false;
let timerSeconds = 1500;
let timerInterval = null;
let timerRunning = false;
let activeQuiz = [];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("studymate_state"));
    if (saved) {
      Object.assign(state, saved);
    }
  } catch (error) {
    // Ignore malformed saved state.
  }
}

function saveState() {
  try {
    localStorage.setItem("studymate_state", JSON.stringify(state));
  } catch (error) {
    // Ignore storage failures in restricted environments.
  }
}

function fillSelects() {
  const names = Object.keys(subjects);
  ["tutorSubject", "quizSubject", "planSubject", "flashSubject"].forEach((id) => {
    const el = document.getElementById(id);
    el.innerHTML = names.map((name) => `<option>${name}</option>`).join("");
  });
}

function showTab(id, btn) {
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
  (btn || document.querySelector(`[data-tab="${id}"]`)).classList.add("active");

  if (id === "quiz" && !activeQuiz.length) {
    buildQuiz();
  }

  if (id === "progress") {
    renderProgress();
  }

  if (id === "flashcards") {
    loadFlashcards();
  }
}

function toggleTheme() {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("studymate_theme", dark ? "dark" : "light");
}

function renderSubjects() {
  const subjectTiles = document.getElementById("subjectTiles");
  subjectTiles.innerHTML = Object.entries(subjects)
    .map(([name, meta]) => `
      <button class="subject-tile" onclick="openSubject('${name}')">
        <span class="emoji">${meta.emoji}</span>
        <strong>${name}</strong>
        <small>${meta.examples.length} tutor examples</small>
      </button>
    `)
    .join("");
}

function openSubject(name) {
  document.getElementById("tutorSubject").value = name;
  document.getElementById("quizSubject").value = name;
  document.getElementById("flashSubject").value = name;
  renderExamples();
  showTab("tutor", document.querySelector('[data-tab="tutor"]'));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = state.tasks
    .map((task) => `
      <label class="task ${task.done ? "done" : ""}">
        <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${task.id}, this.checked)">
        <span>${escapeHTML(task.text)}</span>
        <button class="chip" title="Remove task" onclick="removeTask(${task.id});event.preventDefault()">×</button>
      </label>
    `)
    .join("");

  const completed = state.tasks.filter((task) => task.done).length;
  const percent = state.tasks.length ? (completed / state.tasks.length) * 100 : 0;

  document.getElementById("taskBar").style.width = `${percent}%`;
  document.getElementById("taskSummary").textContent = `${completed} of ${state.tasks.length} tasks completed`;
  document.getElementById("dashTasks").textContent = completed;
}

function toggleTask(id, done) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (task) {
    task.done = done;
  }

  saveState();
  renderTasks();
  renderProgress();
}

function addTask() {
  const input = document.getElementById("newTask");
  const value = input.value.trim();

  if (!value) {
    return;
  }

  state.tasks.push({ id: Date.now(), text: value, done: false });
  input.value = "";

  saveState();
  renderTasks();
}

function removeTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveState();
  renderTasks();
}

function renderExamples() {
  const subjectName = document.getElementById("tutorSubject").value || Object.keys(subjects)[0];
  const filterValue = (document.getElementById("exampleFilter").value || "").toLowerCase();

  const examples = subjects[subjectName].examples.filter(([question, answer]) => {
    return question.toLowerCase().includes(filterValue) || answer.toLowerCase().includes(filterValue);
  });

  const examplesContainer = document.getElementById("examples");
  examplesContainer.innerHTML = examples.length
    ? examples.map(([question]) => `<button class="chip" onclick="useExample('${encodeURIComponent(question)}')">${escapeHTML(question)}</button>`).join("")
    : '<p class="muted small">No matching examples.</p>';
}

function useExample(encodedQuestion) {
  const question = decodeURIComponent(encodedQuestion);
  document.getElementById("question").value = question;
  askTutor();
}

function quickAsk(question) {
  document.getElementById("question").value = question;
  showTab("tutor", document.querySelector('[data-tab="tutor"]'));
  askTutor();
}

function clearTutor() {
  document.getElementById("question").value = "";
  document.getElementById("tutorResponse").innerHTML = '<h3>Your explanation appears here</h3><p class="muted">Type a question or choose a sample.</p>';
}

function findAnswer(question, subjectName) {
  const keywordText = question.toLowerCase();
  const subjectExamples = subjects[subjectName].examples.map(([prompt, answer]) => ({
    q: prompt,
    a: answer,
    s: subjectName,
    score: 0
  }));

  for (const candidate of subjectExamples) {
    const words = candidate.q.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    candidate.score = words.filter((word) => word.length > 3 && keywordText.includes(word)).length;
    if (keywordText.includes(candidate.q.toLowerCase())) {
      candidate.score += 10;
    }
  }

  subjectExamples.sort((left, right) => right.score - left.score);
  if (subjectExamples[0] && subjectExamples[0].score > 0) {
    return subjectExamples[0];
  }

  const crossMatches = Object.entries(subjects)
    .flatMap(([name, meta]) => meta.examples.map(([prompt, answer]) => ({
      q: prompt,
      a: answer,
      s: name,
      score: prompt.toLowerCase().split(/\s+/).filter((word) => word.length > 3 && keywordText.includes(word)).length
    })))
    .sort((left, right) => right.score - left.score);

  return crossMatches[0] && crossMatches[0].score > 1 ? crossMatches[0] : null;
}

function formatAnswer(answer, mode) {
  if (mode === "exam") {
    return `<h3>Answer for an exam</h3><p><b>Definition / introduction:</b> ${answer}</p><p><b>Key points:</b></p><ol><li>Start with the definition and principle.</li><li>Explain the working, formula or important features.</li><li>Include a labelled diagram or example if relevant.</li><li>End with the application or conclusion.</li></ol><p class="muted small">Use the format above to expand this concept into an 8-mark answer. Verify any course-specific detail against your notes.</p>`;
  }

  if (mode === "viva") {
    return `<h3>Viva preparation</h3><p><b>Core answer:</b> ${answer}</p><p><b>Practise saying it in 2–3 sentences.</b></p><ul><li>What is the definition?</li><li>Why is it used?</li><li>Can you give one practical example?</li></ul>`;
  }

  if (mode === "steps") {
    return `<h3>Step-by-step explanation</h3><ol><li>Identify the main concept in the question.</li><li>Remember the principle or definition: ${answer}</li><li>Write one example from your notes.</li><li>Check the final answer and units/syntax if applicable.</li></ol>`;
  }

  return `<h3>Simple explanation</h3><p>${answer}</p><p><b>How to remember it:</b> Write the main definition in one line, then add one example and one application.</p>`;
}

function askTutor() {
  const question = document.getElementById("question").value.trim();
  const subjectName = document.getElementById("tutorSubject").value;
  const mode = document.getElementById("answerMode").value;
  const responseBox = document.getElementById("tutorResponse");

  if (!question) {
    responseBox.innerHTML = "<h3>Please enter a question</h3><p>Type a question or choose one of the sample questions.</p>";
    return;
  }

  const match = findAnswer(question, subjectName);
  let content;

  if (match) {
    content = formatAnswer(match.a, mode);
    if (match.s && match.s !== subjectName) {
      content += `<p class="muted small">Closest match found under ${match.s}.</p>`;
    }
    document.getElementById("tutorStatus").textContent = "Answer matched from the local subject knowledge bank.";
  } else {
    content = `<h3>Let's break down your question</h3><p>I couldn't find an exact match in the current local knowledge bank. Try selecting a related example, or rephrase your question using a topic such as variables, derivatives, lasers, pH, orthographic projection or phishing.</p><p class="muted small">This version uses a curated local knowledge base, not a live AI model, so it may not answer every free-form question accurately.</p>`;
    document.getElementById("tutorStatus").textContent = "No close local example found.";
  }

  responseBox.innerHTML = content;

  state.recent.unshift({ q: question, sub: subjectName, date: new Date().toLocaleString() });
  state.recent = state.recent.slice(0, 6);
  saveState();
  renderRecent();
}

function renderRecent() {
  const questionList = document.getElementById("recentQuestions");

  questionList.innerHTML = state.recent.length
    ? state.recent.map((entry) => `<p><b>${escapeHTML(entry.sub)}</b><br>${escapeHTML(entry.q)}<br><span class="muted">${escapeHTML(entry.date)}</span></p>`).join("")
    : "Your recent questions will appear here.";
}

function buildQuiz() {
  const subjectName = document.getElementById("quizSubject").value || Object.keys(quizData)[0];
  const count = Number(document.getElementById("quizCount").value) || 5;

  activeQuiz = shuffle([...quizData[subjectName]]).slice(0, count);

  const quizBox = document.getElementById("quizBox");
  quizBox.innerHTML = activeQuiz
    .map((question, index) => `
      <div class="quiz-question">
        <p>${index + 1}. ${escapeHTML(question[0])}</p>
        ${question[1].map((option, optionIndex) => `
          <label class="option">
            <input type="radio" name="quiz${index}" value="${optionIndex}"> ${escapeHTML(option)}
          </label>
        `).join("")}
        <div class="small muted hidden" id="explain${index}"></div>
      </div>
    `)
    .join("");

  document.getElementById("quizResult").classList.add("hidden");
}

function submitQuiz() {
  if (!activeQuiz.length) {
    return;
  }

  let score = 0;
  let answeredCount = 0;

  activeQuiz.forEach((question, index) => {
    const selected = document.querySelector(`input[name="quiz${index}"]:checked`);

    if (selected) {
      answeredCount++;
      if (+selected.value === question[2]) {
        score++;
      }
    }

    const explanation = document.getElementById(`explain${index}`);
    explanation.classList.remove("hidden");
    explanation.innerHTML = `<p class="${selected && +selected.value === question[2] ? "result-good" : "result-bad"}">${selected && +selected.value === question[2] ? "Correct" : "Correct answer: " + question[1][question[2]]}</p><p>${question[3]}</p>`;
  });

  const subjectName = document.getElementById("quizSubject").value;
  const percentage = Math.round((score / activeQuiz.length) * 100);

  state.quizHistory.unshift({
    subject: subjectName,
    score,
    total: activeQuiz.length,
    percent: percentage,
    date: new Date().toLocaleDateString()
  });
  state.quizHistory = state.quizHistory.slice(0, 30);
  saveState();

  const resultBox = document.getElementById("quizResult");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<h3>Your score: ${score}/${activeQuiz.length} (${percentage}%)</h3><p>${answeredCount < activeQuiz.length ? `You answered ${answeredCount} of ${activeQuiz.length} questions. ` : ""}${percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good start. Review the explanations for missed questions." : "Keep practising—review the concepts and try another quiz."}</p>`;

  renderDashboardStats();
  renderQuizHistory();
  renderProgress();
}

function shuffle(list) {
  const array = [...list];
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function makePlan() {
  const subjectName = document.getElementById("planSubject").value;
  const hours = Math.max(0.5, Math.min(10, Number(document.getElementById("planHours").value) || 2));
  const goal = document.getElementById("planGoal").value;
  const deadline = document.getElementById("deadline").value;

  const totalMinutes = Math.round(hours * 60);
  const shortBreak = Math.max(5, Math.round(totalMinutes * 0.08));
  const firstBlock = Math.round((totalMinutes - shortBreak) * 0.4);
  const secondBlock = Math.round((totalMinutes - shortBreak) * 0.4);
  const finalBlock = totalMinutes - shortBreak - firstBlock - secondBlock;

  const planNames = {
    learn: ["Understand core concepts", "Practise a worked example"],
    revise: ["Recall key definitions/formulas", "Attempt exam-style questions"],
    practice: ["Solve problems independently", "Check answers and redo mistakes"],
    viva: ["Review definitions and principles", "Speak answers aloud; practise follow-ups"]
  };

  const plan = {
    subject: subjectName,
    hours,
    goal,
    date: deadline,
    created: new Date().toLocaleString(),
    steps: [
      { name: planNames[goal][0], min: firstBlock },
      { name: "Short break", min: shortBreak },
      { name: planNames[goal][1], min: secondBlock },
      { name: "Review mistakes + self-test", min: finalBlock }
    ]
  };

  state.plans.unshift(plan);
  state.plans = state.plans.slice(0, 20);
  state.sessions++;
  saveState();

  document.getElementById("planOutput").innerHTML = `
    <h3>${escapeHTML(subjectName)} • ${hours} hour${hours === 1 ? "" : "s"}</h3>
    ${deadline ? `<p class="muted small">Target date: ${escapeHTML(deadline)}</p>` : ""}
    <ol>${plan.steps.map((step) => `<li><b>${step.min} min — ${escapeHTML(step.name)}</b></li>`).join("")}</ol>
    <p class="muted small">Tip: complete one step at a time and tick off the related task on your dashboard.</p>
  `;

  renderDashboardStats();
  renderProgress();
}

function renderDashboardStats() {
  document.getElementById("dashSessions").textContent = state.sessions || 0;

  const history = state.quizHistory || [];
  const average = history.length ? Math.round(history.reduce((sum, item) => sum + item.percent, 0) / history.length) : null;
  document.getElementById("dashScore").textContent = average !== null ? `${average}%` : "—";

  renderQuizHistory();
}

function renderQuizHistory() {
  const historyBox = document.getElementById("quizHistory");
  historyBox.innerHTML = state.quizHistory.length
    ? state.quizHistory.slice(0, 5).map((entry) => `<p><b>${escapeHTML(entry.subject)}</b> — ${entry.score}/${entry.total} (${entry.percent}%)<br><span class="muted">${escapeHTML(entry.date)}</span></p>`).join("")
    : "No quiz attempts yet.";
}

function loadFlashcards() {
  currentFlash = 0;
  flashFlipped = false;
  renderFlash();
}

function renderFlash() {
  const subjectName = document.getElementById("flashSubject").value || Object.keys(flashData)[0];
  const cards = flashData[subjectName];

  if (!cards) {
    return;
  }

  const card = cards[currentFlash];
  const face = document.getElementById("flashFace");
  const count = document.getElementById("flashCount");

  face.textContent = card ? (flashFlipped ? card[1] : card[0]) : "No cards available";
  count.textContent = `Card ${cards.length ? currentFlash + 1 : 0} of ${cards.length} • ${flashFlipped ? "Answer" : "Question"}`;
}

function flipFlash() {
  flashFlipped = !flashFlipped;
  renderFlash();
}

function nextFlash() {
  const subjectName = document.getElementById("flashSubject").value;
  const cards = flashData[subjectName];
  currentFlash = (currentFlash + 1) % cards.length;
  flashFlipped = false;
  renderFlash();
}

function prevFlash() {
  const subjectName = document.getElementById("flashSubject").value;
  const cards = flashData[subjectName];
  currentFlash = (currentFlash - 1 + cards.length) % cards.length;
  flashFlipped = false;
  renderFlash();
}

function renderProgress() {
  const subjectNames = Object.keys(subjects);
  const progressBox = document.getElementById("progressSubjects");

  progressBox.innerHTML = subjectNames
    .map((subjectName) => {
      const attempts = state.quizHistory.filter((entry) => entry.subject === subjectName);
      const average = attempts.length ? Math.round(attempts.reduce((sum, entry) => sum + entry.percent, 0) / attempts.length) : 0;
      return `
        <div style="margin:16px 0">
          <div style="display:flex;justify-content:space-between;gap:8px">
            <b>${escapeHTML(subjectName)}</b>
            <span class="muted">${attempts.length ? `${average}% quiz average` : "Not attempted"}</span>
          </div>
          <div class="progress"><div class="bar" style="width:${average}%"></div></div>
        </div>
      `;
    })
    .join("");

  const history = state.quizHistory;
  document.getElementById("totalAttempts").textContent = history.length;
  document.getElementById("averageScore").textContent = history.length ? `${Math.round(history.reduce((sum, entry) => sum + entry.percent, 0) / history.length)}%` : "—";
  document.getElementById("bestScore").textContent = history.length ? `${Math.max(...history.map((entry) => entry.percent))}%` : "—";
  document.getElementById("attemptRows").innerHTML = history.length
    ? history.slice(0, 10).map((entry) => `<tr><td>${escapeHTML(entry.subject)}</td><td>${entry.score}/${entry.total} (${entry.percent}%)</td><td>${escapeHTML(entry.date)}</td></tr>`).join("")
    : '<tr><td colspan="3" class="muted">No attempts yet.</td></tr>';

  document.getElementById("planHistory").innerHTML = state.plans.length
    ? state.plans.slice(0, 5).map((plan) => `<p><b>${escapeHTML(plan.subject)}</b> — ${plan.hours} hour(s)<br><span class="muted">${escapeHTML(plan.created)}</span></p>`).join("")
    : "No study plans created yet.";
}

function newTip() {
  document.getElementById("dailyTip").textContent = tips[Math.floor(Math.random() * tips.length)];
}

function setTimer() {
  pauseTimer();
  timerSeconds = Number(document.getElementById("timerMinutes").value) * 60;
  updateTimerDisplay();
  document.getElementById("timerStatus").textContent = "Ready when you are.";
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  document.getElementById("timerDisplay").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function toggleTimer() {
  if (timerRunning) {
    pauseTimer();
    document.getElementById("timerStatus").textContent = "Timer paused.";
    return;
  }

  timerRunning = true;
  document.getElementById("timerToggle").textContent = "Ⅱ Pause";
  document.getElementById("timerStatus").textContent = "Focus time — you've got this.";

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();

    if (timerSeconds <= 0) {
      pauseTimer();
      document.getElementById("timerStatus").textContent = "Session complete! Take a short break.";
      document.getElementById("timerToggle").textContent = "▶ Start";
      state.sessions = (state.sessions || 0) + 1;
      saveState();
      renderDashboardStats();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = null;
  document.getElementById("timerToggle").textContent = "▶ Start";
}

function resetTimer() {
  pauseTimer();
  timerSeconds = Number(document.getElementById("timerMinutes").value) * 60;
  updateTimerDisplay();
  document.getElementById("timerStatus").textContent = "Timer reset.";
}

function exportProgress() {
  const data = {
    app: "AI Study Buddy",
    exportedAt: new Date().toISOString(),
    state
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "studymate-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

function resetApp() {
  if (!confirm("Reset checklist, quiz history, plans and saved progress in this browser?")) {
    return;
  }

  pauseTimer();
  localStorage.removeItem("studymate_state");

  Object.assign(state, {
    tasks: defaultTasks.map((text, index) => ({ text, done: false, id: index + 1 })),
    quizHistory: [],
    plans: [],
    recent: [],
    sessions: 0
  });

  saveState();
  renderTasks();
  renderRecent();
  renderDashboardStats();
  renderQuizHistory();
  renderProgress();
  buildQuiz();
  alert("AI Study Buddy demo has been reset.");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function init() {
  loadState();

  if (localStorage.getItem("studymate_theme") === "dark") {
    document.body.classList.add("dark");
  }

  fillSelects();
  renderSubjects();
  renderTasks();
  renderExamples();
  renderRecent();
  renderDashboardStats();
  buildQuiz();
  renderProgress();
  loadFlashcards();
  updateTimerDisplay();
}

init();
