import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  //5. Event handler for user creation
  // This method listens for the 'data/created' event and processes the user data
  @EventPattern('data/created')
  async handleUserCreated(@Payload() data: any) {
    await this.workerService.processUser(data.id);
  }
}
