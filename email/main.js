import nodemailer from 'nodemailer'
import google from 'GoogleApis'
import config from './config.js'
const OAuth2 = google.Auth.OAuth2Client

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials( {refresh_token : config.refreshToken} )

function send_mail(name, target){
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
    from: 'TEST',
    to: target,
    subject: 'test objet',
    html: get_html_message(name)
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

function get_html_message(name){
  return 'this is a test message'
}

send_mail('test',"elvin.aupiais-berthy@efrei.net")