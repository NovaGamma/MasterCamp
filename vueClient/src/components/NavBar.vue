<template>
  <div class="ntm">
    <div class="NavSup">
      <img class="LogoSite" src="../assets/mmmmh.jpg">
      <h2 class="textSup">Profil d'électeur</h2>
    </div>
    <div class="nav" id="nav">
      <div v-if="!token">
        <router-link to="/Login">Login</router-link> |
        <router-link to="/Register">Register</router-link> |
        <router-link to="/PageCandidat">Candidats</router-link>
      </div>
      <div v-else>
        <router-link v-if="user.fullName != 'Admin'" to="/AddComment">Add Comment</router-link>
        <router-link v-else to="/Admin">Admin vue</router-link>
        {{user.fullName}} |
        <button @click="logout">Log Out</button>
      </div>
    </div>
  </div>
    <router-view/>

</template>


<script>
import VueJwtDecode from "vue-jwt-decode";
export default{
  name:'NavBar',
  data(){
    return {
      user:{},
      token:''
    }
  },
  mounted(){
    this.getToken();
    this.emitter.on("token_update", ()=>{
      this.getToken();
    });
  },
  methods:{
    getToken(){
      let token = localStorage.getItem('jwt');
      if(token){
        this.getUser();
        this.token = token;
      }
      else this.token = '';
    },
    logout(){
      localStorage.removeItem('jwt');
      this.getToken()
    },
    getUser(){
      let decoded = VueJwtDecode.decode(localStorage.getItem('jwt'));
      if(decoded.exp < Date.now()/1000) this.$router.push('/Login');
      this.user = decoded;
    }
  }
}

</script>

<style>

  .nav{
    display: flex;
    justify-content: center;
    background-color: lightskyblue;
    font-size: x-large;
  }

  .LogoSite{
    width: 150px;
    display: flex;
    margin: 30px;
  }

  .NavSup{
    display: flex;
    background-color: lightskyblue;
    justify-content: space-between;
  }

  .textSup{
    display: flex;
    margin: 30px;
  }

  .ntm{
    display: flex;
    background-color: lightskyblue;
    justify-content: space-between;
    position: sticky;
    top: 0;
    flex-direction: column;
  }

</style>