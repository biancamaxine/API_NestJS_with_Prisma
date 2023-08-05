import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiConflictResponse({ description: 'Email already registred.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get(['', ':id'])
  find(@Param() { id }: { id?: string }, @Query() { name }: { name?: string }) {
    return this.usersService.read(+id, name);
  }

  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiNotFoundResponse({ description: 'User not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
