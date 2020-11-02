const axios = require("axios")

today = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];

async function Requests() {

    var firstResponse = await axios.get("https://clist.by/api/v1/json/contest/?limit=5000&resource__id__in=1%2C2%2C73%2C102%2C35%2C63&start__gte=2020-05-01T00%3A00%3A00&username=Ssomya&api_key=c951303aa1d1a71d9baab5d7570a79d9f35de3a0");
    var secondResponse = await axios.get("https://clist.by/api/v1/json/contest/?limit=2000&resource__name=topcoder.com&event__regex=(%3F%3ASRM%20%5B0-9%5D%5B0-9%5D%5B0-9%5D%7CTCO%5B0-9%5D%5B0-9%5D%20Round%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Algo%20%5B0-9%5D%7CTCO%5B0-9%5D%5B0-9%5D%20Semifinal%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Semi%20%5B0-9%5D%7CTCO%2020%5B0-9%5D%5B0-9%5D%20Semifinal%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Semifinal%7CTCO%5B0-9%5D%5B0-9%5D%20Final%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Final%7CTCO%2020%5B0-9%5D%5B0-9%5D%20Final%7CTCO%5B0-9%5D%5B0-9%5D%20Championship%20Round)&start__gte=2020-07-01T00%3A00%3A00&username=Ssomya&api_key=c951303aa1d1a71d9baab5d7570a79d9f35de3a0");

    console.log("ONG REQUESTS FUNCTION");
    console.log(today);
    const ongoingArr1 = firstResponse.data.objects.filter(obj => {
        if(obj.start <= today && obj.end > today) return true
        return false
    })   
    const ongoingArr2 = secondResponse.data.objects.filter(obj => {
        if(obj.start <= today && obj.end > today) return true
        return false
    })
    // console.log(ongoingArr1);
    // console.log(ongoingArr2);
    var Ong = [];
    var apiResult = Ong.concat(ongoingArr1,ongoingArr2);
    // console.log(apiResult);
    return (apiResult)
} // end of REQUESTS FUNCTION

module.exports = Requests