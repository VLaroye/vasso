/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.alterColumn('workspace_membership', 'user_id', { notNull: true });

    pgm.alterColumn('workspace_membership', 'workspace_id', { notNull: true });
};

exports.down = pgm => {};
