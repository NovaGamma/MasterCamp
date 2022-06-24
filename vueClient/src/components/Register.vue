<template>

  <div class="container3">

    <div class="login" style="top:7%;">

      <img class="LogoSite" style="margin:10px;" src="../assets/mmmmh.jpg"/>
      <h1 style="text-align:left; padding-left:10px;">Inscription</h1>
      <input class="input" placeholder=" Numéro d'électeur" v-model="nbElecteur" type="nbElecteur">
      <input class="input" placeholder=" Numéro de carte d'identité" v-model="nbIdentite" type="nbIdentite">
      <input class="input" placeholder=" E-mail" v-model="email" type="email">
      <input class="input" placeholder=" Mot de passe" v-model="password" type="password">
      <input class="input" placeholder=" Confirmez le mot de passe" v-model="Password" type="Password">
      <router-link class="toRegister" to="/Login">Vous avez déjà un compte ? Connectez-vous ici !</router-link>
      <button class="button3" @click="register">S'inscrire</button>

    </div>

  </div>


</template>
<script>

export default {
  name: 'Register',
  data(){
    return {
      email:'',
      password:'',
      Password: '',
      nbElecteur: '',
      nbIdentite: ''
    }
  },
  methods:{
    register(){

      fetch("http://localhost:5000/auth/register",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:this.email, password:this.password, fullName:this.name})
      })
    },
    formSubmitted() {
      this.myErrors = [];
      !this.email ? this.myErrors.push("nul") : null;
      !this.nbElecteur ? this.myErrors.push("elec") : null;
      !this.nbIdentite ? this.myErrors.push("elec") : null;
      !this.password ? this.myErrors.push("pass") : null;
      !this.Password ? this.myErrors.push("Pass") : null;
      this.password != this.Password ? this.myErrors.push("bruh") : null;
      if (!this.myErrors.length) {
        this.register();
      }
    },
  }
}
</script>
