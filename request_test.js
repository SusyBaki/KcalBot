const query = "penis"
const reqUrl = `https://e621.net/posts.json?limit=1&tags=order:random ${query}`;

let headers = new Headers({
  //"Accept"       : "application/json",
  //"Content-Type" : "application/json",
  "User-Agent"   : `Node ${process.version} @ ${process.platform}`
});


async function Rquest() {
  await fetch(reqUrl, {
    method : "GET",
    headers : headers
  }).then(function(response){
    return response.json();
  }).then(function(response){
    A = JSON.stringify(response)
    B = JSON.parse(A)
    console.log(response.json)
  });
  
}
Rquest();

/*
axios({
  method: "GET",
  url: reqUrl,
  responseType: "json"
  }).then(res => {
    console.log(res.data);
});
*/