import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';
import { User } from '@app/security/users/user.entity';

export class CommentDTO {
    @IsNotEmpty()
    comment: string;
}

// tslint:disable-next-line:max-classes-per-file
export class CommentRO {
    id?: string;
    comment: string;
    author: User;
}
