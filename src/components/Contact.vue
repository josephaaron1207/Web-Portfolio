<template>
  <section id="contact">
    <div class="container">
      <h2>Get In Touch</h2>
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-8">
          <div class="contact-methods mb-5 d-flex flex-wrap justify-content-center">
            <div id="phonenum" class="contact-item me-4 mb-3 mb-md-0">
              <a href="mailto:your_email@example.com" class="text-decoration-none text-success">
                <i class="fa-solid fa-envelope contact-icon-large d-block p-5 mx-5 text-success"></i>
                <span class="contact-text">Email</span>
              </a>
            </div>
            <div id="emailadd" class="contact-item">
              <a href="tel:+1234567890" class="text-decoration-none text-success">
                <i class="fa-solid fa-phone contact-icon-large d-block p-5 mx-5 text-success"></i>
                <span class="contact-text">Phone Number</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-lg-8">
          <form @submit.prevent="submitForm">
            <input type="hidden" name="access_key" :value="WEB3FORMS_ACCESS_KEY">
            <input type="hidden" name="g-recaptcha-response" :value="recaptchaToken">
            <input type="hidden" name="subject" :value="subject">

            <div class="mb-3">
              <input type="text" class="form-control rounded-pill" id="name" placeholder="Your Name" required v-model="name" name="name">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control rounded-pill" id="email" placeholder="Your Email" required v-model="email" name="email">
            </div>
            <div class="mb-3">
              <textarea class="form-control rounded-4" id="message" rows="5" placeholder="Your Message" required v-model="message" name="message"></textarea>
            </div>

            <div class="mb-3 d-flex justify-content-center">
              <div ref="recaptchaContainer" class="g-recaptcha" :data-sitekey="SITE_KEY"></div>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary-custom" :disabled="isLoading">
                {{ isLoading ? "Sending..." : "Send Message" }}
              </button>
            </div>

            <div v-if="notyfMessage.show" :class="['alert mt-3', notyfMessage.type === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
              {{ notyfMessage.text }}
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

// Initialize Notyf for floating notifications
const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    { type: 'success', background: '#5cb85c', icon: '<i class="fas fa-check-circle"></i>' },
    { type: 'error', background: '#d9534f', icon: '<i class="fas fa-times-circle"></i>' }
  ]
});

// Reactive state for the in-template message box (if you want to use it alongside Notyf)
const notyfMessage = ref({
  show: false,
  type: '',
  text: ''
});

// Function to show messages in the in-template box
const showTemplateMessage = (text, type) => {
  notyfMessage.value.show = true;
  notyfMessage.value.text = text;
  notyfMessage.value.type = type;
  setTimeout(() => {
    notyfMessage.value.show = false;
  }, 5000); // Hide after 5 seconds
};


// Web3Forms Access Key and Subject
const WEB3FORMS_ACCESS_KEY = "951c837b-2583-4a17-b896-758c5a65320a";
const subject = "New message from portfolio contact form";

// Form data reactive references
const name = ref('');
const email = ref('');
const message = ref('');

// Loading state for form submission
const isLoading = ref(false);

/**
 * reCAPTCHA Integration
 */
const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ'; // reCAPTCHA v2 Site Key

const recaptchaContainer = ref(null); // Reference to the reCAPTCHA div element
const recaptchaWidgetId = ref(null);  // To store the ID of the rendered reCAPTCHA widget
const recaptchaToken = ref('');       // To store the reCAPTCHA token after successful verification

/**
 * Callback function for reCAPTCHA when verification is successful.
 * The token is received as an argument.
 * @param {string} token - The reCAPTCHA verification token.
 */
function onRecaptchaSuccess(token) {
  recaptchaToken.value = token; // Store the token
  notyf.success('reCAPTCHA verified! You can now submit the form.');
  // showTemplateMessage('reCAPTCHA verified! You can now submit the form.', 'success'); // Uncomment if you want both
}

/**
 * Callback function for reCAPTCHA when the token expires.
 * Clears the stored token.
 */
function onRecaptchaExpired() {
  recaptchaToken.value = ''; // Clear the token
  notyf.error('reCAPTCHA expired. Please re-verify.');
  showTemplateMessage('reCAPTCHA expired. Please re-verify.', 'danger');
  if (window.grecaptcha && recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
  }