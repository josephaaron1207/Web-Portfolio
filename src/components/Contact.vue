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
              <!-- reCAPTCHA widget will be rendered here -->
              <div class="d-flex justify-content-center mt-2">
                <div ref="recaptchaContainer" class="recaptcha-placeholder"></div>
              </div>
              <div class="text-center mt-3">
                <button type="submit" class="submit-btn btn-primary-custom" :disabled="isLoading || !recaptchaToken">
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

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const notyf = new Notyf();
    const WEB3FORMS_ACCESS_KEY = "951c837b-2583-4a17-b896-758c5a65320a";

    const subject = "New message from portfolio contact form";

    const name = ref("");
    const email = ref("");
    const message = ref("");

    const isLoading = ref(false);

    const submitForm = async () => {
        // Set the loading state to true.
        if ( !recaptchaToken.value){
            notyf.error('Please verify that you are not a robot.');
            return;
        }
        isLoading.value = true;
        try{

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
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log(result);
                // Set the loading state to false.
                isLoading.value = false;
                notyf.success("Message Sent!");
                }
            } catch (error) {
                    console.log(error);
                    isLoading.value = false;
                    notyf.error("Failed to send message.");
                } finally {
                    resetRecaptcha();
                }
            }

    const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ';  // Replace with your site key

    const recaptchaContainer = ref(null);
    const recaptchaWidgetId = ref(null);
    const recaptchaToken = ref('');

    // Callback called by reCAPTCHA when successful
    function onRecaptchaSuccess(token) {
      recaptchaToken.value = token;
    }

    // Callback when expired
    function onRecaptchaExpired() {
      recaptchaToken.value = '';
    }

    // Function to render the reCAPTCHA widget
    function renderRecaptcha() {
      if (!window.grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
      }

      recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: SITE_KEY,
        size: 'normal', // or 'compact'
        callback: onRecaptchaSuccess,
        'expired-callback': onRecaptchaExpired,
      });
    }

    // Function to reset reCAPTCHA 
    function resetRecaptcha() {
      if (recaptchaWidgetId.value !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.value);
        recaptchaToken.value = '';
      }
    }

    onMounted(() => {

    const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderRecaptcha();
          clearInterval(interval);
        }
      }, 100);

      onBeforeUnmount(() => {
        clearInterval(interval);
      });
    });


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

/* Style for the reCAPTCHA placeholder */
.recaptcha-placeholder {
  min-height: 78px; /* Approximate height of reCAPTCHA widget */
  display: flex;
  justify-content: center;
  align-items: center;
  /* You can add a border or background here if you want a visual cue before it loads */
}
</style>
