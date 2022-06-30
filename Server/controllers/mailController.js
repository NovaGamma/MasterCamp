import nodemailer from 'nodemailer'
import google from 'GoogleApis'
const OAuth2 = google.Auth.OAuth2Client

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token : config.refreshToken})

var send_mail = (user, subject, html) => {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken
    }
  })

  const mail_options = {
    from: 'Votons Tous',
    to: user.email,
    subject: subject,
    html: html
  }

  transport.sendMail(mail_options, function(error, result){
    if(error){
      console.log('Error ', error)
    } else {
      console.log('Success ', result)
    }
    transport.close()
  })
}

var get_html_vote = (user) => {
    return `Bonjour ${user.fullName},
        Pour voter veuillez utiliser ce code :
        <b>${user.code}</b>
    `
}

var get_html_validation = (user) => {
    return `Bonjour ${user.fullName},
        Votre compte Votons-Tous a été activé par votre mairie.
        Vous pouvez désormais vous connecter sur le site en utilisant les identifiants renseignés durant l'inscription.

        Toute l'équipe de Votons-Tous
    `
}

export {send_mail, get_html_validation, get_html_vote}