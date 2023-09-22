import {User} from '../model.js'
import bcrypt from 'bcryptjs'

export default {
    register: async(req, res) => {
        console.log('register')
    },
    login: async(req, res) => {
        console.log('login')
    },
    checkUser: async(req, res) => {
        console.log('checkUser')
    },
    logout: async(req, res) => {
        console.log('logout')
    }
}