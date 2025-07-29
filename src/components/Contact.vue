<template>
  <section id="contact" class="py-5 contact-section">
    <div class="container">
      <!-- Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold text-white">Get in Touch</h1>
        <p class="text-light opacity-90">
          I’d love to hear from you! Fill out the form and I’ll get back to you soon.
        </p>
      </div>

      <div class="row g-5 align-items-stretch">
        <!-- Map -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill shadow-sm rounded overflow-hidden">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=centro%20escolar%20university%20manila&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              style="border:0; width:100%; height:100%;"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Form -->
        <div class="col-lg-6 d-flex">
          <form @submit.prevent="submitForm" class="card flex-fill p-4 rounded shadow contact-form text-white">
            <div class="mb-3">
              <input
                type="text"
                v-model="name"
                class="form-control form-control-lg"
                placeholder="Full Name"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div class="mb-3">
              <textarea
                v-model="message"
                class="form-control form-control-lg"
                rows="6"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <!-- Footer -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
              <div class="social-icons mb-3 mb-md-0">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" class="social-icon linkedin">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" class="social-icon gitlab">
                  <i class="fab fa-gitlab"></i>
                </a>
                <a href="https://github.com/cbabbage0991" class="social-icon github">
                  <i class="fab fa-github"></i>
                </a>
              </div>
              <button
                type="submit"
                class="btn btn-lg px-5 submit-btn"
                :disabled="isLoading"
              >
                <span v-if="isLoading">Sending...</span>
                <span v-else>Submit</span>
              </button>
            </div>

            <!-- reCAPTCHA -->
            <div class="d-flex justify-content-end mt-3">
              <div ref="recaptchaContainer"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();
const WEB3FORMS_ACCESS_KEY = "951c837b-2583-4a17-b896-758c5a65320a";
const subject = "New message from portfolio contact form";

const name = ref("");
const email = ref("");
const message = ref("");
const isLoading = ref(false);

const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref("");

// Form submit
const submitForm = async () => {
  if (!recaptchaToken.value) {
    notyf.error("Please verify that you are not a robot.");
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
        subject,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const result = await response.json();

    if (result.success) {
      notyf.success("Message Sent!");
      name.value = "";
      email.value = "";
      message.value = "";
    }
  } catch (error) {
    notyf.error("Failed to send message.");
  } finally {
    isLoading.value = false;
    resetRecaptcha();
  }
};

// reCAPTCHA setup
const SITE_KEY = "6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ";

function onRecaptchaSuccess(token) {
  recaptchaToken.value = token;
}
function onRecaptchaExpired() {
  recaptchaToken.value = "";
}
function renderRecaptcha() {
  if (!window.grecaptcha) return;
  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,
    size: "normal",
    callback: onRecaptchaSuccess,
    "expired-callback": onRecaptchaExpired,
  });
}
function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = "";
  }
}

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

<style scoped>
.contact-section {
  background-color: #00896f;
}

.contact-form {
  background-color: #343a40 !important;
  color: #fff;
}

.contact-form input,
.contact-form textarea {
  background-color: #f8f9fa;
  border: none;
  color: #343a40;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border: 2px solid #20c997;
  box-shadow: 0 0 8px rgba(32, 201, 151, 0.4);
  outline: none;
}

/* Submit Button */
.submit-btn {
  background-color: #20c997;
  color: #fff;
  transition: background-color 0.3s, transform 0.3s;
}
.submit-btn:hover {
  background-color: #17a589;
  transform: translateY(-2px);
}

/* Equal height for map and form */
.card {
  flex: 1 1 auto;
  height: 100%;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 1rem;
}
.social-icon {
  width: 55px;
  height: 55px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff !important;
  transition: transform 0.3s, background-color 0.3s;
}
.social-icon.linkedin {
  background-color: #0e76a8;
}
.social-icon.gitlab {
  background-color: #fca326;
}
.social-icon.github {
  background-color: #333;
}
.social-icon:hover {
  transform: scale(1.15);
  background-color: #20c997 !important;
}
</style>
