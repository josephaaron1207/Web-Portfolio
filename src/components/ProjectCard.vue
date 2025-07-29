<template>
  <div class="col-lg-4 col-md-6">
    <div class="card portfolio-item">
      <img :src="image" class="card-img-top" :alt="title">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <a :href="link" class="btn btn-sm btn-outline-primary rounded-pill" target="_blank">View Details</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    image: String, // This prop will receive the image path from projects.json
    title: String,
    description: String,
    link: String
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
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.5s ease-in-out; /* UI Improvement: Smoother transition */
}
.card:hover .card-img-top {
  transform: scale(1.1);
}
</style>