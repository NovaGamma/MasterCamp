<template>
  <div style="background-color: #F2F2F2">
    <section class="container2">

      <div class="head">
        <img class="CandidatPic" :src="img.candidat" >

        <div class="Headline">
          <h1 style="font-size: xx-large; font-weight: bold;">{{ candidat.name }}</h1>
          <h3>Parti : {{ candidat.parti }}</h3>
        </div>
        <img class="LogoParti" :src="img.parti" >

      </div>

      <div class="Infos">
        <h3 class="SousTitre">Programme :<br><br></h3>
        <p>{{ candidat.description }}</p>
        <br>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProfilCandidat",
  props:{
    candidat: {
      name: String,
      parti: String,
      description: String
    },
    img: {
      candidat: String,
      parti: String
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
  font-size: x-large;
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