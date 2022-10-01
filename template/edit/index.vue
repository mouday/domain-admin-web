<template>
  <div class="app-container">
    <DataForm @on-success="handleSuccess"></DataForm>
  </div>
</template>

<script>
/**
 * created {{time.date}}
 */
import DataForm from "./DataForm.vue";

export default {
  name: '{{edit_name}}',

  props: {},

  components: {
    DataForm,
  },

  data() {
    return {
      id: null
    };
  },

  computed: {},

  methods: {
    handleSuccess() {},
  },

  created() {
    this.id = this.$route.query.id;
  },
};
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
