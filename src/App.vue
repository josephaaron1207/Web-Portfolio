<template>
  <div>
    <Navbar />
    <section id="landing" class="hero-section d-flex align-items-center">
      <div class="container">
        <h1>Hi, I'm Joseph Aaron</h1>
        <p class="lead">A Passionate Full Stack Web Developer creating beautiful and functional web experiences.</p>
        <a href="#projects" class="btn btn-primary-custom">View My Work</a>
      </div>
    </section>
    <About />
    <Projects />
    <Tools />
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

export default {
  name: 'App',
  components: {
    Navbar,
    About,
    Projects,
    Tools,
    Contact,
    FooterComponent,
  },
};
</script>

<style>
/* Global styles from the original CSS that apply to the whole app */
body {
  font-family: 'Montserrat', sans-serif;
  color: white;
}
section {
  padding: 80px 0;
}
.btn-primary-custom {
  background-color: #fff;
  color: #00896f;
  border: 2px solid #fff;
  padding: 12px 30px;
  border-radius: 30px;
  transition: all 0.3s ease;
}
.btn-primary-custom:hover {
  background-color: #007b5e;
  color: #fff;
  border-color: #007b5e;
  box-shadow: 0 4px 8px rgba(0, 123, 111, 0.4);
}
</style>