<template>


  <div class="ntm">

    <div class="NavSup">
      <img class="LogoSite" src="../assets/LogoSite1.png">
      <h1 style="align-self: center; margin-left: 5%;">Votons tous !</h1>
      <h3 style="">
        <router-link class="textSup" to="/ProfilElecteur">Profil d'électeur</router-link>
        <button class="logOut" @click="logout">Déconnexion</button>
      </h3>

    </div>

    <div class="nav" id="nav">

      <div>
        <router-link style="padding-right:100px;" to="/">Candidats</router-link>
        <router-link class="route" to="/PageVoter">Voter</router-link>
        <router-link style="padding-left:100px;" to="/Apropos">A propos</router-link>

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
      this.$router.push('/Login')
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

  .logOut{

    justify-content: center;
    font-size: x-large;
    border:none;
    border-radius: 6px;
    background-color: rgb(128,179,255);
    color:white;
  }

  .logOut:hover{
    background-color: rgb(23, 104, 241);
  }

  .logOut:active{
    background-color: rgb(0, 60, 255);
  }

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

    padding: 20px 100px 21px 100px;
  }

  .LogoSite{
    width: 150px;
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
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
    align-self: center;
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
    box-shadow: 0px 5px 5px darkgrey;
  }


</style>