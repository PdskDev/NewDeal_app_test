<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Consulter un Post</p>
        <p class="fst-italic mt-3">
          Test pour "Candidature poste Developpeur Web en alternance - Newdeal"
        </p>
      </div>
    </div>
  </div>
  <div v-if="isLoading">
    <div class="container">
      <div class="row">
        <div class="col">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  <!--If error occure-->
  <div v-if="!isLoading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-danger fw-bold">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isLoading && isDone">
    <div class="container mt-3 align-items-center">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group">
            <li class="list-group-item">
              Id : <span class="fw-bold">{{ post.id }}</span>
            </li>
            <li class="list-group-item">
              Titre : <span class="fw-bold">{{ post.title }}</span>
            </li>
            <li class="list-group-item">
              Texte : <span class="fw-bold">{{ post.body }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link to="/" class="btn btn-warning my-3"
            ><i class="fa fa-arrow-alt-circle-left"></i> Retour à la
            liste</router-link
          >{{ ' ' }}
          <router-link
            :to="`/posts/edit/${post.id}`"
            class="btn btn-primary my-3"
            ><i class="fa fa-pen"></i> Modifier</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PostServices } from '@/service/JsonServerService';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'ViewPost',
  data() {
    return {
      postId: this.$route.params.postId,
      post: {},
      isLoading: false,
      errorMessage: false,
    };
  },
  created: async function () {
    try {
      this.isLoading = true;
      let response = await PostServices.getOnePost(this.postId);
      this.post = response.data;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = error;
      this.isLoading = false;
    }
  },
  methods: {
    isDone: function () {
      return Object.keys(this.post).length > 0;
    },
  },
  components: { Spinner },
};
</script>
<style scoped></style>
