const fs = require('fs')
const Papa = require('papaparse')

const readCSV = async (filePath) => {
    const csvFile = fs.readFileSync(filePath)
    const csvData = csvFile.toString()  
    return new Promise(resolve => {
      Papa.parse(csvData, {
        header: true,
        complete: results => {
          console.log('Complete', results.data.length, 'records.'); 
          resolve(results.data);
        }
      });
    });
  };
  
  const test = async () => {
    let parsedData = await readCSV('./tracks.csv');
    parsedData.forEach(p => {
        console.log(p.permalink)
    })
  }
  
  test()

let content = '"id","title","album","track","permalink"'
let idx = 0

fs.readdirSync('./', { withFileTypes: true })
  .filter((f) => f.isDirectory())
  .forEach((folder) => {
      //Read files inside folder
    fs.readdirSync(`./${folder.name}/`, { withFileTypes: true })
      .filter((file) => !file.isDirectory())
      .forEach((item) => {
        if (item.name.indexOf('txt') === -1) return
        //item.name
        const allFileContents = fs.readFileSync(`./${folder.name}/${item.name}`, 'utf-8')
        content += allFileContents
          .split(/\r?\n/)
          .reduce(
            (acc, curr) => {
              //"1","Grievances","1","1"
              // Check if usable line
              //| title1 = Grievances
              if (curr.indexOf('title') === -1) return acc
              const cleanup = curr.substring(
                curr.indexOf('title') + 'title'.length,
                curr.length,
              )
              const id = idx + 1
              if (!cleanup.split('= ')[1]) return acc
              const title = cleanup.split('= ')[1].replace(/[\]\[]/g, '')

              if (title === '') return acc

              const album = item.name.split('.txt')[0]
              const track = cleanup.split(' ')[0]
              const permalink = title
                .toLowerCase()
                .replace(/[\s',!\/?\+]/g, '-')
                .replace(/(-)(?=\1)/gi, '')
                .replace('&', 'and')
                .replace(/[\(\)]/g, '')
              idx++

              return [
                ...acc,
                [id, title, album, track, permalink]
                  .map((v) => `"${v}"`)
                  .join(','),
              ]
            },
            [''],
          )
          .join('\n')
      })
  })

fs.writeFile('testdata.csv', content, function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)
})
