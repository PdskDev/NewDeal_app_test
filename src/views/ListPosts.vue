<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Afficher tous les Posts</p>
        <p class="mt-3">
          <router-link to="/posts/add" class="btn btn-success"
            ><i class="fa fa-plus-circle"></i> Ajouter un post</router-link
          >
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
  <div>
    <div v-if="!isLoading">
      <div class="container mt-3" v-if="posts.length > 0">
        <div class="row">
          <div class="col">
            <div class="row">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post in posts" :key="post.id">
                    <th scope="row">{{ post.id }}</th>
                    <td>{{ post.title }}</td>
                    <td>
                      <router-link
                        :to="`/posts/view/${post.id}`"
                        class="btn btn-warning my-1"
                        ><i class="fa fa-eye"></i
                      ></router-link>
                    </td>
                    <td>
                      <router-link
                        :to="`/posts/edit/${post.id}`"
                        class="btn btn-primary my-1"
                        ><i class="fa fa-pen"></i
                      ></router-link>
                    </td>
                    <td>
                      <button
                        class="btn btn-danger my-1"
                        @click="deletePost(post.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  name: 'ListPosts',
  data() {
    return {
      posts: [],
      isLoading: false,
      errorMessage: null,
    };
  },
  created: async function () {
    try {
      this.isLoading = true;
      let response = await PostServices.getAllPosts();
      this.posts = response.data;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = error;
      this.isLoading = false;
    }
  },
  methods: {
    deletePost: async function (postId) {
      try {
        this.isLoading = true;
        let response = await PostServices.deletePost(postId);
        console.log(response);
        if (response) {
          this.isLoading = true;
          let response = await PostServices.getAllPosts();
          this.posts = response.data;
          this.isLoading = false;
        }
      } catch (error) {
        this.errorMessage = error;
        this.isLoading = false;
      }
    },
  },
  components: { Spinner },
};
</script>
<style scoped></style>
