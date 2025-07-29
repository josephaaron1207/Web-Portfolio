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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123504.1482937747!2d120.9345330389333!3d14.685934005162424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b41dae605e5b%3A0x4258953c2333ea6a!2sCaloocan%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1722215160866!5m2!1sen!2sph"
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
              <input type="text" v-model="name" class="form-control" id="name" placeholder="Your Name">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" v-model="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea v-model="message" class="form-control" id="message" rows="5"></textarea>
            </div>

            <div class="d-flex flex-wrap align-items-center justify-content-between">
              <div class="d-flex gap-3 mb-3">
                <a href="https://github.com/PeterJayson13" target="_blank"><img src="/images/Github.png" class="img-fluid social-icon" alt="GitHub"></a>
                <a href="https://gitlab.com/peterbongabong7" target="_blank"><img src="/images/Gitlab.png" class="img-fluid social-icon" alt="GitLab"></a>
                <a href="https://www.linkedin.com/in/peter-jayson-bongabong-b43793365/" target="_blank"><img src="/images/Linkedin.png" class="img-fluid social-icon" alt="LinkedIn"></a>
              </div>
              <div>
                <button type="submit" class="submit-btn btn-custom" data-bs-toggle="modal" data-bs-target="#myModal" :disabled="isLoading">{{isLoading ? "Sending..." : "Submit"}}</button>

                <div class="d-flex justify-content-end mt-2">
                    <div v-if="recaptchaLoaded" ref="recaptchaContainer"></div>
                    <div v-else>Loading reCAPTCHA...</div>
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
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const notyf = new Notyf();
    const WEB3FORMS_ACCESS_KEY = "31457fb4-8955-4f56-9efd-7684210a1b64";
    const SITE_KEY = '6LdgtZIrAAAAAG7QHntHbxhxUWFOHJQACKCfdyiZ'; // Replace with your site key

    const subject = "New message from portfolio contact form";

    const name = ref("");
    const email = ref("");
    const message = ref("");

    const isLoading = ref(false);
    const recaptchaLoaded = ref(false); // New state to track if reCAPTCHA script is loaded

    const recaptchaContainer = ref(null);
    const recaptchaWidgetId = ref(null);
    const recaptchaToken = ref('');

    // Function to load the reCAPTCHA script dynamically
    function loadRecaptchaScript() {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?onload=vueRecaptchaOnload&render=explicit`;
            script.async = true;
            script.defer = true;
            script.onerror = reject;
            document.head.appendChild(script);

            // Create a global callback function for reCAPTCHA to call once it's loaded
            window.vueRecaptchaOnload = () => {
                resolve();
            };
        });
    }

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
      if (!window.grecaptcha || !recaptchaContainer.value) {
        console.error('reCAPTCHA API or container not ready for rendering.');
        return;
      }

      recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: SITE_KEY,
        size: 'normal', // or 'compact'
        callback: onRecaptchaSuccess,
        'expired-callback': onRecaptchaExpired,
      });
      recaptchaLoaded.value = true; // Set to true once rendered
    }

    // Function to reset reCAPTCHA
    function resetRecaptcha() {
      if (recaptchaWidgetId.value !== null && window.grecaptcha) {
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
                    "g-recaptcha-response": recaptchaToken.value, // Include reCAPTCHA token
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log(result);
                isLoading.value = false;
                notyf.success("Message Sent!");
                name.value = ''; // Clear form fields
                email.value = '';
                message.value = '';
            } else {
                notyf.error("Failed to send message: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Submission error:", error);
            isLoading.value = false;
            notyf.error("Failed to send message.");
        } finally {
            resetRecaptcha();
        }
    }

    onMounted(async () => {
        try {
            await loadRecaptchaScript();
            // Give a small delay to ensure the DOM element is fully rendered and accessible
            // before grecaptcha.render is called.
            setTimeout(() => {
                renderRecaptcha();
            }, 50); // Small delay
        } catch (error) {
            console.error("Failed to load reCAPTCHA script:", error);
            notyf.error("Failed to load reCAPTCHA. Please try refreshing the page.");
        }
    });

    onBeforeUnmount(() => {
        // Clean up global callback if necessary, though not strictly required for this pattern
        delete window.vueRecaptchaOnload;
    });

</script>

<style scoped>
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