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
              <div class="text-center mt-3">
                <button type="submit" class="submit-btn btn-primary-custom" :disabled="isLoading">
                  {{ isLoading ? "Sending..." : "Send Message" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
      // WEB3FORMS_ACCESS_KEY and subject removed
      notyf: null, // Notyf instance will be initialized in mounted hook
    };
  },
  mounted() {
    // Initialize Notyf for notifications using the global Notyf object
    if (window.Notyf) {
      this.notyf = new window.Notyf({
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
    } else {
      console.error('Notyf is not loaded. Please ensure the Notyf CDN script is included in index.html.');
    }
  },
  methods: {
    /**
     * Handles the form submission process.
     * (Currently simulates success as Web3Forms is removed).
     */
    async submitForm() {
      this.isLoading = true; // Show loading state
      try {
        // Log the form data to console instead of sending to Web3Forms
        console.log("Form data submitted:", this.form);

        // Simulate an asynchronous operation (e.g., if you were to send to your own backend)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second delay

        // Simulate success
        this.notyf.success("Message Sent! (Simulated)");
        // Clear form fields after successful submission
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';

      } catch (error) {
        // This catch block would be for your own backend errors, or unexpected client-side issues
        console.error("Form submission error (simulated):", error);
        this.notyf.error("Failed to send message. Please try again later. (Simulated Error)");
      } finally {
        this.isLoading = false; // Always disable loading state
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