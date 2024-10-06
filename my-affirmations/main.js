import './style.css'
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

// const modelId = 'anthropic.claude-v2';
const modelId =  'anthropic.claude-3-haiku-20240307-v1:0';
// const prompt_origin = "Give me an affirmation to boost my motivation today, referencing plants, animals, or flowers by adding emoji. Don't show the prompt, only the quote. Do not add anything like Here is an affirmation... just return the affirmation alone";
// const prompt_aws = "Give me an affirmation to boost my motivation today, telling me, Hongbo Wei, that I will get a decent job at Amazon Web Service (AWS) soon, referencing referencing plants, animals, or flowers by adding emoji. Don't show the prompt, only the quote. Do not add anything like Here is an affirmation... just return the affirmation alone";
const prompt_boxing = "Give me an affirmation to boost my motivation today, telling me, Hongbo Wei, that I will become a world boxing champion, referencing plants, animals, or flowers by adding emojis. Don't show the prompt, only the quote. Do not add anything like Here is an affirmation... just return the affirmation alone";
// const prompt_congrats = "Congrats my friend Amman for being selected as a Millennium Fellow for the Class of 2024 of the Millennium Campus Network (MCN) Fellowship by United Nations Academic Impact, referencing plants, animals, or flowers by adding emoji. Don't show the prompt, only the quote. Do not add anything addtional... just return the message alone"
// const prompt_msc = "Give me an affirmation to boost my motivation today, telling me, Hongbo Wei, that I will get a distinction MSc degree at the University of Birmnigham Dubai soon,, referencing plants, animals, or flowers by adding emoji. Don't show the prompt, only the quote itself. No quotation marks. Do not add anything addtional... just return the message alone"

const conversation = [
  {
    role: "user",
    content: [{ text: prompt_boxing }],
  },
];

async function fetchNewAffirmation() {
  disableButton(true);
  showLoadingAnimation();

  try {
    const response = await client.send(new ConverseCommand({ modelId, messages: conversation }));
    const affirmation = response.output.message.content[0].text;
    // set the affirmation in HTML
    document.querySelector("#affirmation").innerHTML = affirmation;
  } catch (err) {
    console.error(err);
    document.querySelector("#affirmation").innerHTML = err;
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
    // get the user's credentials from environment variables
    const creds = await fetchCredentials();
    // instantiate the BedrockRuntimeClient  
    client = await createBedrockClient(creds);
    // Once everything is setup, let's get the first affirmation
    await fetchNewAffirmation();

  } catch(err) {
    console.error(err);
    document.querySelector("#affirmation").innerHTML = err;
  }
  
  const affirmationButton = document.querySelector("#getNewAffirmation");
  affirmationButton.addEventListener("click", fetchNewAffirmation);
}

let client = null;
async function createBedrockClient(creds) {  
  client = await new BedrockRuntimeClient({
    credentials: creds.credentials,
    region: creds.region
  });
  return client;
}

async function fetchCredentials() {
  return {
    region: "us-west-2",  // Hardcoded as this region is a requirement for the hosted Workshops and must not be changed.
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
    },
  };
}