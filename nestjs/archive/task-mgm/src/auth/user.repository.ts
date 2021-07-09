import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authCredentialDto: AuthCredentialDto):Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.salt  =  await bcrypt.genSalt();
        user.password = await user.hashPassword(password)
      
        // Dummy just for testing.
        user.emailAddress = password+user.salt ;

        try{
            console.log(`User password ${user.password} & ${user.emailAddress}`)
        await user.save();
        } catch (error){
            console.log(error.code);
            if(error.code === "23505")
            {
                if(error.detail.indexOf("username")>=0)
                    throw new ConflictException(`Username : ${username} already exists!`);
                else 
                    throw new ConflictException(`emailAddress :${password} already exists!`);
            }
            else{
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async validateUserPassword(authCredentialDto:AuthCredentialDto):Promise<string>{
        const {username,password} =authCredentialDto;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        }
        else{
            return null;
        }
    }
}