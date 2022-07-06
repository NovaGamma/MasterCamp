<template>
  <NavBar/>
  <section v-if="!user.hasVoted" class="container">
      <Voter class="ListeCandidatVote" v-for="(voter,index) in list_candidats" :key="index" :voter="voter"/>
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
export default {
  name: "PageVoter",
  components: {NavBar, Voter},
  data(){
    return {
      indexCandidat: 0,
      list_candidats: [],
      user: {type:Object}
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