<template>
  <section class="container2">

    <div class="head">
      <img class="CandidatPic" src="../assets/saltbae.png" >

      <div class="Headline">
        <h1 style="font-size: xxx-large; font-weight: bold;">{{ candidat.name }}</h1>
        <h3>Parti : {{ candidat.parti }}</h3>
      </div>
      <img class="LogoParti" src="../assets/stonks.png" >

    </div>

    <div class="Infos">
      <h3 class="SousTitre">Programme :<br><br></h3>
      <p>{{ candidat.description }}</p>
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