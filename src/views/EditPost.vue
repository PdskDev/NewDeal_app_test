<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">JSon Placeholder Application</p>
        <p class="fst-italic">
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
</template>
<script>
import { PostServices } from '@/service/JsonServerService';
import Spinner from '@/components/Spinner.vue';
export default {
  name: 'EditPost',
};
</script>
<style scoped></style>
