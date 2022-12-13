<template>
    <div class="login-footer py-3 px-4">
      <div class="text-end mb-3">
        <router-link
            to="/login"
            class="btn px-2 py-1 btn-secondary shadow-none"
        >{{ $t("auth.login") }}</router-link
        >
      </div>
    </div>
</template>

<script>
export default {
  name: "FormFooter"
}
</script>

<style scoped>

</style>
