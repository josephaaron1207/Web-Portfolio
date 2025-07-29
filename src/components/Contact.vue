<template>
  <section id="contacts">
    <div class="container my-5">
      <div class="row text-center mb-4">
        <div class="col-12">
          <h1>Let's Connect</h1>
        </div>
      </div>

      <div class="row flex-column flex-md-row text-center text-md-start">
        <div class="col-md-6 mb-4 mb-md-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15449.692608035783!2d120.98595705!3d14.50742585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cd3bb8a0d4c1%3A0xc3f8e5b6a7a0e2d!2sPara%C3%B1aque%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1722204434567!5m2!1sen!2sph"
            class="map-frame w-100 rounded"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <div class="col-md-6" id="form-col">
          <form @submit.prevent="submitForm" class="form p-4 rounded text-light">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" v-model="name" class="form-control" id="name" placeholder="Your Name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" v-model="email" class="form-control" id="email" placeholder="name@example.com" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea v-model="message" class="form-control" id="message" rows="5" required></textarea>
            </div>

            <div class="d-flex flex-wrap align-items-center justify-content-between">
              <div class="d-flex gap-3 mb-3">
                <a href="https://github.com/PeterJayson13" target="_blank"><img src="/images/Github.png" class="img-fluid social-icon" alt="GitHub"></a>
                <a href="https://gitlab.com/peterbongabong7" target="_blank"><img src="/images/Gitlab.png" class="img-fluid social-icon" alt="GitLab"></a>
                <a href="https://www.linkedin.com/in/peter-jayson-bongabong-b43793365/" target="_blank"><img src="/images/Linkedin.png" class="img-fluid social-icon" alt="LinkedIn"></a>
              </div>
              <div>
                <button type="submit" class="submit-btn btn-custom" :disabled="isLoading || !recaptchaToken">
                  {{ isLoading ? "Sending..." : "Submit" }}
                </button>

                <div class="d-flex justify-content-end mt-2">
                    <div v-if="recaptchaLoaded" ref="recaptchaContainer"></div>
                    <div v-else>Loading reCAPTCHA...</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();
const WEB3FORMS_ACCESS_KEY = "31457fb4-8955-4f56-9efd-7684210a1b64";
const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ'; // Replace with your site key

const subject = "New message from portfolio contact form";

const name = ref("");
const email = ref("");
const message = ref("");

const isLoading = ref(false);
const recaptchaLoaded = ref(false);

const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref('');

// --- reCAPTCHA Integration ---

// This global function is called by reCAPTCHA script once it's loaded
// We need to ensure it's defined before the script tries to call it.
window.vueRecaptchaOnload = () => {
  if (window._recaptchaLoadResolve) {
    window._recaptchaLoadResolve();
    delete window._recaptchaLoadResolve; // Clean up
  }
};

let recaptchaScriptLoaded = false; // To prevent loading the script multiple times

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha && recaptchaScriptLoaded) { // Already loaded and API available
      resolve();
      return;
    }
    if (document.querySelector(`script[src*="${SITE_KEY}"]`)) { // Script tag might exist but not loaded yet
        recaptchaScriptLoaded = true;
        window._recaptchaLoadResolve = resolve; // Store resolve for global callback
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=vueRecaptchaOnload&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);

    recaptchaScriptLoaded = true;
    window._recaptchaLoadResolve = resolve; // Store resolve for global callback
  });
}

// Callback called by reCAPTCHA when successful
function onRecaptchaSuccess(token) {
  recaptchaToken.value = token;
  // console.log('reCAPTCHA token:', token); // For debugging
}

// Callback when expired
function onRecaptchaExpired() {
  recaptchaToken.value = '';
  // console.warn('reCAPTCHA token expired.');
}

// Function to render the reCAPTCHA widget
function renderRecaptcha() {
  if (!window.grecaptcha) {
    console.error('reCAPTCHA API not available to render.');
    return;
  }
  if (!recaptchaContainer.value) {
    console.error('reCAPTCHA container DOM element is null. Cannot render.');
    return;
  }

  // console.log('Attempting to render reCAPTCHA into:', recaptchaContainer.value); // For debugging

  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,
    size: 'normal', // or 'compact'
    callback: onRecaptchaSuccess,
    'expired-callback': onRecaptchaExpired,
  });
  recaptchaLoaded.value = true; // Indicate that the widget has been rendered
}

// Function to reset reCAPTCHA
function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null && window.grecaptcha) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = '';
    // console.log('reCAPTCHA reset.'); // For debugging
  }
}

// --- Form Submission Logic ---
const submitForm = async () => {
    // Basic form validation (optional, can be expanded)
    if (!name.value || !email.value || !message.value) {
        notyf.error('Please fill in all required fields.');
        return;
    }

    // Defensive check for potential undefined refs (shouldn't happen with v-model, but good for debugging)
    if (name.value === undefined || email.value === undefined || message.value === undefined) {
        console.error("Critical Error: Form field ref is undefined before submission!");
        notyf.error("An internal form error occurred. Please refresh and try again.");
        return;
    }

    if (!recaptchaToken.value) {
        notyf.error('Please verify that you are not a robot.');
        return;
    }

    isLoading.value = true;
    // console.log("Submitting form with data:", {
    //     name: name.value,
    //     email: email.value,
    //     message: message.value,
    //     recaptchaToken: recaptchaToken.value
    // }); // For debugging

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
                name: name.value,
                email: email.value,
                message: message.value,
                "g-recaptcha-response": recaptchaToken.value, // Send the reCAPTCHA token
            }),
        });
        const result = await response.json();

        if (result.success) {
            notyf.success("Message Sent!");
            // Clear form fields
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
        resetRecaptcha(); // Always reset reCAPTCHA after submission attempt
    }
}

// --- Lifecycle Hooks ---
onMounted(async () => {
  try {
    await loadRecaptchaScript();
    // Give a small delay to ensure the DOM element is fully rendered and accessible
    // before grecaptcha.render is called.
    // This is crucial when the component is mounted and then the ref needs time to point to the DOM element.
    setTimeout(() => {
        if (recaptchaContainer.value) {
            renderRecaptcha();
        } else {
            console.error("reCAPTCHA container not available after timeout. Check DOM rendering.");
        }
    }, 100); // Increased delay slightly
  } catch (error) {
    console.error("Failed to load reCAPTCHA script:", error);
    notyf.error("Failed to load reCAPTCHA. Please try refreshing the page.");
    recaptchaLoaded.value = false; // Ensure UI reflects load failure
  }
});

onBeforeUnmount(() => {
  // Clear the interval if it was ever used (though now using Promise based approach)
  // And clean up global callback if necessary, though not strictly required for this pattern
  if (window._recaptchaLoadResolve) {
    delete window._recaptchaLoadResolve;
  }
});
</script>

<style scoped>
.form {
  background-color: darkgray;
}
.social-icon {
  height: 40px;
}
.map-frame {
  border: 0;
}
.btn-custom {
  background-color: #fb5607;
  color: white;
  border: 1px solid #fb5607;
}
.btn-custom:hover {
  background-color: #d94a06;
  border: 1px solid #d94a06;
}
</style>