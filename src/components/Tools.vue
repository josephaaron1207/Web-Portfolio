<template>
  <div id="tools" class="container-fluid">
    <h2>Tools</h2>
    <div class="tools-grid">
      <div class="category">
        <h2>Front End</h2>
        <div class="tool-items">
          <div class="tool-item">
            <img src="../../images/tools/html.svg" alt="Abstract HTML Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/css.svg" alt="Abstract CSS Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/bootstrap.svg" alt="Abstract Bootstrap Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/js.svg" alt="Abstract Javascript Icon" />
          </div>
        </div>
      </div>
      <div class="category">
        <h2>MERN</h2>
        <div class="tool-items">
          <div class="tool-item">
            <img src="../../images/tools/mongodb.svg" alt="Abstract MongoDB Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/expressjs.svg" alt="Abstract Express.js Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/react.svg" alt="Abstract React Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/nodejs.svg" alt="Abstract Node.js Icon" />
          </div>
        </div>
      </div>
      <div class="category">
        <h2>Other Tools</h2>
        <div class="tool-items">
          <div class="tool-item">
            <img src="../../images/tools/heroku.svg" alt="Abstract Heroku Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/git.svg" alt="Abstract Git Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/postman.svg" alt="Abstract Postman Icon" />
          </div>
          <div class="tool-item">
            <img src="../../images/tools/sublime.svg" alt="Abstract Sublime Text Icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
};
</script>

<style scoped>
#tools {
  padding: 60px 0;
  text-align: center;
  background-color: #343a40; /* Updated background color */
  color: #00896f; /* Set a default text color for the section */
  border-radius: 40px;
}
#tools h2 {
  color: #00896f; /* Updated heading color for readability */
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
#tools h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #00896f; /* Updated underline color for readability */
  border-radius: 2px;
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.category {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.category:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
.category h2 {
  font-size: 1.8rem;
  color: #00896f;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 10px;
}
.category h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #00896f;
  border-radius: 2px;
}
.tool-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
}
.tool-item img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 3px solid #343a40;
  box-shadow: 0 0 0 rgba(0, 137, 111, 0);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.tool-item img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 137, 111, 0.6), 0 0 20px rgba(0, 137, 111, 0.4), 0 0 30px rgba(0, 137, 111, 0.2);
}
</style>