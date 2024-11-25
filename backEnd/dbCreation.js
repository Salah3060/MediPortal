import pool from "./server.js";

const createUsersTable = `create table Users
    (
        userId int generated always as identity (start with 1 increment by 1)  , 
        firstName varchar(20) not null , 
        lastName varchar(20) not null , 
        phoneNumber varchar(20), 
        email varchar(30) unique , 
        gender varchar(8),
        wallet int , 
        createdAt  timestamp , 
        updatedAt timestamp , 
        birthDate date , 
        password varchar(20) not null, 
        primary key (userId) , 
        constraint validGender check (gender in ('Male' ,'Female'))
    )`;
const createPatientsTable = `create table Patients
    (
        patientId INT,
        bloodType VARCHAR(5),
        chronicDisease VARCHAR(30),
        primary KEY (patientId),
        foreign KEY (patientId) REFERENCES Users(userId) on delete cascade 
    )
`;
const createDoctorsTable = `create table Doctors
    (
        doctorId INT,
        licenseNumber int not null , 
        yaersOfExperience int , 
        about VARCHAR(50),
        specialization VARCHAR(50) not null ,
        primary KEY (doctorId),
        foreign KEY (doctorId) REFERENCES Users(userId) on delete cascade 
    )
`;
const createCategoriesTable = `create table Categories
(
    categoryId INT generated always as identity (start with 1 increment by 1),
    categoryName varchar(20) unique not null, 
    categoryDescription VARCHAR(50),
    primary KEY (categoryId)
)
`;
const createMedicalProductsTable = `create table MedicalProducts
    (
        productId INT generated always as identity (start with 1 increment by 1) ,
        productName int not null  , 
        productPrice int , 
        productStackQuantity int , 
        productDescription VARCHAR(50),
        productExpiryDate timestamp not null  ,
        productCategory int , 
        primary KEY (productId),
        foreign KEY (productCategory) REFERENCES Categories(categoryId) 
    )
`;
const createOrdersTable = `create table Orders
(
    orderId INT generated always as identity (start with 1 increment by 1),
    orderDate timestamp , 
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

// createTable(createUsersTable);
// createTable(createDoctorsTable);
// createTable(createPatientsTable);
