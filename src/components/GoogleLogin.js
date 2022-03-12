import axios from 'axios';
import React from 'react';

export default class GoogleLogin extends React.Component{

  // state = {
  //   persons: []
  // }

    
    render() {
      const response = ""
      const googleLogin = async () => {
      //   var xhttp = new XMLHttpRequest();
      //   XMLHttpRequest.onreadystatechange = function (){
      //     if (this.readyState == 4 && this.status == 200)
      //     console.log("error")
      //   }
      
      // xhttp.open('GET', 'https://cors-anywhere.herokuapp.com/https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Felice-kdt-ai-3rd-team12.koreacentral.cloudapp.azure.com%3A5000%2Fapi%2Fgoogle%2Fgoogle%2Fcallback%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&flowName=GeneralOAuthFlow', true);
      // xhttp.send();
      try {
        const response = await axios.get(
          //'https://cors-anywhere.herokuapp.com/http://elice-kdt-ai-3rd-team12.koreacentral.cloudapp.azure.com/api/google/google/social_login/',
          'http://elice-kdt-ai-3rd-team12.koreacentral.cloudapp.azure.com/api/google/google/social_login/',
          //'https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000/api/google/google/social_login/'
          //'https://cors-anywhere.herokuapp.com/https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fgoogle%2Fgoogle%2Fcallback%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&flowName=GeneralOAuthFlow'
          //'https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fgoogle%2Fgoogle%2Fcallback%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&flowName=GeneralOAuthFlow'
          );
        console.log(response.data);
        // const token = data['token'];
    
        return response;
      } catch (error) {
        // alert('아이디와 비밀번호를 확인해주세요.');
        
        return false;
      }
    };
      
      return (
        <div>
          <button  onClick={googleLogin}>버튼</button>
          <div>
          {response}
        </div>
        </div>
        
      )
    }
  }

