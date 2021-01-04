import { Board } from './../entities/Board';
<<<<<<< HEAD
import { 
  Resolver, 
  Query, 
  Ctx, 
  Mutation, 
  Arg  
} from 'type-graphql'
import { MyContext } from 'src/types';
=======
import { Resolver, Query, Ctx, Mutation, Arg  } from 'type-graphql'
import { MyContext } from '../types';
>>>>>>> dev

@Resolver()

export class BoardResolver {
  // Defining types
  @Query(() => [Board])
  boards(@Ctx() {em}: MyContext): Promise<Board[]> { 
    return em.find(Board, {})
  }

  @Mutation(() => Board)
  async createBoard(
    @Arg('first_name') first_name: string,    
    @Arg('last_name') last_name: string, 
    @Ctx() {em}: MyContext   
  ): Promise<Board> {
    const board = em.create(Board, { first_name, last_name });
    await em.persistAndFlush(board);
    return board;
  }

  @Mutation(() => Board, {nullable: true})
  async updateBoard(
    @Arg('first_name') first_name: string,    
    @Ctx() {em}: MyContext   
  ): Promise<Board | null> {
    const board = await em.findOne(Board, {first_name});
    if(!board) {
      return null
    }
    if(typeof first_name !== 'undefined') {
      board.first_name = first_name
      await em.persistAndFlush(board);

    }
    return board;
  }
 
  @Mutation(() => Boolean)
  async deleteBoard(
    @Arg('first_name') first_name: string,    
    @Ctx() {em}: MyContext   
  ): Promise<Boolean> {
    await em.nativeDelete(Board, {first_name})
    return true;
  }

  
}
