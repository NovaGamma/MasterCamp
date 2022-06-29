<template>
  <div style="background-color: #F2F2F2">
    <section class="container2">

      <div class="head">
        <img class="CandidatPic" src="../assets/HolderCandidat.png" >

        <div class="Headline">
          <h1 style="font-size: xxx-large; font-weight: bold;">{{ candidat.nom }}</h1>
          <h3>Parti : {{ candidat.parti }}</h3>
        </div>
        <img class="LogoParti" src="../assets/HolderParti.png" >

      </div>

      <div class="Infos">
        <h3 class="SousTitre">Programme :<br><br></h3>
        <p>{{ candidat.programme }}</p>
        <br><br>
        <h3 class="SousTitre">Membres du parti : <br><br></h3>
        <h3> <span v-for="membre in candidat.membres" :key="membre">- {{membre}}<br></span></h3>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProfilCandidat",
  props:{
    candidat: {
      nom: String,
      parti: String,
      programme: String,
      membres: {
        type: Array,
        default: () => []
      }
    }

  },
}
</script>

<style>

.SousTitre{
  font-weight: bold;
  font-size: x-large;
}

.CandidatPic{
  width: 20%;
  margin: 10px;
}

.LogoParti{
  width: 20%;
  margin: 10px;
}

.Headline{
  font-size: xx-large;
}

.head{
  display: flex;
  justify-content: space-between;
  margin: 20px;
  flex-wrap: wrap;
}

.container2{
  display: flex;
  flex-direction: column;
  width: 60%;
  flex-wrap: wrap;
  box-shadow: 0px 0px 7px 5px lightgrey;
}

.Infos{
  margin: 20px;
  text-align: left;
}

</style>