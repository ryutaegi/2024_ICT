import { IsEmail,IsString ,Length} from "class-validator";
export namespace AuthDTO {
    export class SignUp {
      @IsString()
      macID: string;
  
      @IsString()
      @Length(4, 20)
      password: string;
  
      @IsString()
      username: string;
    }
  
    export class SignIn {
      @IsString()
      macID: string;
  
      @IsString()
      @Length(4, 20)
      password: string;
    }
  }
