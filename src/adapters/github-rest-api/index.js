import axios from 'axios';

function getAxiosInstance(){
 return axios.create();
}
const headers = {
    'Accept': 'application/vnd.github.mercy-preview+json'
}
export function getFromGithubApi(url){
const axios = getAxiosInstance();
return axios.get(url,{headers:headers});
}