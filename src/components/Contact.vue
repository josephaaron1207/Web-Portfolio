<template>
  <div>
    <!-- reCAPTCHA script tag - typically placed in the main index.html <head> or <body> -->
    <!-- For demonstration in a self-contained component, it's included here. -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <!-- Map Section -->
    <div id="map" class="container-fluid py-5">
      <div class="row text-center mb-4">
        <div class="col">
          <h2 class="my-5 text-gray-800">Visit Us!</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 m-4 rounded-xl overflow-hidden shadow-2xl">
          <!-- Using the map from the first provided component -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15452.43988643541!2d121.00358374543454!3d14.47837411594325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce7de2da5bbd%3A0xc4f1845e91886224!2sSM%20City%20Sucat!5e0!3m2!1sen!2sph!4v1750151542839!5m2!1sen!2sph"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <section id="contact" class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-emerald-500 font-bold mb-10 relative pb-3">Get In Touch</h2>
        <div class="row justify-content-center mt-10">
          <div class="col-lg-8 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto">
            <form @submit.prevent="submitForm" class="bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div class="mb-5">
                <input
                  type="text"
                  v-model="name"
                  class="form-control contact-form-control w-full p-3 rounded-full bg-gray-700 text-white border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="mb-5">
                <input
                  type="email"
                  v-model="email"
                  class="form-control contact-form-control w-full p-3 rounded-full bg-gray-700 text-white border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="mb-5">
                <textarea
                  class="form-control contact-form-control w-full p-3 rounded-2xl bg-gray-700 text-white border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
                  rows="6"
                  v-model="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <!-- Social Icons from the second template -->
              <div class="form-footer flex justify-between items-center mt-6">
                <div class="social-icons flex space-x-4">
                  <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" id="linkedin" class="text-white hover:text-emerald-400 transition duration-300">
                    <i class="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a href="https://gitlab.com/cbabbage0991" id="gitlab" class="text-white hover:text-emerald-400 transition duration-300">
                    <i class="fab fa-gitlab text-2xl"></i>
                  </a>
                  <a href="https://github.com/cbabbage0991" id="github" class="text-white hover:text-emerald-400 transition duration-300">
                    <i class="fab fa-github text-2xl"></i>
                  </a>
                </div>
                <button
                  type="submit"
                  class="submit-btn bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "Sending..." : "Send Message" }}
                </button>
              </div>

              <!-- reCAPTCHA container -->
              <div class="flex justify-end mt-4">
                <div ref="recaptchaContainer"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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
    sitekey: SITE_KEY,          // Your reCAPTCHA Site Key
    size: 'normal',             // 'normal' or 'compact'
    callback: onRecaptchaSuccess,       // Callback for successful verification
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
        access_key: WEB3FORMS_ACCESS_KEY,
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
/* Base styling for the contact section */
#contact {
  background-color: #343a40; /* Dark gray background */
  border-radius: 40px;
  padding: 80px 0;
  border-bottom: 1px solid #e9ecef;
  color: white;
}

/* Heading for the contact section */
#contact h2 {
  color: #00896f; /* Greenish color */
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}

/* Map section background and text color */
#map {
  color: #343a40; /* Dark gray text */
  background-color: #00896f; /* Greenish background */
  border-radius: 40px;
}

/* Heading for the map section */
#map h2 {
  color: #343a40; /* Dark gray text */
}

/* Form control focus state for UI improvement */
.form-control:focus {
  border-color: #00896f; /* Greenish border on focus */
  box-shadow: 0 0 0 0.25rem rgba(0, 137, 111, 0.25); /* Greenish shadow on focus */
  background-color: #ffffff; /* White background on focus */
}

/* Custom styling for the submit button */
.submit-btn {
  background-color: #00896f; /* Greenish background */
  color: white;
  padding: 12px 30px;
  border-radius: 9999px; /* Fully rounded */
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #006f5a; /* Darker green on hover */
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Styling for social icons */
.social-icons a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #555; /* Darker gray for icons */
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.social-icons a:hover {
  background-color: #00896f; /* Greenish on hover */
  transform: translateY(-2px);
}

.social-icons .fab {
  font-size: 1.25rem; /* Adjust icon size */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  #contact {
    padding: 60px 0;
  }

  #contact h2 {
    font-size: 2rem;
  }

  .form-footer {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .social-icons {
    margin-bottom: 1rem;
  }
}
</style>
