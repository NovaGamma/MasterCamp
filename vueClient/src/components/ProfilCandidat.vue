<template>
  <section class="container2">

    <div class="head">
      <img class="CandidatPic" src="../assets/saltbae.png" >

      <div class="Headline">
        <h1>Nom : {{ candidat.nom }}</h1>
        <h2>Parti : {{ candidat.parti }}</h2>
      </div>
      <img class="LogoParti" src="../assets/stonks.png" >

    </div>

    <div class="Infos">
      <h3 class="Programme">Programme : {{ candidat.programme }} </h3>
      <br>
      <h3>Membres du parti : </h3>
      <h3 >{{candidat.liste}}</h3>
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
      liste: DOMStringList,
    }

  },
}
</script>

<style>

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