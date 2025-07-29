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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.0678248443566!2d120.98292817502444!3d14.537552985929287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7f3b895b6c3%3A0x64a9a0e66b1e60b1!2sPara%C3%B1aque%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1722285155609!5m2!1sen!2sph"
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
                    <div v-else-if="recaptchaScriptLoaded">Loading reCAPTCHA...</div>
                    <div v-else>Initializing reCAPTCHA...</div>
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'; // Import watch
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();
const WEB3FORMS_ACCESS_KEY = "31457fb4-8955-4f56-9efd-7684210a1b64";
const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ';

const subject = "New message from portfolio contact form";

const name = ref("");
const email = ref("");
const message = ref("");

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
    // Check if script tag is already in DOM to avoid adding multiple times
    if (document.querySelector(`script[src*="google.com/recaptcha/api.js"]`)) {
        recaptchaScriptLoaded = true; // Assume it's in the process of loading or already loaded
        if (window.grecaptcha) { // Already loaded and grecaptcha object exists
            resolve();
        } else { // Script tag is there, but grecaptcha not ready yet, set global callback
            window._recaptchaLoadResolve = resolve;
        }
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=vueRecaptchaOnload&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);

    recaptchaScriptLoaded = true; // Mark as initiated
    window._recaptchaLoadResolve = resolve; // Store resolve for global callback
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
    console.error('reCAPTCHA container DOM element is null when renderRecaptcha is called. Cannot render.');
    return;
  }
  console.log('Rendering reCAPTCHA into:', recaptchaContainer.value); // Confirm target element

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
    if (!name.value || !email.value || !message.value) {
        notyf.error('Please fill in all required fields.');
        return;
    }

    // This defensive check should now be less likely to trigger if refs are properly initialized
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
                name: name.value,
                email: email.value,
                message: message.value,
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

// --- Lifecycle Hooks and Watchers ---

// Use a watcher to ensure recaptchaContainer is available before rendering
watch(recaptchaContainer, (newValue) => {
    if (newValue && window.grecaptcha) {
        // console.log('recaptchaContainer is now available. Attempting to render.');
        renderRecaptcha();
    } else if (newValue && !window.grecaptcha) {
        // console.log('recaptchaContainer is available, but grecaptcha API not yet loaded. Waiting...');
    }
}, { immediate: false }); // Do not run immediately on component creation

onMounted(async () => {
  try {
    await loadRecaptchaScript();
    // Now that grecaptcha API is loaded, the 'watch' effect on recaptchaContainer
    // will handle the rendering once the DOM element is ready.
    // We removed the setTimeout and direct call to renderRecaptcha here.
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

<style scoped>
/* Your existing styles */
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