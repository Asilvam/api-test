import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksController } from "./tasks/tasks.controller";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import * as ormconfig from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
      autoLoadEntities: true
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {

}
