<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">
          Consultation du Post #{{ post.id }}
        </p>
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
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group">
            <li class="list-group-item">
              Titre : <span class="fw-bold">{{ post.title }}</span>
            </li>
            <li class="list-group-item">
              Texte : <span class="fw-bold">{{ post.body }}</span>
            </li>
            <li class="list-group-item">
              Auteur : <span class="fw-bold">{{ user.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row" v-if="comments.length > 0">
        <div class="col-md-12">
          <div class="card mt-2">
            <div class="card-header">Liste de commentaires</div>
            <div class="card-body">
              <div
                class="card mt-2"
                v-for="comment in comments"
                :key="comment.id"
              >
                <div class="card-header fw-bold">{{ comment.name }}</div>
                <div class="card-body">"{{ comment.body }}"</div>
              </div>
            </div>
          </div>
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
      user: {},
      comments: [],
      isLoading: false,
      errorMessage: false,
    };
  },
  created: async function () {
    try {
      this.isLoading = true;
      let responsePost = await PostServices.getOnePost(this.postId);
      this.post = responsePost.data;

      let responseUser = await PostServices.getOneUser(responsePost.data);
      this.user = responseUser.data;

      let responseComment = await PostServices.getPostComment(this.postId);
      this.comments = responseComment.data;

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
