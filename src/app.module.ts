import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, TaskModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
