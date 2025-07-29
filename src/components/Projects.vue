<template>
  <section id="projects">
    <div class="container">
      <h2>My Projects</h2>
      <div class="row g-4">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :image="project.image"
          :title="project.title"
          :description="project.description"
          :link="project.link"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import projectsData from '../data/projects.json'; // Import the JSON data

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: projectsData // Assign the imported JSON data to your projects array
    };
  }
}
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