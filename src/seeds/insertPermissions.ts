import EntityModel from '../models/entityModel';
import PermissionModel from '../models/permissionModel';
import RoleModel from '../models/roleModel';

const insertRoles = async (): Promise<{
  admin: RoleModel | undefined;
  client: RoleModel | undefined;
}> => {
  try {
    const admin: RoleModel = await RoleModel.create({ name: 'admin' });
    const client: RoleModel = await RoleModel.create({ name: 'client' });
    console.log('Roles admin and client inserted successfully');
    return { admin, client };
  } catch (error) {
    console.log(`Error inserting base roles: ${error}`);
    return { client: undefined, admin: undefined };
  }
};

const insertEntities = async (): Promise<{
  order: EntityModel | undefined;
  user: EntityModel | undefined;
}> => {
  try {
    const order: EntityModel = await EntityModel.create({ name: 'order' });
    const user: EntityModel = await EntityModel.create({ name: 'user' });
    console.log(`Entities order and user inserted successfully`);
    return { order, user };
  } catch (error) {
    console.log(`Error inserting base entities: ${error}`);
    return { order: undefined, user: undefined };
  }
};

const insertPermissions = async (): Promise<void> => {
  try {
    const { admin, client } = await insertRoles();
    const { order, user } = await insertEntities();
    await PermissionModel.create({
      RoleId: admin?.dataValues.id,
      EntityId: order?.dataValues.id,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
      canGet: false,
    });

    await PermissionModel.create({
      RoleId: client?.dataValues.id,
      EntityId: user?.dataValues.id,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
      canGet: false,
    });

    await PermissionModel.create({
      RoleId: client?.dataValues.id,
      EntityId: order?.dataValues.id,
      canCreate: true,
      canUpdate: true,
      canDelete: false,
      canGet: true,
    });

    await PermissionModel.create({
      RoleId: admin?.dataValues.id,
      EntityId: user?.dataValues.id,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      canGet: true,
    });

    console.log(`Permissions inserted successfully`);
  } catch (error) {
    console.log(`Error inserting permissions for roles and entities: ${error}`);
  }
};

export default insertPermissions;
