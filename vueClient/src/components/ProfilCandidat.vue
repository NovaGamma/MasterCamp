<template>
  <section class="container2">

    <div class="head">
      <img class="CandidatPic" src="../assets/saltbae.png" >

      <div class="Headline">
        <h1 style="font-size: xxx-large; font-weight: bold;">{{ candidat.nom }}</h1>
        <h3>Parti : {{ candidat.parti }}</h3>
      </div>
      <img class="LogoParti" src="../assets/stonks.png" >

    </div>

    <div class="Infos">
<<<<<<< HEAD
      <h3 class="SousTitre">Programme :<br><br></h3>
      <p>{{ candidat.programme }}</p>
      <br><br>
      <h3 class="SousTitre">Membres du parti : <br><br></h3>
      <h3> <span v-for="membre in candidat.membres" :key="membre">- {{membre}}<br></span></h3>
=======
      <h3 class="Programme">Programme : {{ candidat.programme }} </h3>
      <br>
      <h3>Membres du parti : </h3>
      <h3 >{{candidat.liste}}</h3>
>>>>>>> parent of 51bef75 (update)
    </div>

  </section>

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
  width: 200px;
  margin: 10px;
}

.LogoParti{
  width: 200px;
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
  width: 1000px;
  flex-wrap: wrap;
  box-shadow: 0px 0px 7px 5px lightgrey;
}

.Infos{
  margin: 20px;
  text-align: left;
}

</style>