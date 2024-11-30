import pool from "../server.js";

const createWorkspaceDb = async (name, type) => {
  try {
    const query = `insert into Workspaces (workspaceName , workspaceType)
                  values ($1,$2)
                  returning * ;
                  `;
    const workspace = await pool.query(query, [name, type]);
    if (workspace.rowCount) return workspace.rows[0];
    return false;
  } catch (error) {
    console.log(error);
  }
};
