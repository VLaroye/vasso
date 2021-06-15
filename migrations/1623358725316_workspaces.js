/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('workspaces', {
        id: { type: 'uuid', notNull: true, primaryKey: true },
        name: { type: 'text', notNull: true },
    })

    pgm.createTable('workspace_membership', {
        id: { type: 'uuid', primaryKey: true },
        user_id: { type: 'uuid', references: 'users' },
        workspace_id: { type: 'uuid', references: 'workspaces' }
    })
};

exports.down = pgm => {};
