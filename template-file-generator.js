const { readdir, lstat, copyFile } = require('fs').promises
const path = require('path')

const ignore = ['template-file-generator.js', '.git', 'node_modules', '.env', '.gitignore']

async function findFiles(dir, oldDir = '') {
    let files = []
    let dirFiles = await readdir(dir)

    for (let i = 0; i < dirFiles.length; i++) {
        const file = dirFiles[i]

        if (ignore.includes(file)) continue

        if (!(await lstat(path.join(dir, file))).isDirectory()){
            files.push(`${oldDir}${oldDir ? '/' : ''}${file}`)
            continue
        }

        files = files.concat(await findFiles(path.join(dir, file), file))
    }

    return files
}

findFiles(__dirname).then((files) => {
    console.log(files)
    files.forEach(file => {
        console.log(path.join(__dirname, file))
        copyFile(path.join(__dirname, file), path.join('../test', file), (err) => {
            if (err) throw err;
            console.log('Template file generator copied to template-file-generator.js');
        })
    })
})


/*
async function findFiles(dir) {
    let files = []
    let dirFiles = await readdir(dir)

    dirFiles = dirFiles.filter(file => {
        if (ignore.includes(file)) return
        if (!lstatSync(path.join(dir, file)).isDirectory()) files.push(file)
        else return true
    })

    await Promise.all(dirFiles.map(async newDir => files = files.concat(await findFiles(path.join(dir, newDir)))))
    
    return files
}*/


/*
fs.readdir(__dirname, async (err, files) => {
    if (err)
      console.log(err);
    else {
        files.forEach(file => {
            if (ignore.includes(file)) return
            fs.copyFile(path.join(__dirname, file), path.join('../test', file), (err) => {
                if (err) throw err;
                console.log('Template file generator copied to template-file-generator.js');
            })
        })
    }
})*/
/*
;(async () => {
    console.time('time')
    await findFiles(__dirname)
    await findFiles(__dirname)
    await findFiles(__dirname)
    await findFiles(__dirname)
    console.timeEnd('time')
})()*/
/*

;(async () => {
    console.time('timePromise')
    await Promise.all([
        findFiles(__dirname),
        findFiles(__dirname),
        findFiles(__dirname),
        findFiles(__dirname)
    ])
    console.timeEnd('timePromise')
})()

*/