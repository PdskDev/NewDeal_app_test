<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Ajouter un post</p>
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
        <form @submit.prevent="handleAddPost()">
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
            <input type="submit" class="btn btn-success" value="Sauvegarder" />
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
  name: 'AddPost',
  data() {
    return {
      post: {
        title: '',
        body: '',
        userId: '',
      },
      users: [],
      isLoading: false,
      errorMessage: null,
    };
  },
  created: async function () {
    try {
      this.isLoading = true;
      let ResponseUsers = await PostServices.getAllUsers();
      this.users = ResponseUsers.data;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = error;
      this.isLoading = false;
    }
  },
  methods: {
    handleAddPost: async function () {
      try {
        let response = await PostServices.newPost(this.post);
        if (response) {
          return this.$router.push('/') && console.log(response);
        } else {
          return this.$router.push('/posts/add');
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
