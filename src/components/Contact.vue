<template>
  <section id="contact">
    <div class="container">
      <h2>Get In Touch</h2>
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-8">
          <div class="contact-methods mb-5 d-flex flex-wrap justify-content-center">
            <div id="phonenum" class="contact-item me-4 mb-3 mb-md-0">
              <a href="mailto:your_email@example.com" class="text-decoration-none text-success"> <i class="fa-solid fa-envelope contact-icon-large d-block p-5 mx-5 text-success"></i>
                <span class="contact-text">Email</span>
              </a>
            </div>
            <div id="emailadd" class="contact-item">
              <a href="tel:+1234567890" class="text-decoration-none text-success"> <i class="fa-solid fa-phone contact-icon-large d-block p-5 mx-5 text-success"></i>
                <span class="contact-text">Phone Number</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-lg-8">
          <form @submit.prevent="submitForm">
            <input type="hidden" name="access_key" :value="web3formsAccessKey">
            <input type="hidden" name="g-recaptcha-response" :value="recaptchaToken">
            <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio">

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
              <div ref="recaptchaContainer" class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary-custom">Send Message</button>
            </div>

            <div v-if="messageBox.show" :class="['alert mt-3', messageBox.type === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
              {{ messageBox.text }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ... (Your script setup code remains the same as your last provided version)
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Initialize Notyf for notifications
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

// Web3Forms Access Key and Subject (using the key from the first component)
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
const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ'; // reCAPTCHA v2 Site Key from the first component

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
}

/**
 * Callback function for reCAPTCHA when the token expires.
 * Clears the stored token.
 */
function onRecaptchaExpired() {
  recaptchaToken.value = ''; // Clear the token
}

/**
 * Renders the reCAPTCHA widget into the designated container.
 */
function renderRecaptcha() {
  // Ensure the reCAPTCHA container element exists using $refs
  if (!recaptchaContainer.value) {
    console.error('reCAPTCHA container element not found. Make sure <div ref="recaptchaContainer"></div> exists in your template.');
    return;
  }
  // Ensure grecaptcha object is loaded
  if (!window.grecaptcha) {
    console.error('Google reCAPTCHA script not loaded.');
    return;
  }

  // Render the reCAPTCHA widget
  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,            // Your reCAPTCHA Site Key
    size: 'normal',               // 'normal' or 'compact'
    callback: onRecaptchaSuccess, // Callback for successful verification
    'expired-callback': onRecaptchaExpired, // Callback for expired token
  });
}

/**
 * Resets the reCAPTCHA widget, clearing the current token.
 */
function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = ''; // Also clear the internal token state
  }
}

/**
 * Handles the form submission process.
 * Sends form data and reCAPTCHA token to Web3Forms.
 */
const submitForm = async () => {
  // Prevent form submission if reCAPTCHA hasn't been verified
  if (!recaptchaToken.value) {
    notyf.error('Please verify that you are not a robot.');
    return; // Stop the function execution
  }

  isLoading.value = true; // Show loading state
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "e220f6ac-f481-48a6-8bb7-1fe43debea16", // <--- You have a different key here than in your data()!
                                                           // Make sure this matches `web3formsAccessKey` from above,
                                                           // or better yet, use the variable.
        subject: subject,
        name: name.value,
        email: email.value,
        message: message.value,
        "g-recaptcha-response": recaptchaToken.value, // Include the reCAPTCHA token
      }),
    });
    const result = await response.json();

    if (result.success) {
      console.log("Form submission successful:", result);
      notyf.success("Message Sent!");
      // Clear form fields after successful submission
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      // Log the actual error from Web3Forms for debugging
      console.error("Web3Forms error:", result);
      notyf.error("Failed to send message.");
    }
  } catch (error) {
    // Log network or other unexpected errors
    console.error("Form submission error:", error);
    notyf.error("Failed to send message.");
  } finally {
    isLoading.value = false; // Always disable loading state
    resetRecaptcha(); // Reset reCAPTCHA regardless of outcome
  }
};

onMounted(() => {
  // This interval checks if the grecaptcha object is available (meaning the script has loaded)
  // and then proceeds to render the reCAPTCHA widget.
  const interval = setInterval(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha(); // Call the method to render the widget
      clearInterval(interval); // Stop the interval once rendered
    }
  }, 100); // Check every 100ms

  onBeforeUnmount(() => {
    clearInterval(interval); // Clean up the interval when the component is unmounted
  });
});
</script>

<style scoped>
/* Styles specific to Contact if any */
/* Add some styling for the message box */
.alert {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
}
.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}
</style>