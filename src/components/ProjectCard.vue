<template>
  <div class="col-lg-4 col-md-6">
    <div class="card portfolio-item">
      <img :src="project.image" class="card-img-top" :alt="project.title">
      <div class="card-body">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <a :href="project.link" class="btn btn-sm btn-outline-primary rounded-pill" target="_blank">View Details</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    // Change props to accept a single 'project' object
    project: {
      type: Object,
      required: true // It's good practice to mark required props
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Added to contain the image scale effect */
  background-color: #343a40; /* Set the card background color */
  color: white; /* Ensure text is readable on the dark background */
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
.card-body {
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.card-text {
  max-height: 100px;
  overflow-y: auto;
}
.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: contain; /* Changed from 'cover' to 'contain' */
  background-color: #f8f9fa; /* Optional: Add a background color for transparent images */
  border-radius: 15px 15px 0 0; /* Keep top corners rounded */
  transition: transform 0.5s ease-in-out; /* UI Improvement: Smoother transition */
}
.card:hover .card-img-top {
  transform: scale(1.1);
}
/* Ensure text colors are suitable for the dark background */
.card-title {
  color: white;
}
.card-text {
  color: #cccccc; /* Slightly lighter white for description */
}
.card-body a {
  color: #007bff; /* Bootstrap primary blue for links */
  border-color: #007bff;
}
.card-body a:hover {
  color: #0056b3; /* Darker blue on hover for links */
  border-color: #0056b3;
}

</style>