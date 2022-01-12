import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
