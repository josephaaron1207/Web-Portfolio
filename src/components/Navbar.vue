<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#landing">
        <img src="../../images/logo.png" alt="Company Logo" class="logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#home"
        aria-controls="home"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="home">
        <div class="navbar-nav ms-auto">
          <a class="nav-link" href="#landing">Home</a>
          <a class="nav-link" href="#about">About</a>
          <a class="nav-link" href="#tools">Tools</a>
          <a class="nav-link" href="#projects">Projects</a>
          <a class="nav-link" href="#contact">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Updated CSS for the logo image */
.navbar-brand .logo {
  max-height: 60px; /* Increased height to make the logo bigger */
  width: auto;
}

.nav-link {
  font-weight: 600;
  color: white !important;
  transition: color 0.3s ease;
  position: relative;
}
.nav-link.active,
.nav-link:hover {
  color: #00896f !important;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #00896f;
  transition: width 0.3s ease;
}
.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
</style>