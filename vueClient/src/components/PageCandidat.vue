<template>
  <NavBar/>
  <section class="container">

    <div v-if="!showCandidat">
      <Candidat class="ListeCandidat" v-for="(candidat,index) in list_candidats" :key="index" :candidat="candidat" v-on:click="showCandidate(index)"/>
    </div>

    <div v-else>
      <button class="retour" v-on:click="showCandidat=false">Retour</button>
      <ProfilCandidat class="Profil"  :candidat="list_candidats[indexCandidat]"/>
    </div>

  </section>

</template>

<script>
import Candidat from "./Candidat";
import ProfilCandidat from "./ProfilCandidat";
import NavBar from "./NavBar";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "PageCandidat",
  components: {NavBar, ProfilCandidat, Candidat},
  data(){
    return {
      indexCandidat: 0,
      showCandidat: false,
      list_candidats: [],
    }
  },
  async mounted(){
    this.getUser();
    await this.getCandidats();
  },
  methods:{
    showCandidate(index){
      this.showCandidat=!this.showCandidat;
      this.indexCandidat=index;
    },
    getUser(){
      if(localStorage.jwt == undefined) return false;
      let decoded = VueJwtDecode.decode(localStorage.getItem('jwt'));
      if(decoded.exp < Date.now()/1000) this.$router.push('/Login');
      this.user = decoded;
      console.log(this.user);
    },
    async getCandidats(){
      let res = await fetch("http://127.0.0.1:5000/candidat/find",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          communeID:this.user.communeID})
      })
      let data = await res.json();
      this.list_candidats = data;
      console.log(this.list_candidats);
    }
  },

  
}


</script>

<style>

*{
  margin: 0px;
}

.ListeCandidat{
  display: flex;
  background-color: white;
  margin: 15px;
  align-items: center;
  width: 1200px;
  box-shadow: 0px 0px 5px 5px lightgrey;
  border: none;
  word-wrap: normal;
}

.Profil{
  display: flex;
  background-color: white;
  justify-content: center;
  margin: 20px;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.ListeCandidat:hover{
  background-color: lightgrey;
}

.ListeCandidat:active{
  background-color: grey;
}

.retour{
  margin: 10px;
  display: flex;
  border: solid whitesmoke;
  width: 100px;
  height: 30px;
  justify-content: center;
  font-size: large;
  background-color: white;
  box-shadow: 4px 4px 4px darkgrey;
}

.retour:hover{
  background-color: lightgrey;
  border: solid lightgrey;
}

.retour:active{
  background-color: darkgrey;
  border: solid darkgrey;
}

</style>