<template>


  <div class="container3">

    <div class="login">

      <img class="LogoSite" style="margin:10px;" src="../assets/mmmmh.jpg"/>
      <h1 style="text-align:left; padding-left:10px; padding-top: 15px; padding-bottom: 15px;">Connexion</h1>
      <input class="input" placeholder=" Numéro d'électeur" v-model="nbElecteur" type="nbElecteur">
      <input class="input" placeholder=" E-mail" v-model="email" type="email">
      <input class="input" placeholder=" Mot de passe" v-model="password" type="password">
      <router-link class="toRegister" to="/Register">Vous n'avez pas de compte ? Inscrivez-vous ici !</router-link>
      <button class="button3" @click="login">Connexion</button>

    </div>

  </div>

</template>
<script>

export default {
  name: 'Login',
  data(){
    return {
      email:'',
      password:'',
      nbElecteur: '',
      myErrors:[],
    }
  },
  methods:{
    login(){
      fetch("http://localhost:5000/auth/login",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:this.email, password:this.password,  voterID:this.nbElecteur})
      })
      .then(response => response.json())
      .then(data => {
        if(data.token){
          localStorage.setItem('jwt', data.token);
          this.emitter.emit("token_update")
          this.$router.push("/");
        }
        else{
          alert(data.message);
        }
      });
    },

    formSubmitted() {
      this.myErrors = [];
      !this.email ? this.myErrors.push("nul") : null;
      !this.nbElecteur ? this.myErrors.push("elec") : null;
      !this.password ? this.myErrors.push("pass") : null;
      if (!this.myErrors.length) {
        this.login();
      }
    },
  }
}
</script>

<style>

body{
  background-image:url("../assets/giphy.gif");
}

.login{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 500px;
  background-color: white;
  box-shadow: 0px 0px 10px 3px darkgrey;
  border-radius: 15px;
  padding: 35px;
  margin: 30px;
  top: 15%;
  position: absolute;
}

.input{
  font-size: x-large;
  border-radius: 10px;
  border: none;
  box-shadow: inset 0px 0px 10px 3px lightgrey;
  padding: 10px;
}

.toRegister{
  text-align: left;
  padding: 10px;
  text-decoration: none;
}

.toRegister:hover{
  text-decoration: underline;
}

.toRegister:active{
  color: orange;
}

.container3{

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.button3{
  border: none;
  background-color: lightskyblue;
  height: 50px;
  width: 300px;
  font-size: x-large;
  border-radius: 15px;
  align-self: center;
  margin-top: 15px;
}

.button3:hover{
  background-color: deepskyblue;
}

.button3:active{
  background-color: dodgerblue;
}

</style>