import pool from "../../server.js";

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
                      values ($1 , $2) returning *`;
    await pool.query(secQuery, [phone, workspace.rows[0].workspaceid]);
    const locs = await pool.query(thrdQuery, [
      location,
      workspace.rows[0].workspaceid,
    ]);
    workspace.rows[0].workspacephone = phone;
    workspace.rows[0].workspaceLocation = location;
    workspace.rows[0].locationid = locs.rows[0].locationid;
    if (workspace.rowCount) return workspace.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const editWorkspaceDb = async (workspaceId, secId, thirdId, toBeEdited) => {
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
    if (attCnt == 1) {
      // to be able to update only phone or loc
      query = ``;
    }
    const updatedWorkspace = await pool.query(query, columns);
    console.log(updatedWorkspace);
    if (updatedWorkspace.rowCount == 0) {
      // used == 0 not "!" to distinguish between updating failure and updating neither name nor type
      //gard clause to make sure that we updated correctlly
      return false;
    }
    if (updatedWorkspace.rows.length == 0) updatedWorkspace.rows[0] = {}; //to be able to put properties in it
    if (toBeEdited.workspacePhone) {
      // if phone made it to this point, so definitly there's a secId
      let secQuery = `update WorkspaceContacts
                      SET workspacePhone = $1
                      where contactId = $2
                      returning *`;
      const res = await pool.query(secQuery, [
        toBeEdited.workspacePhone,
        secId,
      ]);
      updatedWorkspace.rows[0].workspacephone = res.rows[0].workspacephone;
    }
    if (toBeEdited.workspaceLocation) {
      const usedId = thirdId ? thirdId : secId; // if there is thirdId,it's locations id
      let secQuery = `update WorkspaceLocations
                      SET workspacesLocation = $1
                      where locationId = $2
                      returning *`;
      const res = await pool.query(secQuery, [
        toBeEdited.workspaceLocation,
        usedId,
      ]);
      updatedWorkspace.rows[0].workspacelocation =
        res.rows[0].workspaceslocation;
    }

    return updatedWorkspace.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const retrieveAllWorkSpaces = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` w.workSpaceId,
                 w.workspaceName,
                 w.workspaceType,
                 JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'locationId',wl.locationId,
                    'location',wl.workspacesLocation
                  )
                 ) as locations ,
                 JSON_AGG(wc.workspacePhone) as phones
               `;
    query += `  
                from Workspaces  w   
                LEFT JOIN 
                  WorkspaceLocations wl ON wl.workSpaceId = w.workSpaceId
                LEFT JOIN 
                  WorkspaceContacts wc ON wc.workSpaceId = w.workSpaceId                  

                `;

    if (filters) query += `where ${filters.join(" and ")}       `;

    query += `
                group by 
                 w.workSpaceId,
                 w.workspaceName,
                 w.workspaceType
             `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const rerteieveAllLocations = async () => {
  try {
    const query = `
    select DISTICT * 
    from WorkspaceLocations 
    `;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  createWorkspaceDb,
  editWorkspaceDb,
  retrieveAllWorkSpaces,
  rerteieveAllLocations,
};
