<template>
  <section id="contact" class="py-5" style="background-color:#00897B;">
    <div class="container">
      <!-- Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold text-white">Contact Me</h1>
        <p class="text-light opacity-90">
          Have a question, collaboration idea, or just want to say hi? Drop me a message below.
        </p>
      </div>

      <div class="row g-4 align-items-stretch">
        <!-- Map -->
        <div class="col-lg-6">
          <div class="ratio ratio-16x9 rounded shadow-lg overflow-hidden">
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
        <div class="col-lg-6 d-flex">
          <form
            @submit.prevent="submitForm"
            class="bg-dark p-4 rounded shadow-lg text-white flex-fill"
            style="background-color:#343a40;"
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
              <div class="d-flex gap-3 mb-3 mb-md-0">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" 
                   class="text-white fs-3 social-icon" style="color:#0e76a8;">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" 
                   class="text-white fs-3 social-icon" style="color:#fca326;">
                  <i class="fab fa-gitlab"></i>
                </a>
                <a href="https://github.com/cbabbage0991" 
                   class="text-white fs-3 social-icon">
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

<style scoped>
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

.social-icon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}
</style>
