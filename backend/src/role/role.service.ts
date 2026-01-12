import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) { }
  async findAll() {
    return await this.roleRepository.find();
  }

  async getRolerById(id: number) {
    const role = this.roleRepository.find({ where: { id: id } });
    if (!role) throw new NotFoundException('Role Not Found')
    return role
  }
  async create(createRoleDto: CreateRoleDto) {
    const newRole = {
      ...createRoleDto,
  }
  await this.roleRepository.save(newRole)
  return newRole
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRolerById(id);
        if (!role) {
            throw new NotFoundException('Role Not Found')
        }
        const updatedUser = {
            ...updateRoleDto,
        };
        await this.roleRepository.update(id, updatedUser);
        return role;
  }

  async remove(id: number) {
    const role = await this.getRolerById(id);
        if (!role) {
            throw new NotFoundException('Role Not Found');
        }
        await this.roleRepository.delete(id);
        return role;
  }
}
