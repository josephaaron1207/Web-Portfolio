<template>
  <section id="contact" class="py-16 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-emerald-500 font-bold mb-10 relative pb-3">
        Get In Touch
      </h2>

      <div class="row justify-content-center mt-10">
        <div class="col-lg-8 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto">
          <form @submit.prevent="submitForm" class="bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div class="mb-5">
              <input
                type="text"
                v-model="name"
                class="w-full p-3 rounded-full bg-gray-700 text-white border border-gray-600
                       focus:border-emerald-500 focus:ring focus:ring-emerald-500
                       focus:ring-opacity-50 transition duration-300"
                placeholder="Your Name"
                required
              />
            </div>

            <div class="mb-5">
              <input
                type="email"
                v-model="email"
                class="w-full p-3 rounded-full bg-gray-700 text-white border border-gray-600
                       focus:border-emerald-500 focus:ring focus:ring-emerald-500
                       focus:ring-opacity-50 transition duration-300"
                placeholder="Your Email"
                required
              />
            </div>

            <div class="mb-5">
              <textarea
                v-model="message"
                rows="6"
                class="w-full p-3 rounded-2xl bg-gray-700 text-white border border-gray-600
                       focus:border-emerald-500 focus:ring focus:ring-emerald-500
                       focus:ring-opacity-50 transition duration-300"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <div class="form-footer flex justify-between items-center mt-6">
              <!-- Social Icons -->
              <div class="flex space-x-4">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" 
                   class="text-white hover:text-emerald-400 transition duration-300">
                  <i class="fab fa-linkedin text-2xl"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" 
                   class="text-white hover:text-emerald-400 transition duration-300">
                  <i class="fab fa-gitlab text-2xl"></i>
                </a>
                <a href="https://github.com/cbabbage0991" 
                   class="text-white hover:text-emerald-400 transition duration-300">
                  <i class="fab fa-github text-2xl"></i>
                </a>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="bg-emerald-600 text-white px-8 py-3 rounded-full 
                       hover:bg-emerald-700 focus:outline-none focus:ring-4
                       focus:ring-emerald-500 focus:ring-opacity-75 
                       transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isLoading"
              >
                {{ isLoading ? "Sending..." : "Send Message" }}
              </button>
            </div>

            <!-- reCAPTCHA -->
            <div class="flex justify-end mt-4">
              <div ref="recaptchaContainer"></div>
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

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' },
  types: [
    { type: 'success', background: '#5cb85c', icon: '<i class="fas fa-check-circle"></i>' },
    { type: 'error', background: '#d9534f', icon: '<i class="fas fa-times-circle"></i>' }
  ]
});

const subject = "New message from portfolio contact form";
const name = ref('');
const email = ref('');
const message = ref('');
const isLoading = ref(false);

const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ';
const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref('');

function onRecaptchaSuccess(token) {
  recaptchaToken.value = token;
}
function onRecaptchaExpired() {
  recaptchaToken.value = '';
}
function renderRecaptcha() {
  if (!recaptchaContainer.value || !window.grecaptcha) return;
  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,
    size: 'normal',
    callback: onRecaptchaSuccess,
    'expired-callback': onRecaptchaExpired
  });
}
function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = '';
  }
}

const submitForm = async () => {
  if (!recaptchaToken.value) {
    notyf.error('Please verify that you are not a robot.');
    return;
  }
  isLoading.value = true;
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "e220f6ac-f481-48a6-8bb7-1fe43debea16",
        subject,
        name: name.value,
        email: email.value,
        message: message.value,
        "g-recaptcha-response": recaptchaToken.value
      }),
    });
    const result = await response.json();
    if (result.success) {
      notyf.success("Message Sent!");
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      console.error("Web3Forms error:", result);
      notyf.error("Failed to send message.");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    notyf.error("Failed to send message.");
  } finally {
    isLoading.value = false;
    resetRecaptcha();
  }
};

onMounted(() => {
  const interval = setInterval(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha();
      clearInterval(interval);
    }
  }, 100);
  onBeforeUnmount(() => clearInterval(interval));
});
</script>
