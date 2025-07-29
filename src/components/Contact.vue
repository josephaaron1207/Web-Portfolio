<template>
  <section id="contact">
    <div class="container">
      <h2>Get In Touch</h2>
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-8">
          <div class="contact-methods mb-5 d-flex flex-wrap justify-content-center">
            <div id="phonenum" class="contact-item me-4 mb-3 mb-md-0">
              <a href="https://www.gmail.com" class="text-decoration-none text-success">
                <i class="fa-solid fa-envelope contact-icon-large d-block p-5 mx-5 text-success"></i>
                <span class="contact-text">Email</span>
              </a>
            </div>
            <div id="emailadd" class="contact-item">
              <a href="https://www.google.com" class="text-decoration-none text-success">
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
              <input type="text" class="form-control rounded-pill" id="name" placeholder="Your Name" required v-model="form.name">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control rounded-pill" id="email" placeholder="Your Email" required v-model="form.email">
            </div>
            <div class="mb-3">
              <textarea class="form-control rounded-4" id="message" rows="5" placeholder="Your Message" required v-model="form.message"></textarea>
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

<script>
export default {
  name: 'Contact',
  data() {
    return {
      recaptchaSiteKey: '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ', // <--- REPLACE THIS LINE with your new site key
      recaptchaToken: null,
      messageBox: {
        show: false,
        type: '', // 'success' or 'danger'
        text: ''
      },
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  mounted() {
    // Ensure grecaptcha is loaded before trying to render
    if (window.grecaptcha) {
      this.renderRecaptcha();
    } else {
      // If reCAPTCHA script loads asynchronously, listen for it
      window.onloadRecaptchaCallback = this.renderRecaptcha;
    }
  },
  methods: {
    renderRecaptcha() {
      if (this.$refs.recaptchaContainer && window.grecaptcha) {
        window.grecaptcha.render(this.$refs.recaptchaContainer, {
          sitekey: this.recaptchaSiteKey,
          callback: this.onRecaptchaVerify,
          'expired-callback': this.onRecaptchaExpired,
          'error-callback': this.onRecaptchaError
        });
      }
    },
    onRecaptchaVerify(token) {
      this.recaptchaToken = token;
      this.showMessage('You can now submit the form.', 'success');
      console.log('reCAPTCHA token:', token);
      // In a real application, you would send this token to your backend for verification.
    },
    onRecaptchaExpired() {
      this.recaptchaToken = null;
      this.showMessage('reCAPTCHA expired. Please re-verify.', 'danger');
      if (window.grecaptcha) {
        window.grecaptcha.reset(); // Reset the widget
      }
    },
    onRecaptchaError() {
      this.recaptchaToken = null;
      this.showMessage('reCAPTCHA error. Please try again.', 'danger');
      if (window.grecaptcha) {
        window.grecaptcha.reset(); // Reset the widget
      }
    },
    async submitForm() {
      // Check if reCAPTCHA is verified
      if (!this.recaptchaToken) {
        this.showMessage('Please complete the reCAPTCHA verification.', 'danger');
        return;
      }

      // Here you would typically send your form data and recaptchaToken to your backend
      // For demonstration, we'll just log the data.
      console.log('Form submitted:', this.form);
      console.log('reCAPTCHA Token:', this.recaptchaToken);

      // Simulate a successful submission
      this.showMessage('Form submitted successfully!', 'success');

      // Reset the form and reCAPTCHA after submission
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      this.recaptchaToken = null; // Clear the token
    },
    showMessage(text, type) {
      this.messageBox.show = true;
      this.messageBox.text = text;
      this.messageBox.type = type;
      // Hide message after 5 seconds
      setTimeout(() => {
        this.messageBox.show = false;
      }, 5000);
    }
  }
}
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