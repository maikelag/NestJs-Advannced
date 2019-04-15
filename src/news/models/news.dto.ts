import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class NewsDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    category: string;

    image: string;
}

// tslint:disable-next-line:max-classes-per-file
export class NewsRO {
    id?: string;
    title: string;
    description: string;
    category: string;
    image?: string;
}
