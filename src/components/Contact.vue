<template>
  <section id="contact" class="py-5 contact-section">
    <div class="container">
      <!-- Logo -->
      <div class="text-center mb-4">
        <a href="/">
          <img src="@/assets/logo.png" alt="My Logo" class="contact-logo" />
        </a>
      </div>

      <!-- Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold text-white">Contact Me</h1>
        <p class="text-light opacity-90">
          Have a question, collaboration idea, or just want to say hi? Drop me a message below.
        </p>
      </div>

      <div class="row g-4 align-items-stretch">
        <!-- Map -->
        <div class="col-lg-6 d-flex">
          <div class="card flex-fill shadow-lg rounded overflow-hidden">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=centro%20escolar%20university%20manila&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Form -->
        <div class="col-lg-6 d-flex">
          <form
            @submit.prevent="submitForm"
            class="card flex-fill p-4 rounded shadow-lg text-white contact-form"
          >
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
              <div class="d-flex gap-4 mb-3 mb-md-0">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" 
                   class="social-icon linkedin">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" 
                   class="social-icon gitlab">
                  <i class="fab fa-gitlab"></i>
                </a>
                <a href="https://github.com/cbabbage0991" 
                   class="social-icon github">
                  <i class="fab fa-github"></i>
                </a>
              </div>
              <button
                type="submit"
                class="btn btn-lg px-5 text-white submit-btn"
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

<style scoped>
.contact-section {
  background-color: #00897B;
}

.contact-logo {
  height: 80px;
  width: auto;
  filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));
}

.card {
  min-height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.contact-form {
  background-color: #343a40;
}

form input,
form textarea {
  background-color: #f8f9fa !important;
  border: none !important;
  color: #343a40;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}

form input:focus,
form textarea:focus {
  outline: none;
  border: 2px solid #20c997 !important;
  box-shadow: 0 0 8px rgba(32,201,151,0.5) !important;
}

.submit-btn {
  background-color: #20c997;
}

.social-icon {
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  transition: transform 0.3s, background-color 0.3s;
}

.social-icon i {
  color: #fff;
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
  transform: scale(1.2);
  background-color: #20c997 !important;
}
</style>
