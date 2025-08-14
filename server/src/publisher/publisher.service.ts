import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processing } from '../entities/processing.entry';
import { CreateUserDto } from '../dto/create-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

// Service for handling user-related operations
@Injectable()
export class PublisherService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Processing)
    private processingRepo: Repository<Processing>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    });
  }

  //4. Method to add a new user
  // This method saves the user data to the processing table and publishes a message to MQTT
  async addUser(userData: CreateUserDto) {
    const record = this.processingRepo.create(userData);
    const saved = await this.processingRepo.save(record);

    // Publish message to MQTT
    this.client.emit('data/created', { id: saved.id });

    return { message: `User ${userData.name} added to processing` };
  }
}
