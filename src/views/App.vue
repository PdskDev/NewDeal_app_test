<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div>
    <div class="container" v-if="!isLoading">
      <div class="row">
        <div class="col">
          <div class="row" v-for="p in posts" :key="p.id">
            <h5>{{ p.id }} - {{ p.title }}</h5>
            <p>{{ p.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JsonServerService } from '@/service/JsonServerService';
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
      let response = await JsonServerService.getAllPosts();
      this.posts = response.data;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = error;
      this.isLoading = false;
    }
  },
  components: { Spinner },
};
</script>
<style scoped></style>
