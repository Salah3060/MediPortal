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
        yearsOfExperience int , 
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
// the answer can be null(not answered yet)
const createQuestionsTable = `create table Questions
(
    questionId int generated always as identity,
    patientId int,
    speciality varchar(50) not null,
    question varchar(250) not null,
    answer varchar(400),
    questionDate timestamp not null,
    answerDate timestamp,
    primary key (questionId , patientId),
    foreign key (patientId) references Patients(patientId) on delete cascade
);
`;
const createReviewsTable = `create table Reviews
(
    doctorId int,
    patientId int,
    rate int not null,
    review varchar(200),
    reviewDate timestamp not null,
    primary key (doctorId,patientId),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (patientId) references Patients(patientId) on delete cascade
);
`;
const createWorkspacesTable = `create table Workspaces 
(
    workspaceId int generated always as identity,
    workspaceName varchar(120) not null unique,
    workspaceType varchar(10) not null,
    primary key (workspaceId),
    constraint validateWorkspaceType check (workspaceType in ('Hospital','clinic'))
);
`;
const createWorkspaceContacts = `create table WorkspaceContacts
(
    contactId int generated always as identity,
    workspacePhone varchar(100) not null unique,
    workspaceId int,
    primary key (contactId),
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade
);
`;
const createWorkspaceLocations = `create table WorkspaceLocations
(
    locationId int generated always as identity,
    workspacesLocation varchar(150) not null unique,
    workspaceId int,
    primary key (locationId),
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade

);
`;
const createOffersTable = `create table Offers
(
    percentage int not null check (percentage between 0 and 100),
    startDate timestamp not null,
    endDate timestamp not null,
    doctorId int,
    workspaceId int,
    constraint validateDates check (startDate < endDate),
    primary key (doctorId,workspaceId),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade
);
`;

//---------------
const createInsuranceProvidersTable = `create table InsurancesProviders
(
    providerId int generated always as identity,
    providerName varchar(100) not null unique,
    primary key (providerId)
)
`;
const createInsuranceProviderContacts = `create table InsuranceProviderContacts
(
    contactId int generated always as identity,
    providerPhone varchar(100) not null unique,
    providerId int,
    primary key (contactId),
    foreign key (providerId) references InsurancesProviders(providerId) on delete cascade
);
`;
const createInsuranceProviderLocations = `create table InsuranceProviderLocations
(
    locationId int generated always as identity,
    providerLocation varchar(150) not null unique,
    providerId int,
    primary key (locationId),
    foreign key (providerId) references InsurancesProviders(providerId) on delete cascade
);
`;
const createInsurancesTable = `create table Insurances
(
    insuranceId int unique generated always as identity,
    startDate timestamp not null,
    duration INTERVAL not null,
    providerId int,
    primary key (insuranceId,providerId),
    foreign key (providerId) references InsurancesProviders(providerId) on delete cascade
);
`;
const createCoverageTable = `create table Coverage
(
    insuranceId int,
    workspaceId int,
    primary key (insuranceId,workspaceId),
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade,
    foreign key (insuranceId) references Insurances(insuranceId) on delete cascade
);
`;
const createDoctorAvailabilityTable = `create table DoctorAvailability
(
    workingDay varChar(15) not null,
    startTime TIME not null,
    endTime TIME not null,
    doctorId int,
    workspaceId int,
    primary key (doctorId,workspaceId,workingDay,startTime),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade,
    constraint validateTimes check (startTime < endTime)
);
`;
const createAppointmentsTable = `create table Appointments
(
    appointmentId int generated always as identity,
    appointmentDate timestamp not null,
    appointmentStatus varchar(30) not null,
    fees int not null,
    paymentStatus varchar(30) not null,
    bookingDate timestamp not null,
    patientId int,
    doctorId int,
    workspaceId int,
    primary key (patientId, appointmentId),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade,
    foreign key (patientId) references Patients(patientId) on delete cascade
);
`;
const tester = "tsting";

/// hi mr aref
