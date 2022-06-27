<template>
  <NavBar/>
  <section class="container">

    <div>
      <Voter class="ListeCandidatVote" v-for="(voter,index) in list_candidats" :key="index" :voter="voter"/>
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


</style>