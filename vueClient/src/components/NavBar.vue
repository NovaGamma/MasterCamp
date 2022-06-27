<template>


  <audio autoplay loop>

    <source src="../assets/Crab.mp3#t=00:01:13" type="audio/mpeg">

  </audio>

  <div class="ntm">

    <div class="NavSup">
      <img class="LogoSite" src="../assets/mmmmh.jpg">
      <h3><router-link class="textSup" to="/ProfilElecteur">Profil d'électeur</router-link></h3>
    </div>

    <div class="nav" id="nav">

      <div v-if="!token">
        <router-link style="padding-right:100px;" to="/PageCandidat">Candidats</router-link>
        <router-link class="route" to="/PageVoter">Voter</router-link>
        <router-link style="padding-left:100px;" to="/Apropos">A propos</router-link>
      </div>

      <div v-else>
        <router-link v-if="user.fullName != 'Admin'" to="/AddComment">Add Comment</router-link>
        <router-link v-else to="/Admin">Admin vue</router-link>
        {{user.fullName}} |
        <button @click="logout">Log Out</button>
      </div>

    </div>

  </div>

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
    background-color: rgb(128,179,255);
    font-size: x-large;
    border-top: solid 1px azure;
    color: white;
  }

  .route{
    border-left: solid 1px azure;
    border-right: solid 1px azure;
    padding: 20px 100px 20px 100px;
  }

  .LogoSite{
    width: 150px;
    display: flex;
    margin: 30px;
  }

  .NavSup{
    display: flex;
    background-color: rgb(128,179,255);
    justify-content: space-between;
    color: white;
  }

  .textSup{
    display: flex;
    margin: 30px;
    font-size: xx-large;
    color: white;
    text-decoration: none;
  }

  .textSup:active{
    color: blue;
  }

  .ntm{
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    flex-direction: column;
    box-shadow: 5px 5px 5px darkgrey;
  }


</style>