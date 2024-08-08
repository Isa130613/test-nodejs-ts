import EntityModel from '../models/entityModel';
import PermissionModel from '../models/permissionModel';
import RoleModel from '../models/roleModel';

const insertRoles = async (): Promise<{
  admin: RoleModel;
  client: RoleModel;
}> => {
  try {
    const admin: RoleModel = await RoleModel.create({
      name: 'admin',
    } as RoleModel);
    const client: RoleModel = await RoleModel.create({
      name: 'client',
    } as RoleModel);
    console.log('Roles admin and client inserted successfully');
    return { admin, client };
  } catch (error: any) {
    console.log(`Error inserting base roles: ${error}`);

    throw Error(error);
  }
};

const insertEntities = async (): Promise<{
  order: EntityModel;
  user: EntityModel;
}> => {
  try {
    const order: EntityModel = await EntityModel.create({
      name: 'order',
    } as EntityModel);
    const user: EntityModel = await EntityModel.create({
      name: 'user',
    } as EntityModel);
    console.log(`Entities order and user inserted successfully`);
    return { order, user };
  } catch (error) {
    throw Error(`Error inserting base entities: ${error}`);
  }
};

const insertPermissions = async (): Promise<void> => {
  try {
    const { admin, client } = await insertRoles();
    const { order, user } = await insertEntities();

    await PermissionModel.create(
      {
        roleId: admin.id,
        entityId: order.id,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        canGet: false,
      } as PermissionModel,
      { include: [RoleModel, EntityModel] }
    );

    await PermissionModel.create(
      {
        roleId: client.id,
        entityId: user.id,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        canGet: false,
      } as PermissionModel,
      { include: [RoleModel, EntityModel] }
    );

    await PermissionModel.create(
      {
        roleId: client.id,
        entityId: order.id,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canGet: true,
      } as PermissionModel,
      { include: [RoleModel, EntityModel] }
    );

    await PermissionModel.create(
      {
        roleId: admin.id,
        entityId: user.id,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canGet: true,
      } as PermissionModel,
      { include: [RoleModel, EntityModel] }
    );

    console.log(`Permissions inserted successfully`);
  } catch (error: any) {
    console.log(`Error inserting permissions for roles and entities:`, error);

    throw Error(error);
  }
};

export default insertPermissions;
