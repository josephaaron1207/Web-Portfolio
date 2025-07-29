<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();
const WEB3FORMS_ACCESS_KEY = "31457fb4-8955-4f56-9efd-7684210a1b64";
const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ';

const subject = "New message from portfolio contact form";

// --- IMPORTANT: Add console.log statements right after initialization ---
const name = ref("");
console.log('Contact.vue: Initialized name ref:', name.value); // CHECK 1
const email = ref("");
console.log('Contact.vue: Initialized email ref:', email.value); // CHECK 2
const message = ref("");
console.log('Contact.vue: Initialized message ref:', message.value); // CHECK 3

const isLoading = ref(false);
const recaptchaLoaded = ref(false);

const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref('');

window.vueRecaptchaOnload = () => {
  if (window._recaptchaLoadResolve) {
    window._recaptchaLoadResolve();
    delete window._recaptchaLoadResolve;
  }
};

let recaptchaScriptLoaded = false;

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha && recaptchaScriptLoaded) {
      resolve();
      return;
    }
    if (document.querySelector(`script[src*="${SITE_KEY}"]`)) {
        recaptchaScriptLoaded = true;
        window._recaptchaLoadResolve = resolve;
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=vueRecaptchaOnload&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);

    recaptchaScriptLoaded = true;
    window._recaptchaLoadResolve = resolve;
  });
}

function onRecaptchaSuccess(token) {
  recaptchaToken.value = token;
}

function onRecaptchaExpired() {
  recaptchaToken.value = '';
}

function renderRecaptcha() {
  if (!window.grecaptcha) {
    console.error('reCAPTCHA API not available to render.');
    return;
  }
  if (!recaptchaContainer.value) {
    console.error('reCAPTCHA container DOM element is null. Cannot render.');
    return;
  }
  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,
    size: 'normal',
    callback: onRecaptchaSuccess,
    'expired-callback': onRecaptchaExpired,
  });
  recaptchaLoaded.value = true;
}

function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null && window.grecaptcha) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = '';
  }
}

const submitForm = async () => {
    // Basic form validation
    // --- IMPORTANT: Add console.log before validation checks ---
    console.log('submitForm called. Name:', name.value); // CHECK 4
    console.log('submitForm called. Email:', email.value); // CHECK 5
    console.log('submitForm called. Message:', message.value); // CHECK 6

    if (!name.value || !email.value || !message.value) {
        notyf.error('Please fill in all required fields.');
        return;
    }

    // Defensive check (should catch the error if it happens here)
    if (name.value === undefined || email.value === undefined || message.value === undefined) {
        console.error("Critical Error: Form field ref is undefined before submission payload creation!");
        notyf.error("An internal form error occurred. Please refresh and try again.");
        return;
    }

    if (!recaptchaToken.value) {
        notyf.error('Please verify that you are not a robot.');
        return;
    }

    isLoading.value = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: subject,
                name: name.value,   // Line of interest
                email: email.value, // Line of interest
                message: message.value, // Line of interest
                "g-recaptcha-response": recaptchaToken.value,
            }),
        });
        const result = await response.json();

        if (result.success) {
            notyf.success("Message Sent!");
            name.value = "";
            email.value = "";
            message.value = "";
        } else {
            console.error("Web3Forms submission failed:", result);
            let errorMessage = "Failed to send message.";
            if (result.message) {
                errorMessage += " " + result.message;
            }
            notyf.error(errorMessage);
        }
    } catch (error) {
        console.error("Network or submission error:", error);
        notyf.error("Failed to send message. Please check your internet connection.");
    } finally {
        isLoading.value = false;
        resetRecaptcha();
    }
}

onMounted(async () => {
  try {
    await loadRecaptchaScript();
    setTimeout(() => {
        if (recaptchaContainer.value) {
            renderRecaptcha();
        } else {
            console.error("reCAPTCHA container not available after timeout. Check DOM rendering.");
        }
    }, 100);
  } catch (error) {
    console.error("Failed to load reCAPTCHA script:", error);
    notyf.error("Failed to load reCAPTCHA. Please try refreshing the page.");
    recaptchaLoaded.value = false;
  }
});

onBeforeUnmount(() => {
  if (window._recaptchaLoadResolve) {
    delete window._recaptchaLoadResolve;
  }
});
</script>