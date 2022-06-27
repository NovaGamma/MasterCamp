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
export default {
  name: "PageVoter",
  components: {NavBar, Voter},
  

  data(){
    return {
      indexCandidat: 0,
      list_candidats: [
        {
          nom : "Saltbae",
          parti : "Salt",
        },
        {
          nom : "Johnny",
          parti : "Salt",
        },
        {
          nom : "Michel",
          parti : "Salt",
        },
        {
          nom : "Kylian",
          parti : "Salt",
        },
        {
          nom : "Zidane",
          parti : "Salt",
        },
      ],
    }
  },
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