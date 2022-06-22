<template>
  <section class="container">
    <div v-if="!showCandidat">
      <Candidat class="ListeCandidat" v-for="(candidat,index) in list_candidats" :key="index" :candidat="candidat" v-on:click="showCandidate(index)"/>
    </div>
    <div class="Profil" v-else>
      <ProfilCandidat  :candidat="list_candidats[indexCandidat]"/>
    </div>
  </section>
</template>

<script>
import Candidat from "./Candidat";
import ProfilCandidat from "./ProfilCandidat";
export default {
  name: "PageCandidat",
  components: {ProfilCandidat, Candidat},
  methods:{
    showCandidate(index){
      this.showCandidat=!this.showCandidat;
      this.indexCandidat=index;
    }
  },

  data(){
    return {
      indexCandidat: 0,
      showCandidat: false,
      list_candidats: [
        {
          nom : "Saltbae",
          parti : "Salt",
          programme: "SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
        },
        {
          nom : "Johnny",
          parti : "Salt",
          programme: "Bae",
        },
        {
          nom : "Michel",
          parti : "Salt",
          programme: "Bae",
        },
        {
          nom : "Kylian",
          parti : "Salt",
          programme: "Bae",
        },
        {
          nom : "Zidane",
          parti : "Salt",
          programme: "Bae",
        },
      ],
    }
  },
}


</script>

<style>

.ListeCandidat{
  display: flex;
  background-color: white;
  margin: 15px;
  align-items: center;
  width: 1200px;
  box-shadow: 4px 4px 4px black;
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
  background-color: #ffe4c4;
  justify-content: center;
}


.ListeCandidat:hover{
  background-color: lightgrey;
}

</style>