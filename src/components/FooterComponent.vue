<template>
  <footer>
    <div class="container">
      <p>© 2025 2RON. All rights reserved.</p>
      <div class="social-icons mt-3">
        <a href="https://www.linkedin.com" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://x.com/" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://www.facebook.com/" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
footer {
  background-color: #00896f;
  color: white;
  padding: 40px 0;
  text-align: center;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
.social-icons a {
  color: white;
  font-size: 1.8rem;
  margin: 0 15px;
  transition: color 0.3s ease;
}
.social-icons a:hover {
  color: #e7f4ea;
}
</style>