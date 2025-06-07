import axios from "axios";
import Cookies from "js-cookie";

const targetLanguage = Cookies.get("selectedLanguage") || "en";
let translationCache = new Map(); // Cache translations

// Function to add a loading indicator
const addLoadingIndicator = (element) => {
  if (!element.dataset.originalText) {
    element.dataset.originalText = element.textContent; // Store original text
  }
  element.dataset.loading = "true";
  element.textContent = `⏳ ${element.dataset.originalText}`; // Show loading
};

// Function to remove loading indicator
const removeLoadingIndicator = (element, translatedText) => {
  element.textContent = translatedText;
  delete element.dataset.loading; // Remove loading flag
};

// Function to translate a single element
const translateElement = async (element) => {
  const originalText = element.dataset.originalText || element.textContent.trim();

  if (!originalText || originalText.length <= 1) return; // Skip short texts

  // If already translated, apply directly
  if (translationCache.has(originalText)) {
    removeLoadingIndicator(element, translationCache.get(originalText));
    return;
  }

  addLoadingIndicator(element); // Show loading

  try {
    const response = await axios.post("http://localhost:3000/translate", {
      textArray: [originalText],
      targetLanguage,
    });

    const translatedText = response.data.translatedTexts[0];

    if (translatedText) {
      translationCache.set(originalText, translatedText); // Store in cache
      removeLoadingIndicator(element, translatedText); // Remove loading and set translation
    }
  } catch (error) {
    console.error("Translation error:", error);
    element.textContent = originalText; // Revert to original text on failure
  }
};

// Function to scan and translate the page
const translatePage = () => {
  const elements = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, span, div, section, article, li, a, button, label"
  );

  elements.forEach((element) => {
    if (element.children.length === 0 && !element.dataset.translating) {
      element.dataset.translating = "true"; // Mark as processing
      translateElement(element);
    }
  });
};

// **Use MutationObserver to Translate New Content**
const observeDOMChanges = () => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translatePage(); // Translate new elements instantly
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
};

// **Run on Page Load and Observe Changes**
window.onload = () => {
  translatePage();
  observeDOMChanges();
};

export default translatePage;
