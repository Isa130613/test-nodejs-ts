import EntityModel from '../models/entityModel';
import PermissionModel from '../models/permissionModel';
import RoleModel from '../models/roleModel';
import UserModel from '../models/userModel';

const loadRelationships = (): void => {
  RoleModel.belongsToMany(EntityModel, {
    through: PermissionModel,
    as: 'permissions',
    foreignKey: 'EntityId',
  });
  EntityModel.belongsToMany(RoleModel, {
    through: PermissionModel,
    as: 'permissions',
    foreignKey: 'RoleId',
  });
  RoleModel.hasMany(UserModel);
  UserModel.belongsTo(RoleModel, {
    foreignKey: { name: 'RoleId', allowNull: false },
  });

  console.log('Relationships loaded successfully');
};

export default loadRelationships;
