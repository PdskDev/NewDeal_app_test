<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Modifier le post #{{ post.id }}</p>
        <p class="fst-italic">
          Test pour "Candidature poste Developpeur Web en alternance - Newdeal"
        </p>
      </div>
    </div>
  </div>
  <div v-if="isLoading">
    <div class="container mt-3">
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
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="handleUpdatePost()">
          <div class="mb-2">
            <input
              required
              v-model="post.title"
              type="text"
              class="form-control"
              placeholder="Titre"
            />
          </div>
          <div class="mb-2">
            <textarea
              required
              v-model="post.body"
              class="form-control"
              placeholder="Ajouter le contenu du post"
            ></textarea>
          </div>
          <div class="mb-2">
            <select
              required
              v-model="post.userId"
              class="form-control"
              v-if="users.length > 0"
            >
              <option value="">Selectionner un utilisateur</option>
              <option v-for="user of users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <router-link to="/" class="btn btn-warning my-3"
              ><i class="fa fa-arrow-alt-circle-left"></i> Retour à la
              liste</router-link
            >{{ ' ' }}
            <input type="submit" class="btn btn-success" value="Modifier" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { PostServices } from '@/service/JsonServerService';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'EditPost',
  data() {
    return {
      postId: this.$route.params.postId,
      isLoading: false,
      post: {},
      users: [],
      errorMessage: null,
    };
  },
  created: async function () {
    try {
      this.isLoading = true;
      let responsePost = await PostServices.getOnePost(this.postId);
      let ResponseUsers = await PostServices.getAllUsers();

      this.post = responsePost.data;
      this.users = ResponseUsers.data;

      this.isLoading = false;
    } catch (error) {
      this.errorMessage = error;
      this.isLoading = false;
    }
  },
  methods: {
    isDone: function () {
      return (
        Object.keys(this.post).length > 0 && Object.keys(this.users).length > 0
      );
    },
    handleUpdatePost: async function () {
      try {
        let response = await PostServices.updatePost(this.post, this.postId);
        if (response) {
          return this.$router.push('/') && console.log(response);
        } else {
          return this.$router.push(`/posts/edit/${this.postId}`);
        }
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
  components: { Spinner },
};
</script>
<style scoped></style>
