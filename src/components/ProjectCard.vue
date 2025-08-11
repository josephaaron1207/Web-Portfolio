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
    project: {
      type: Object,
      required: true
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
  overflow: hidden;
  background-color: #343a40;
  color: white;

  /* Equal sizing but slightly taller */
  width: 320px; 
  height: 430px; /* increased from 400px */
  margin: 15px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-text {
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  min-height: 80px; 
  max-height: 80px; 
  color: #cccccc;
}

.card-img-top {
  width: 100%;
  height: 200px; 
  object-fit: contain;
  background-color: #f8f9fa;
  border-radius: 15px 15px 0 0;
  transition: transform 0.5s ease-in-out;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.card-title {
  color: white;
}

/* Green outline + green text for button */
.card-body a {
  color: #28a745;
  border-color: #28a745;
}

.card-body a:hover {
  color: #1e7e34;
  border-color: #1e7e34;
}
</style>
