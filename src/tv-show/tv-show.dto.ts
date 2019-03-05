import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class TvShowDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    @Max(10)
    @Min(0)
    scoring: number;

    image: string;
}

// tslint:disable-next-line:max-classes-per-file
export class TvShowRO {
    id?: string;
    name: string;
    description: string;
    scoring: number;
    image?: string;
}
