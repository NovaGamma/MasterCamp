<template>

  <NavBar/>

  <section class="container4">

    <div class="Apropos">

      <div class="Header">
        <img style="width: 200px;"  src="../assets/LogoSite2.png"/>
        <h1 class="title">A propos</h1>
      </div>

      <div>
        <h3 class="textPropos">Ce site a pour objectif de répondre à l'appel d'offre d'un site de vote à distance.</h3>
        <h3>Nous sommes une équipe constituée d'étudiants à Efrei Paris.  </h3><br><br>
        <h3>Pour toute information, contactez-nous à l'adresse mail suivante :<br> thomas.casasnovas@efrei.net</h3>
      </div>

    </div>

  </section>

</template>

<script>
import NavBar from "./NavBar";
export default {
  name: "Apropos",
  components: {NavBar}
}
</script>

<style>

.container4{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.Header{
  display: flex;
  justify-content: space-evenly;
}

.Apropos{
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 60%;
  height: 700px;
  box-shadow: 0px 0px 7px 5px lightgrey;
}

.title{
  font-weight: bold;
  font-size: xxx-large;
  padding-bottom: 100px;
  padding-top: 8%;
}

.textPropos{
  display: block;
  margin-top: 10%;

}

</style>