<template>

  <NavBar/>

  <section class="container">

    <div class="flex" v-if="!showCandidat">
      <Candidat class="ListeCandidat" v-for="(candidat,index) in list_candidats" :key="index" :candidat="candidat" :img="list_images[index]" v-on:click="showCandidate(index)"/>
    </div>

    <div v-else>
      <button class="retour" v-on:click="showCandidat=false">Retour</button>
      <ProfilCandidat class="Profil"  :candidat="list_candidats[indexCandidat]" :img="list_images[indexCandidat]"/>
    </div>

  </section>

</template>

<script>
import Candidat from "./Candidat";
import ProfilCandidat from "./ProfilCandidat";
import NavBar from "./NavBar";
import VueJwtDecode from "vue-jwt-decode";

import c1 from "../assets/sbCandidat.png";
import p1 from "../assets/sbParti.png";

import c2 from "../assets/lbCandidat.png";
import p2 from "../assets/lbParti.png";

import c3 from "../assets/emCandidat.png";
import p3 from "../assets/emParti.png";

import c4 from "../assets/lxCandidat.png";
import p4 from "../assets/lxParti.png";

import c5 from "../assets/tcCandidat.png";
import p5 from "../assets/tcParti.png";

export default {
  name: "PageCandidat",
  components: {NavBar, ProfilCandidat, Candidat},
  data(){
    return {
      indexCandidat: 0,
      showCandidat: false,
      list_candidats: [],
      list_images: [
        {
          candidat: c1,
          parti: p1
        },
        {
          candidat: c2,
          parti: p2
        },
        {
          candidat: c3,
          parti: p3
        },
        {
          candidat: c4,
          parti: p4
        },
        {
          candidat: c5,
          parti: p5
        }
      ]
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

.flex{
  width: 55%;
}

.ListeCandidat{
  display: flex;
  background-color: white;
  margin: 15px;
  align-items: center;
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
  margin-top: 15px;
  margin-left: 20%;
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