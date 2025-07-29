<template>
  <section id="contact" class="py-5" style="background-color:#343a40;">
    <div class="container">
      <!-- Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold" style="color:#20c997;">Contact Me</h1>
        <p class="text-light opacity-75">
          Have a question, collaboration idea, or just want to say hi? Drop me a message below.
        </p>
      </div>

      <div class="row g-5 align-items-center">
        <!-- Map -->
        <div class="col-lg-6">
          <div class="ratio ratio-4x3 rounded shadow-lg overflow-hidden">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=centro%20escolar%20university%20manila&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              style="border:0;"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Form -->
        <div class="col-lg-6">
          <form
            @submit.prevent="submitForm"
            class="bg-dark p-4 rounded shadow-lg"
            style="background-color:#2c3035;"
          >
            <div class="mb-3">
              <input
                type="text"
                v-model="name"
                class="form-control form-control-lg bg-light border-0"
                placeholder="Full Name"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control form-control-lg bg-light border-0"
                placeholder="Email Address"
                required
              />
            </div>
            <div class="mb-3">
              <textarea
                v-model="message"
                class="form-control form-control-lg bg-light border-0"
                rows="6"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <!-- Footer -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
              <div class="social-icons mb-3 mb-md-0">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" class="me-3 fs-4 text-light" style="color:#20c997;">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" class="me-3 fs-4 text-light" style="color:#fca326;">
                  <i class="fab fa-gitlab"></i>
                </a>
                <a href="https://github.com/cbabbage0991" class="fs-4 text-light">
                  <i class="fab fa-github"></i>
                </a>
              </div>
              <button
                type="submit"
                class="btn btn-lg px-5 text-white"
                style="background-color:#20c997;"
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
