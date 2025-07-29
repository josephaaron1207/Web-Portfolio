<template>
  <section id="contact" class="py-5" style="background-color: #2e7d32;"> 
    <div class="container">
      <h1 class="text-center text-white mb-4">Contact</h1>
      <div class="row align-items-stretch">
        
        <!-- Contact Form -->
        <div class="col-md-6 d-flex">
          <div class="card flex-fill shadow p-4">
            <h4 class="mb-3">Get In Touch</h4>
            <form>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="Your name" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Your email" />
              </div>
              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea rows="4" class="form-control" placeholder="Your message"></textarea>
              </div>
              <button type="submit" class="btn btn-success w-100">Send</button>
            </form>
          </div>
        </div>

        <!-- Map -->
        <div class="col-md-6 d-flex">
          <div class="card flex-fill shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0000000000005!2d-122.41941568468107!3d37.77492977975981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064df6f7c1d%3A0xabcdefabcdef!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1683200000000!5m2!1sen!2sus"
              width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
            </iframe>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
#contact {
  min-height: 100vh;
}
.card {
  border-radius: 12px;
  overflow: hidden;
}
</style>
