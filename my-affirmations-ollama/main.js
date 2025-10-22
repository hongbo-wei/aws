import './style.css'

const INFERENCE_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434/api/generate';
const MODEL = 'deepseek-v3.1:671b-cloud';
// const MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'deepseek-r1:7b';

const prompt = "Give me, Bruce, an affirmation to boost my motivation today, referencing plants, animals, or flowers by adding emoji. Don't show the prompt, only the quote. Do not add anything like Here is an affirmation... just return the affirmation alone";

async function fetchNewAffirmation() {
  disableButton(true);
  showLoadingAnimation();

  try {
    const response = await fetch(INFERENCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        max_tokens: 120,
        temperature: 0.7,
        stream: false,
      }),
    });    
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Inference error: ${text}`);
    }

    const json = await response.json();
    console.log("Inference response:", json);

    // Try common Ollama / text-completion shapes:
    // - { choices: [{ text: "..." }] }
    // - { completion: "..." }
    let affirmation = "";
    affirmation = json.response;
    if (!affirmation) affirmation = JSON.stringify(json, null, 2);

    document.querySelector("#affirmation").innerHTML = affirmation;
  } catch (err) {
    console.error(err);
    document.querySelector("#affirmation").innerHTML = String(err);
  }

  disableButton(false);
}

// Shows a loading animation while fetching a new affirmation
function showLoadingAnimation() {
  document.querySelector("#affirmation").innerHTML = '<div class="loading-spinner"></div>';
}

// Disables the button while fetching a new affirmation so we don't request several at once by clicking repeatedly
function disableButton(isDisabled) {
  const affirmationButton = document.querySelector("#getNewAffirmation");
  affirmationButton.disabled = isDisabled;
}

init();

// Called on page load (or refresh), fetches a new affirmation
async function init() {
  try {
    await fetchNewAffirmation();
  } catch(err) {
    console.error(err);
    document.querySelector("#affirmation").innerHTML = err;
  }
  
  const affirmationButton = document.querySelector("#getNewAffirmation");
  affirmationButton.addEventListener("click", fetchNewAffirmation);
}
