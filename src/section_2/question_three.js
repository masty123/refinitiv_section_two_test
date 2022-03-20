
const axios = require('axios');
const cheerio = require('cheerio')

axios.get('https://codequiz.azurewebsites.net/',

{
    headers: {
      'Cookie': "hasCookie=true",
      'Accept': "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  }
).then(res => {
    // const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    const result = res.data;
    const $ = cheerio.load(result);
    var json_arr = [];
    $("body > table > tbody > tr").each((index, element) => {
        if(index > 0){
            json_arr.push({
                fund_name:  $($(element).find("td")[0]).text(),
                nav:        $($(element).find("td")[1]).text(),
                offer:      $($(element).find("td")[2]).text(),
                change:     $($(element).find("td")[3]).text(),
            })
        }
        //   console.log($(element).text());
    });

    const argument = process.argv.slice(2);
    // console.log(argument[0]);
    var final_result = json_arr.filter((item) => item.fund_name.toLowerCase() === argument[0].toLowerCase());
    if(final_result.length > 0){
        console.log(`Nav: ${final_result[0].nav}`);
    }else {
       console.log("No result.");
    }


  })
  .catch(err => {
    console.log('Error: ', err.message);
  });




