<template>
  <NavBar/>
  <section v-if="!user.hasVoted" class="container">
      <Voter class="ListeCandidatVote" v-for="(voter,index) in list_candidats" :key="index" :voter="voter" :img="list_images[index]"/>
  </section>
  <section v-else class="containerValid">
    <div class="textValid">
      <h3 class="DescValid">Vous avez déjà voté pour le vote en cours.</h3>
    </div>
  </section>

</template>

<script>
import Voter from "./Voter";
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
  name: "PageVoter",
  components: {NavBar, Voter},
  data(){
    return {
      indexCandidat: 0,
      list_candidats: [],
      user: {type:Object},
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
    }
  }
}


</script>

<style>

*{
  margin: 0px;
}

.ListeCandidatVote{
  display: flex;
  background-color: white;
  margin: 15px;
  align-items: center;
  box-shadow: 0px 0px 5px 5px lightgrey;
  border: none;
  word-wrap: normal;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.containerValid{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #F2F2F2;
}

.textValid{
  display: flex;
  margin-top: 7%;
  background-color: white;
  width: 40%;
  height: 500px;
  justify-content: center;
  box-shadow: 0px 0px 10px 3px darkgrey;
  border-radius: 40px;
}

.DescValid{
  margin: 10%;
  font-family: Arial;
  font-size: x-large;
  align-self: center;
}

</style>