// Array mit metakognitiven Übungen
const exercises = [
  "Übung 1: Schreibe auf, welche Gedanken dich heute negativ beeinflusst haben und hinterfrage sie.",
  "Übung 2: Atme tief ein und aus. Konzentriere dich auf deinen Atem und lasse störende Gedanken los.",
  "Übung 3: Denke an einen Moment, in dem du erfolgreich warst. Überlege, welche Gedanken dich dabei unterstützt haben.",
  "Übung 4: Beobachte deine Gedanken für 5 Minuten, ohne sie zu bewerten. Lasse sie kommen und gehen.",
  "Übung 5: Notiere dir drei positive Gedanken über dich selbst und wiederhole sie im Laufe des Tages."
];

// Array mit Fragestellungen zur Aktivierung der Selbstheilungskräfte
const healingQuestions = [
  "Welche inneren Ressourcen hast du, die dir in schwierigen Zeiten helfen können?",
  "Was hast du in der Vergangenheit getan, um dich selbst zu heilen, und wie kannst du das wiederholen?",
  "Welche positiven Erfahrungen in deinem Leben geben dir Kraft und Zuversicht?",
  "Was würde dir jetzt guttun, um Körper und Geist in Einklang zu bringen?",
  "Wie kannst du deine Gedanken in einen heilenden Fokus lenken, um dich selbst zu unterstützen?"
];

let currentExerciseIndex = null;
let historyStack = [];
let favorites = [];
let currentHealingIndex = null;

// DOM-Elemente für metakognitive Übungen
const exerciseTextElement = document.getElementById('exercise-text');
const newExerciseButton = document.getElementById('new-exercise-button');
const prevExerciseButton = document.getElementById('prev-exercise-button');
const favoriteButton = document.getElementById('favorite-button');
const favoritesListElement = document.getElementById('favorites-list');

// DOM-Elemente für Selbstheilungsfragen
const healingTextElement = document.getElementById('healing-text');
const newHealingButton = document.getElementById('new-healing-button');

// Funktion zur Erzeugung eines zufälligen Index für Übungen (ohne direkte Wiederholung)
function getRandomExerciseIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * exercises.length);
  } while (newIndex === currentExerciseIndex && exercises.length > 1);
  return newIndex;
}

// Funktion zur Erzeugung eines zufälligen Index für Selbstheilungsfragen
function getRandomHealingIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * healingQuestions.length);
  } while (newIndex === currentHealingIndex && healingQuestions.length > 1);
  return newIndex;
}

// Anzeige der aktuellen Übung
function displayExercise(index) {
  exerciseTextElement.textContent = exercises[index];
}

// Anzeige der aktuellen Selbstheilungsfrage
function displayHealingQuestion(index) {
  healingTextElement.textContent = healingQuestions[index];
}

// Favoriten aus dem Local Storage laden
function loadFavorites() {
  const storedFavorites = localStorage.getItem("favoriteExercises");
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  } else {
    favorites = [];
  }
}

// Favoriten im Local Storage speichern
function saveFavorites() {
  localStorage.setItem("favoriteExercises", JSON.stringify(favorites));
}

// Favoriten-Liste rendern
function renderFavorites() {
  favoritesListElement.innerHTML = "";
  if (favorites.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Noch keine Favoriten.";
    favoritesListElement.appendChild(li);
    return;
  }
  favorites.forEach((fav, index) => {
    const li = document.createElement("li");
    li.textContent = fav;
    // Button zum Entfernen des Favoriten
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Entfernen";
    removeBtn.addEventListener("click", () => {
      removeFavorite(index);
    });
    li.appendChild(removeBtn);
    favoritesListElement.appendChild(li);
  });
}

// Favorit entfernen
function removeFavorite(index) {
  favorites.splice(index, 1);
  saveFavorites();
  renderFavorites();
}

// Event Listener für "Neue Übung"
newExerciseButton.addEventListener('click', () => {
  if (currentExerciseIndex !== null) {
    historyStack.push(currentExerciseIndex);
  }
  currentExerciseIndex = getRandomExerciseIndex();
  displayExercise(currentExerciseIndex);
});

// Event Listener für "Zurück" (vorherige Übung)
prevExerciseButton.addEventListener('click', () => {
  if (historyStack.length > 0) {
    currentExerciseIndex = historyStack.pop();
    displayExercise(currentExerciseIndex);
  } else {
    alert("Keine vorherige Übung vorhanden.");
  }
});

// Event Listener für "Favorit" (aktuelle Übung speichern)
favoriteButton.addEventListener('click', () => {
  if (currentExerciseIndex !== null) {
    const currentExercise = exercises[currentExerciseIndex];
    // Verhindern doppelter Einträge
    if (!favorites.includes(currentExercise)) {
      favorites.push(currentExercise);
      saveFavorites();
      renderFavorites();
    } else {
      alert("Diese Übung ist bereits als Favorit markiert.");
    }
  }
});

// Event Listener für "Neue Frage" bei Selbstheilungsfragen
newHealingButton.addEventListener('click', () => {
  currentHealingIndex = getRandomHealingIndex();
  displayHealingQuestion(currentHealingIndex);
});

// Initialisierung der App
function init() {
  loadFavorites();
  renderFavorites();
  // Beim Laden der Seite wird eine zufällige Übung und eine Frage angezeigt
  currentExerciseIndex = getRandomExerciseIndex();
  displayExercise(currentExerciseIndex);
  
  currentHealingIndex = getRandomHealingIndex();
  displayHealingQuestion(currentHealingIndex);
}

init();
