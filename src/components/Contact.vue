<template>
  <section id="contact" class="py-5 bg-light">
    <div class="container">
      <!-- Title -->
      <div class="text-center mb-5">
        <h1 class="fw-bold text-dark">Get in Touch</h1>
        <p class="text-muted">I’d love to hear from you! Fill out the form and I’ll get back to you soon.</p>
      </div>

      <div class="row g-5 align-items-center">
        <!-- Map -->
        <div class="col-lg-6">
          <div class="ratio ratio-4x3 rounded shadow-sm overflow-hidden">
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
          <form @submit.prevent="submitForm" class="bg-white p-4 rounded shadow contact-form">
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
              <div class="social-icons mb-3 mb-md-0">
                <a href="https://www.linkedin.com/in/charles-babbage-8291a6211/" class="social-icon linkedin">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://gitlab.com/cbabbage0991" class="social-icon gitlab">
                  <i class="fab fa-gitlab"></i>
                </a>
                <a href="https://github.com/cbabbage0991" class="social-icon github">
                  <i class="fab fa-github"></i>
                </a>
              </div>
              <button
                type="submit"
                class="btn btn-dark btn-lg px-5 submit-btn"
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

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();
const WEB3FORMS_ACCESS_KEY = "951c837b-2583-4a17-b896-758c5a65320a";
const subject = "New message from portfolio contact form";

const name = ref("");
const email = ref("");
const message = ref("");
const isLoading = ref(false);

const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref("");

// Form submit
const submitForm = async () => {
  if (!recaptchaToken.value) {
    notyf.error("Please verify that you are not a robot.");
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
      body:
