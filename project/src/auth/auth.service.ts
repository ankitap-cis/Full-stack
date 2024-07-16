import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
        private jwtService : JwtService,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) { }

    async signIn(username: string, pass: string): Promise<{access_token :string}> {
        const user = await this.usersService.findOneByUsername(username);
        console.log(user);

        // if (user?.password !== pass) {
        //     throw new UnauthorizedException();
        // }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        const payload = {sub: user.id, username: user.username, email:user.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
        }

    }
}
