<template>
  <section id="about">
    <div class="container">
      <h2>About Me</h2>
      <div class="row align-items-center">
        <div class="col-lg-5 text-center">
          <img id="myphoto" src="../../images/Bernon.jpg" alt="Your Photo" />
        </div>
        <div class="col-lg-7 mt-4 mt-lg-0">
          <p>
            Hello! I'm Joseph Aaron, a Full Stack Web Developer, based in Parañaque City, Philippines. I specialize in frontend development.
          </p>
          <p>
            My journey into Tech started when I enrolled to Zuitt Bootcamp. I love transforming complex problems into simple, beautiful, and intuitive solutions. When I'm not [working], you can find me playing table tennis, watching Horror/Anime, writing poems and gaming.
          </p>
          <p>
            I am always eager to learn new technologies and take on challenging projects. Let's connect and create something amazing together!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
#about {
  background-color: #343a40;
  border-radius: 40px;
  padding: 80px 0;
  border-bottom: 1px solid #e9ecef;
  color: white;
}
#about h2 {
  color: #00896f;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
#myphoto {
  height: 300px;
  width: 300px;
  border-radius: 25px;
}
</style>