<template>
    <div style="height: 100vh">
      <div
        style="height: 100%"
        class="d-flex flex-column justify-center align-center text-typo"
      >
        <div>
          <v-btn
            :ripple="false"
            icon
            outlined
            rounded
            :color="'green'"
            width="50px"
            height="50px"
            class="check"
          >
            <v-icon size="30" color="green"> mdi-check </v-icon>
          </v-btn>
        </div>
        <h2 class="mt-5">{{ $t('messageDoneRegister') }}</h2>
        <v-btn elevation="0"
                      :ripple="false"
                      height="43"
                      
                      @click="logout"
                      class=" mt-5
                        font-weight-bold
                        text-capitalize
                        btn-ls btn-blue
                        py-3
                        px-6
                      ">{{$t('go back')}}</v-btn>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "BlankRegisterDone",
  
    data() {
      return {
        message: "",
        status: "",
        data: {},
      };
    },
    beforeRouteEnter(to, from, next) {
      // console.log(from)
      if(from.fullPath == '/form-register'){
        // console.log(1)
        return next()
      }else{
        // console.log(2)
        return next({path: from.fullPath})
      }
    },
    methods: {
      logout(){
        this.$store
        .dispatch("auth/logout")
        .then((response) => {
          console.log(response);
          this.$router.push({path:'/login'})
        })
        .catch((err) => console.log(err));
      }
    },
    
    
  };
  </script>
  <style>
  .check {
    border-width: 2px;
  }
  </style>