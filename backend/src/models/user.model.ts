import { v4 as uuidv4 } from 'uuid'
import { User } from '../type/user'
import bcrypt from 'bcrypt'

class UserModel {
    private users: User[] = [
        { id: uuidv4(), username: 'jay', password: 'eee', firstname: 'jay', lastname: 'ko' },
        { id: uuidv4(), username: 'may', password: 'ree', firstname: 'may', lastname: 'ho' }
    ]

    findAll() {
        return this.users
    }

    findById(id: string) {
        const user = this.users.find(u => u.id === id)
        if (!user) return null
        return user
    }

    findByUsername(username: string) {
        const user = this.users.find(u => u.username === username)
        if (!username) return null
        return user
    }

    async creatUser(newUser: Omit<User, 'id'>) {
        const { username, password, firstname, lastname } = newUser
        const foundIndex = this.users.findIndex(u => u.username === username)
        if (foundIndex !== -1) return false
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            firstname,
            lastname
        }
        this.users.push(user)
        return user
    }

    async logIn(username: string, password: string) {
        const user = this.users.find(u => u.username === username)

        if (!user) return false
        const isMatch: boolean = await bcrypt.compare(password, user.password)

        if (!isMatch) return false
        return user
    }

}

export default new UserModel
