<template>
    <!-- My Projects Section -->
    <section class="pb-5" id="projects">
        <!-- Section Heading -->
        <h1 class="mt-5 mb-5 pb-4 text-center">My Projects</h1>

        <!-- Loop through each group of 3 projects -->
        <div 
            v-for="(group, index) in chunkedProjects" 
            :key="index" 
            class="card-deck my-5 justify-content-center"
        >
            <!-- For each project in the current group, render a ProjectCard -->
            <ProjectCard 
                v-for="project in group" 
                :key="project.id" 
                :project="project"
            />
        </div>
    </section>
</template>

<script setup>
// Import the 'computed' function from Vue to define reactive derived state 
import { computed } from 'vue';

// Import the ProjectCard component which will display individual project details
import ProjectCard from './ProjectCard.vue';

// Import the project data from a local JSON file
import projects from '../data/projects.json';

// Define the number of projects to display per row
const chunkSize = 3;

/*
 * Create a computed property that splits the projects array into smaller arrays ("chunks")
 * Each chunk will contain up to `chunkSize` number of projects (i.e., 3 per group)
 * This allows us to group them visually in separate rows in the UI
 */
const chunkedProjects = computed(() => {
  const chunks = [];
  // Loop through the projects array in steps of `chunkSize`
  for (let i = 0; i < projects.length; i += chunkSize) {
    // Slice out a chunk of up to 3 projects and add it to the chunks array
    chunks.push(projects.slice(i, i + chunkSize));
  }
  // Return the array of chunks, which the template will loop through
  return chunks;
});
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