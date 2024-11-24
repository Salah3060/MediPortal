import pool from "./server.js";

const createUsersTable = `create table Users
    (
        userId int , 
        firstName varchar(15), 
        lastName varchar(15), 
        phoneNumber varchar(15), 
        email varchar(15), 
        gender varchar(5),
        wallet int , 
        createdAt  date , 
        updatedAt date , 
        birthDate date , 
        password varchar(20) , 
        primary key (userId) 
    )`;
const createPatientsTable = `create table Patients
    (
        patientId INT,
        bloodType VARCHAR(5),
        chronicDisease VARCHAR(20),
        primary KEY (patientId),
        foreign KEY (patientId) REFERENCES Users(userId)
    )
`;
const createDoctorsTable = `create table Doctors
    (
        doctorId INT,
        licenseNumber int , 
        yaersOfExperience int , 
        about VARCHAR(50),
        specialization VARCHAR(20),
        primary KEY (doctorId),
        foreign KEY (doctorId) REFERENCES Users(userId)
    )
`;
const createCategoriesTable = `create table Categories
(
    categoryId INT,
    categoryName varchar(20) , 
    categoryDescription VARCHAR(50),
    primary KEY (categoryId)
)
`;
const createMedicalProductsTable = `create table MedicalProducts
    (
        productId INT,
        productName int , 
        productPrice int , 
        productStackQuantity int , 
        productDescription VARCHAR(50),
        productExpiryDate date ,
        productCategory int , 
        primary KEY (productId),
        foreign KEY (productCategory) REFERENCES Categories(categoryId)
    )
`;
const createOrdersTable = `create table Orders
(
    orderId INT,
    orderDate date , 
    totalAmount int ,
    primary KEY (orderId)
)
`;
const createOrderProductRelationTable = `create table OrderProductRelation
(
    orderId INT,
    productId int , 
    productQuantity int ,
    primary KEY (orderId , productId) , 
    foreign key (orderId) references Orders (orderId) ,
    foreign key (productId) references MedicalProducts (productId) 
)
`;
async function createTable(query) {
  try {
    const res = await pool.query(query);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
createTable(createOrderProductRelationTable);
