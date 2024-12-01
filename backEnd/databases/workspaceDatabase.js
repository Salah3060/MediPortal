import pool from "../server.js";

const createWorkspaceDb = async (name, type, phone, location) => {
  try {
    const query = `insert into Workspaces (workspaceName , workspaceType)
                  values ($1,$2)
                  returning * ;
                  `;
    const workspace = await pool.query(query, [name, type]);

    const secQuery = `insert into WorkspaceContacts(workspacePhone , workspaceId)
                    values ($1 , $2)`;
    const thrdQuery = `insert into WorkspaceLocations(workspacesLocation, workspaceId)
                      values ($1 , $2)`;
    await pool.query(secQuery, [phone, workspace.rows[0].workspaceid]);
    await pool.query(thrdQuery, [location, workspace.rows[0].workspaceid]);
    workspace.rows[0].workspacephone = phone;
    workspace.rows[0].workspaceLocation = location;

    if (workspace.rowCount) return workspace.rows[0];
    return false;
  } catch (error) {
    console.log(error);
  }
};
const editWorkspaceDb = async (
  workspaceId,
  contactId,
  locationId,
  toBeEdited
) => {
  try {
    let query = `update Workspaces
                SET `;
    let columns = [];
    let attCnt = 1;

    if (toBeEdited.workspaceName) {
      query += `workspaceName = $${attCnt} `;
      columns.push(toBeEdited.workspaceName);
      attCnt++;
    }
    if (toBeEdited.workspaceType) {
      if (attCnt > 1) query += `, `;
      query += `workspaceType = $${attCnt}`;
      columns.push(toBeEdited.workspaceType);
      attCnt++;
    }
    query += `where workspaceId = $${attCnt}
              returning *;`;
    columns.push(workspaceId);
    const updatedWorkspace = await pool.query(query, columns);

    if (toBeEdited.workspacePhone) {
      let secQuery = `update WorkspaceContacts
                      SET workspacePhone = $1
                      where contactId = $2
                      returning *`;
      const res = await pool.query(secQuery, [, secId]);
    }
    if (updatedWorkspace.rowCount)
      // console.log(updatedWorkspace);
      return updatedWorkspace.rows[0];
    return false;
  } catch (error) {
    console.log(error);
  }
};

export { createWorkspaceDb, editWorkspaceDb };
