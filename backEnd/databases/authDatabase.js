import pool from "../server.js";
import { AppError, catchAsyncError } from "../utilities.js";

const logInDb = async (email, id) => {
  try {
    console.log(email, id);
    let query = "select * from Users   ";
    let res;
    if (id) {
      query += `where userId=$1`;
      res = await pool.query(query, [id]);
    } else {
      query += `where email=$1`;
      res = await pool.query(query, [email]);
    }
    if (res.rowCount) return res.rows[0];
    return false;
  } catch (error) {
    console.log(error.mesaage);
  }
};

const registerDb = async (attributes, role, specificAtt) => {
  // specificAtt => [bloodType, chronicDisease] or [licenseNumber, specialization]
  try {
    const query = `insert into Users(firstName, lastName, email, phoneNumber, gender, createdAt, updatedAt , userState, birthDate, password, userRole)
                  values($1 , $2 , $3 , $4 , $5 , $6 , $6 , $7 , $8 , $9 , $10)
                  RETURNING * ;
                  `;

    // attributes[5] = attributes[5].toISOString().split("T")[0];
    attributes[5] = new Date(new Date(attributes[5]).toISOString());
    const newUser = await pool.query(query, [...attributes, role]);
    if (!newUser) {
      return new AppError("Something wrong happend", 400);
    }
    console.log(newUser);
    let secQuery;
    if (role === "Patient") {
      secQuery = `insert into Patients(patientId , bloodType , chronicDisease)
                  values($1 , $2 , $3);`;
    } else if (role === "Doctor") {
      secQuery = `insert into Doctors(doctorId , licenseNumber , specialization)
                  values($1 , $2 , $3);`;
    } else {
      return new AppError("Insert a valid role either Patient or doctor", 400);
    }

    await pool.query(secQuery, [newUser.rows[0].userid, ...specificAtt]); //id,c1,c2
    if (newUser.rowCount) return newUser.rows[0];
    return false;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateUserDb = async (toBeEdited, specificAtt, role, id) => {
  try {
    let helperQuery = `select userRole from users where userId=$1`;
    const checkerUser = await pool.query(helperQuery, [id]);
    console.log(checkerUser, id);
    if (!checkerUser.rowCount) {
      throw new AppError("there's no such a user with that id", 400);
    }
    if (checkerUser.rows[0].userrole !== role) {
      throw new AppError("roles didn't match, something went wrong", 400);
    }
    let query = `update Users SET `;
    let cnt = 0;
    toBeEdited.updatedat = toBeEdited.updatedat
      ? new Date(new Date(toBeEdited.updatedat).toISOString())
      : null;
    Object.entries(toBeEdited).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where userId = $${++cnt}
              returning *`;

    const readyAtt = Object.values(toBeEdited).filter((val) => val);
    const user = await pool.query(query, [...readyAtt, id]);
    const readySpecificAtt = Object.values(specificAtt).filter((val) => val);

    if (readySpecificAtt.length) {
      cnt = 0;
      let secQuery = `update ${role}s SET `;
      Object.entries(specificAtt).forEach(([k, v]) => {
        if (cnt && v) secQuery += " , ";
        if (v) {
          secQuery += k + " = " + `$${++cnt}`;
        }
      });
      secQuery += ` where ${role}Id = $${++cnt}
            returning *`;
      const specificUser = await pool.query(secQuery, [
        ...readySpecificAtt,
        id,
      ]);
      // console.log([...readySpecificAtt, id]);
      // console.log(specificUser);

      Object.entries(specificAtt).forEach(([k, v]) => {
        if (v) user.rows[0][`${k}`] = v;
      });
    }
    if (user.rowCount) return user.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { logInDb, registerDb, updateUserDb };
