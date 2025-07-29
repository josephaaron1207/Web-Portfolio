<template>
  <div>
    <div id="map" class="container-fluid">
      <div class="row text-center mb-4">
        <div class="col">
          <h2 class="my-5">Visit Us!</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 m-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15452.43988643541!2d121.00358374543454!3d14.47837411594325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce7de2da5bbd%3A0xc4f1845e91886224!2sSM%20City%20Sucat!5e0!3m2!1sen!2sph!4v1750151542839!5m2!1sen!2sph"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </div>
    <section id="contact">
      <div class="container">
        <h2>Get In Touch</h2>
        <div class="row justify-content-center text-center mb-4">
          <div class="col-lg-8">
            <div class="contact-methods mb-5 d-flex flex-wrap justify-content-center">
              <div id="phonenum" class="contact-item me-4 mb-3 mb-md-0">
                <a href="mailto:josephaarond.bernardo@gmail.com" class="text-decoration-none text-success">
                  <i class="fa-solid fa-envelope contact-icon-large d-block p-5 mx-5 text-success"></i>
                  <span class="contact-text">Email</span>
                </a>
              </div>
              <div id="emailadd" class="contact-item">
                <a href="tel:+639472600416" class="text-decoration-none text-success">
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
              <div class="mb-3">
                <input type="text" v-model="form.name" class="form-control rounded-pill" id="name" placeholder="Your Name" required />
              </div>
              <div class="mb-3">
                <input type="email" v-model="form.email" class="form-control rounded-pill" id="email" placeholder="Your Email" required />
              </div>
              <div class="mb-3">
                <textarea class="form-control rounded-4" id="message" rows="5" v-model="form.message" placeholder="Your Message" required></textarea>
              </div>
              <div class="d-flex justify-content-start mt-2">
                  <div ref="recaptchaContainer"></div>
              </div>
              <div class="text-center mt-3">
                <button type="submit" class="submit-btn btn-primary-custom" :disabled="isLoading">{{isLoading ? "Sending..." : "Send Message"}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      isLoading: false,
      WEB3FORMS_ACCESS_KEY: "951c837b-2583-4a17-b896-758c5a65320a", // Your Web3Forms Access Key
      subject: "New message from portfolio contact form",
      notyf: null, // Notyf instance will be initialized in mounted hook
      SITE_KEY: '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ', // Your reCAPTCHA v2 Site Key
      recaptchaWidgetId: null, // To store the ID of the rendered reCAPTCHA widget
      recaptchaToken: '', // To store the reCAPTCHA token after successful verification
    };
  },
  mounted() {
    // Initialize Notyf for notifications
    this.notyf = new Notyf({
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

    // --- reCAPTCHA Integration: Render widget once grecaptcha is loaded ---
    // This interval checks if the grecaptcha object is available (meaning the script has loaded)
    // and then proceeds to render the reCAPTCHA widget.
    const interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        this.renderRecaptcha(); // Call the method to render the widget
        clearInterval(interval); // Stop the interval once rendered
      }
    }, 100); // Check every 100ms
  },
  methods: {
    /**
     * Callback function for reCAPTCHA when verification is successful.
     * The token is received as an argument.
     * @param {string} token - The reCAPTCHA verification token.
     */
    onRecaptchaSuccess(token) {
      this.recaptchaToken = token; // Store the token in component data
    },

    /**
     * Callback function for reCAPTCHA when the token expires.
     * Clears the stored token.
     */
    onRecaptchaExpired() {
      this.recaptchaToken = ''; // Clear the token
    },

    /**
     * Renders the reCAPTCHA widget into the designated container.
     */
    renderRecaptcha() {
      // Ensure the reCAPTCHA container element exists using $refs
      const recaptchaContainer = this.$refs.recaptchaContainer;
      if (!recaptchaContainer) {
        console.error('reCAPTCHA container element not found. Make sure <div ref="recaptchaContainer"></div> exists in your template.');
        return;
      }
      // Ensure grecaptcha object is loaded
      if (!window.grecaptcha) {
        console.error('Google reCAPTCHA script not loaded.');
        return;
      }

      // Render the reCAPTCHA widget
      this.recaptchaWidgetId = window.grecaptcha.render(recaptchaContainer, {
        sitekey: this.SITE_KEY, // Your reCAPTCHA Site Key
        size: 'normal', // 'normal' or 'compact'
        callback: this.onRecaptchaSuccess, // Callback for successful verification
        'expired-callback': this.onRecaptchaExpired, // Callback for expired token
      });
    },

    /**
     * Resets the reCAPTCHA widget, clearing the current token.
     */
    resetRecaptcha() {
      if (this.recaptchaWidgetId !== null) {
        window.grecaptcha.reset(this.recaptchaWidgetId);
        this.recaptchaToken = ''; // Also clear the internal token state
      }
    },

    /**
     * Handles the form submission process.
     * Sends form data and reCAPTCHA token to Web3Forms.
     */
    // ... inside submitForm() method ...
async submitForm() {
    // 1. Log the reCAPTCHA token BEFORE the check
    console.log("DEBUG: recaptchaToken value before check:", this.recaptchaToken);

    if (!this.recaptchaToken) {
        this.notyf.error('Please verify that you are not a robot.');
        console.error("ERROR: reCAPTCHA token is missing or empty. Aborting submission.");
        return; // Stop the function execution
    }

    this.isLoading = true; // Show loading state
    try {
        const payload = {
            access_key: this.WEB3FORMS_ACCESS_KEY,
            subject: this.subject,
            name: this.form.name,
            email: this.form.email,
            message: this.form.message,
            "g-recaptcha-response": this.recaptchaToken, // Include the reCAPTCHA token
            // Add a hidden field for reCAPTCHA v2 if you are on an older Web3Forms setup
            // This is usually not needed for v2 checkbox, but good to keep in mind
            // "h-captcha-response": this.recaptchaToken // If you mistakenly picked H-Captcha
        };

        // 2. Log the full payload being sent
        console.log("DEBUG: Payload being sent to Web3Forms:", JSON.stringify(payload, null, 2));

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        // 3. Log the raw response status and text if there's an issue
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`ERROR: Web3Forms HTTP error! Status: ${response.status}, Response text: ${errorText}`);
            this.notyf.error(`Failed to send message: ${errorText.substring(0, 50)}...`); // Show a short part of the error
            this.isLoading = false;
            this.resetRecaptcha();
            return; // Stop here if response is not OK
        }

        const result = await response.json();

        if (result.success) {
            console.log("SUCCESS: Form submission successful:", result);
            this.notyf.success("Message Sent!");
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
        } else {
            // Log the actual error from Web3Forms for debugging
            console.error("ERROR: Web3Forms API returned success: false. Details:", result);
            this.notyf.error("Failed to send message. Please check console for details.");
        }
    } catch (error) {
        // Log network or other unexpected errors
        console.error("FATAL ERROR: Form submission catch block error:", error);
        this.notyf.error("An unexpected error occurred.");
    } finally {
        this.isLoading = false; // Always disable loading state
        this.resetRecaptcha(); // Reset reCAPTCHA regardless of outcome
    }
}
  }
};
</script>

<style scoped>
/* Scoped styles for this component */
#contact {
  background-color: #343a40;
  border-radius: 40px;
  padding: 80px 0;
  border-bottom: 1px solid #e9ecef;
  color: white;
}
#contact h2 {
  color: #00896f;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
#map {
  color: #343a40;
  background-color: #00896f;
  border-radius: 40px;
}
#map h2 {
  color: #343a40;
}
.contact-icon-large {
  font-size: 5rem;
}

/* UI Improvement: Form focus state */
.form-control:focus {
  border-color: #00896f;
  box-shadow: 0 0 0 0.25rem rgba(0, 137, 111, 0.25);
  background-color: #ffffff;
}
</style>