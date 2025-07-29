<template>
  <section id="projects">
    <div class="container">
      <h2>My Projects</h2>
      <div class="row g-4">
        <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" />
      </div>
    </div>
  </section>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import projectsData from '../data/projects.json';

export default {
  name: 'Projects',
  components: {
    ProjectCard,
  },
  setup() {
    // Correctly import the data from the JSON file
    const projects = projectsData;
    return {
      projects,
    };
  },
};
</script>

<style scoped>
#projects {
  background-color: #00896f;
  border-radius: 40px;
  padding: 80px 0;
  border-bottom: 1px solid #e9ecef;
  color: white;
}
#projects h2 {
  color: #343a40;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
#projects .row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
</style>

<style scoped>
#projects {
  background-color: #00896f;
  border-radius: 40px;
  padding: 80px 0;
  border-bottom: 1px solid #e9ecef;
  color: white;
}
#projects h2 {
  color: #343a40;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
#projects .row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
</style>