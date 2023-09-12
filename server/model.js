import { DataTypes, Model} from 'sequelize';
import url from 'url';
import util from 'util'
import connectToDB from './db';

const db = await connectToDB('postgresql:///personal-project')



//models

//association methods (relationships, foreign keys, etc)

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {  //we don't totally know what this does, but it's boilerplate
    console.log("Syncing database...")
    await db.sync()
    console.log("Finished syncing database!")
}


//export models 