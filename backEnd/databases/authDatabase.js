import pool from "../server.js";

const signUpDb = async (email, password) => {
  try {
    const query = `select * from Users where email=$1 and password=$2`;
    const res = await pool.query(query, [email, password]);
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
                  RETURNING userId , firstName , lastName , userRole ;
                  `;

    // attributes[5] = attributes[5].toISOString().split("T")[0];
    attributes[5] = new Date(new Date(attributes[5]).toISOString());
    const newUser = await pool.query(query, [...attributes, role]);
    console.log(newUser.rows[0]);
    let secQuery;
    if (role === "Patient") {
      secQuery = `insert into Patients(patientId , bloodType , chronicDisease)
                  values($1 , $2 , $3);`;
    } else {
      secQuery = `insert into Doctors(doctorId , licenseNumber , specialization)
                  values($1 , $2 , $3);`;
    }
    await pool.query(secQuery, [newUser.rows[0].userid, ...specificAtt]);
    if (newUser.rowCount) return newUser.rows[0];
    return false;
  } catch (err) {
    console.log(err.mesaage);
  }
};

export { signUpDb, registerDb };
