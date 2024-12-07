import pool from "../server.js";
import { AppError, catchAsyncError } from "../utilities.js";

const logInDb = async (email, password, id) => {
  try {
    console.log(email, password, id);
    let query = "select * from Users   ";
    let res;
    if (id) {
      query += `where userId=$1`;
      res = await pool.query(query, [id]);
    } else {
      query += `where email=$1 and password=$2`;
      res = await pool.query(query, [email, password]);
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
    // console.log(newUser.rows[0]);
    let secQuery;
    if (role === "Patient") {
      secQuery = `insert into Patients(patientId , bloodType , chronicDisease)
                  values($1 , $2 , $3);`;
    } else if (role === "Doctor") {
      secQuery = `insert into Doctors(doctorId , licenseNumber , specialization)
                  values($1 , $2 , $3);`;
    }

    await pool.query(secQuery, [newUser.rows[0].userid, ...specificAtt]); //id,c1,c2
    if (newUser.rowCount) return newUser.rows[0];
    return false;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { logInDb, registerDb };
