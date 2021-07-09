import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto):Promise<{accessToken:string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload :JwtPayload= { username };

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
