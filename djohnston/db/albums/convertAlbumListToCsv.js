const fs = require('fs');

const allFileContents = fs.readFileSync('albums.txt', 'utf-8');
const content = allFileContents.split(/\r?\n/).reduce((acc, curr, idx) =>  {
    //"1","1990","1988-04-08 00:57:24","Lee Renaldo, Steve Shelley, Kramer","1990",
    const id = idx + 1;
    const name = curr.split(' (')[0].replace(/[":]/g,``)
    const date = `${curr.match(/\d{4}/)[0]}-01-01 00:00:00`
    const featuring = ""
    const permalink = name.toLowerCase().replace(/[\s',!\/?]/g,'-')
    
    return [...acc, [id,name,date,featuring,permalink].map(v => `"${v}"`).join(',')]
}, ['"id","name","released","featuring","permalink"']);

fs.writeFile('testdata.csv', content.join('\n'), function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });