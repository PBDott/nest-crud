import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [UserModule, BoardModule, CommentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
