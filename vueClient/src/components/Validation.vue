<template>
  <section class="containerValid">

    <div class="textValid">
      <h3 class="DescValid">Votre compte est en attente de validation par la mairie de votre commune.<br><br>
        Vous pourrez ensuite vous connecter lorsque celui-ci sera validé</h3>
    </div>


  </section>
</template>

<script>
export default {
  name: "Validation"
}
</script>

<style scoped>

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