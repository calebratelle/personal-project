//  This whole file is so we can setup the tables in our database using sequelize

import { DataTypes, Model} from 'sequelize';
import url from 'url';
import util from 'util'
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///personal-project')

//models

class User extends Model {}
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        hashedPass: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
},
{
    modelName: 'user',
    sequelize: db
}
)

class Lesson extends Model {}
Lesson.init(
    {
        lessonId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lessonName: {
            type: DataTypes.STRING
        },
        lessonContent: {
            type: DataTypes.STRING
        }
},
{
    modelName: 'lesson',
    sequelize: db
}
)

class Journal extends Model {}
Journal.init(
    {
        journalId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        promptId: {
            type: DataTypes.INTEGER
        },
        journalEntry: {
            type: DataTypes.STRING(10000)
        }
},
{
    modelName: 'journal',
    sequelize: db
}
)

class LessonPart extends Model {}
LessonPart.init(
    {
        lessonPartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        partContent: {
            type: DataTypes.STRING(2500)
        },
        lessonId: {
            type: DataTypes.INTEGER
        }
},
{
    modelName: 'lesson_part',
    sequelize: db
}
)

class Prompt extends Model {}
Prompt.init(
    {
        promptId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prompt: {
            type: DataTypes.STRING(1000)
        },
        lessonPartId: {
            type: DataTypes.INTEGER
        }
},
{
    modelName: 'prompt',
    sequelize: db
}
)



//association methods (relationships, foreign keys, etc)

User.hasMany(Journal)
Journal.belongsTo(User)

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {  //we don't totally know what this does, but it's boilerplate
    console.log("Syncing database...")
    await db.sync()
    console.log("Finished syncing database!")
}


//export models 
export {User, Lesson, Journal, LessonPart, Prompt}
