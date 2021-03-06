import { User } from '../entities/User'
import { MyContext } from '../types'
import { 
  Resolver, 
  Mutation, 
  InputType, 
  Field, 
  Arg, 
  Ctx, 
<<<<<<< HEAD
  ObjectType  
=======
  ObjectType,  
  Query
>>>>>>> dev
} from 'type-graphql'
import argon2 from 'argon2'
import { EntityManager } from '@mikro-orm/postgresql'


@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}


@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse{
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?: User
}

@Resolver()

export class UserResolver {
  @Query(() => User, {nullable: true})
  async me (@Ctx() { req, em}: MyContext) {
    console.log("session:", req.session)
    // You are not logged in here
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, {user_id: req.session.userId} );
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options:UsernamePasswordInput,
    @Ctx() {em, req}: MyContext
  ): Promise<UserResponse> {
    if( options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username must be at least 2 characters'
          }
        ]
      }
    }
    if( options.password.length <= 4) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password must be at least 4 characters'
          }
        ]
      }
    }

    const hashedPassword = await argon2.hash(options.password)
    let user;
    try {
     const result = await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert({
        username:options.username,
        password:hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning("*");
      user = result[0]
    } catch (err) {
      //|| err.detail.includes("already exists") {
      // duplicate username error
      if(err.code ==="23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            }
          ]
        }
      }
    }

    console.log('i am user:', user)
    // store userID session 
    // this will set a cookie on the user 
    // keep them logged in
    
    req.session.userId = user.user_id;
    return {
      user
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options:UsernamePasswordInput,
    @Ctx() {em, req}: MyContext
  ): Promise <UserResponse> {
    const user = await em.findOne(User, {username: options.username});
    if(!user) {
     return {
       errors:[
         {
         field: 'username',
         message:'to korisničko ima ne postoji'
       }
      ],
     }
    
  }
  const valid = await argon2.verify(user.password, options.password);
  if (!valid) {
    return {
      errors:[
        {
        field: 'password',
        message:'netočna lozinka'
      },
     ],
    }; 
  }
   //req.session.userId = user.id;

  req.session.userId = user.user_id;

  return {
   user,
  };

  }
}