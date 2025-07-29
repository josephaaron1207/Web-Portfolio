<template>
  <div>
    <Navbar />
    <HeroSection />
    <About />
    <Projects />
    <Tools />
    <MapSection />
    <Contact />
    <FooterComponent />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import About from './components/About.vue';
import Projects from './components/Projects.vue';
import Tools from './components/Tools.vue';
import Contact from './components/Contact.vue';
import FooterComponent from './components/FooterComponent.vue';

// For HeroSection and MapSection, you might initially keep them within App.vue or create separate components if they become complex.
const HeroSection = {
  template: `
    <section id="landing" class="hero-section d-flex align-items-center">
        <div class="container">
            <h1>Hi, I'm Joseph Aaron</h1>
            <p class="lead">A Passionate Full Stack Web Developer creating beautiful and functional web experiences.</p>
            <a href="#projects" class="btn btn-primary-custom">View My Work</a>
        </div>
    </section>
  `
};

const MapSection = {
  template: `
    <div id="map" class="container-fluid">
        <div class="row text-center mb-4">
            <div class="col">
                <h2 class="my-5">Visit Us!</h2>
            </div>
        </div>
        <div class="row justify-content-center ">
            <div class="col-lg-8 m-4">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15452.43988643541!2d121.00358374543454!3d14.47837411594325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce7de2da5bbd%3A0xc4f1845e91886224!2sSM%20City%20Sucat!5e0!3m2!1sen!2sph!4v1750151542839!5m2!1sen!2sph" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </div>
  `
};

export default {
  name: 'App',
  components: {
    Navbar,
    HeroSection,
    About,
    Projects,
    Tools,
    MapSection,
    Contact,
    FooterComponent
  }
}
</script>

<style scoped>
/* Any App-specific styles that are NOT global and don't fit in components */
</style>