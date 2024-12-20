import pool from "./server.js";

const createUsersTable = `create table Users
(
    userId int generated always as identity (start with 1 increment by 1), 
    firstName varchar(20) not null, 
    lastName varchar(20) not null, 
    phoneNumber varchar(110), 
    email varchar(30) unique, 
    gender varchar(8) check (gender in ('Male', 'Female')),
    wallet numeric(10, 2) default 0.00, 
    createdAt timestamp default current_timestamp, 
    updatedAt timestamp default current_timestamp, 
    birthDate date, 
    verificationCode int default null,
    codeExpiresAt timestamp default null,
    password varchar(110) not null, 
    userRole varchar(15) not null default 'Patient',
    userState varchar(10) default 'Pending' check (userState in ('Active', 'Pending', 'Blocked')),
    primary key (userId)
);
`;
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
        productName  varchar(30) not null default 'cital'  , 
        productPrice int , 
        productStackQuantity int , 
        productDescription VARCHAR(50),
        productExpiryDate date not null  ,
        productCategory int , 
        manufacture  varchar(30) not null default 'Eva-Pharma' ,
        primary KEY (productId),
        foreign KEY (productCategory) REFERENCES Categories(categoryId) 
    )
`;
const createOrdersTable = `create table Orders
(
    orderId INT generated always as identity (start with 1 increment by 1),
    orderDate timestamp , 
    patientId int ,
    totalAmount float ,
    primary KEY (orderId),
    FOREIGN KEY (patientId) references patients(patientId) on delete cascade
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
const createActiveIngrediants = `create table ActiveIngredients (
     activeIngredient varchar(25),
     productId  int ,
     primary key (activeIngredient , productId),
     foreign key (productId) references MedicalProducts (productId) )
      , 
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
    gender vatchar(10),
    age int , 
    doctorId int , 
    speciality varchar(50) not null,
    question varchar(250) not null,
    answer varchar(400),
    questionDate timestamp not null,
    answerDate timestamp,
    primary key (questionId , patientId),
    foreign key (patientId) references Patients(patientId) on delete cascade
    foreign key (doctorId) references doctors (doctorId) 
);
`;
const createReviewsTable = `create table Reviews
(
    doctorId int,
    patientId int,
    rate int not null,
    review varchar(200),
    waitingTime int default 35 ,
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
    constraint validateWorkspaceType check (workspaceType in ('Hospital','Clinic'))
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
    offerId int always generated as identity,
    percentage int not null check (percentage between 0 and 100),
    startDate timestamp not null,
    endDate timestamp not null,
    doctorId int,
    workspaceId int,
    offerDescription varchar(100),
    offerName varchar(100) not null,
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
    providerLocation varchar(150) not null unique,
    providerPhone varchar(100) not null unique,
    primary key (providerId)
)
`;
const createInsuranceProviderContacts = `create table InsuranceProviderContacts
--droped for simplicity
(
    contactId int generated always as identity,
    providerPhone varchar(100) not null unique,
    providerId int,
    primary key (contactId),
    foreign key (providerId) references InsurancesProviders(providerId) on delete cascade
);
`;
const createInsuranceProviderLocations = `
--droped for simplicity
create table InsuranceProviderLocations
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
    insuranceName varchar(30) ,
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
    locationId int,
    primary key (doctorId,workspaceId,workingDay,startTime),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (workspaceId) references Workspaces(workspaceId) on delete cascade,
    foreign key (locationId) references WorkspaceLocations(locationId) on delete cascade
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
    locationId int,
    primary key (patientId, appointmentId),
    foreign key (doctorId) references Doctors(doctorId) on delete cascade,
    foreign key (patientId) references Patients(patientId) on delete cascade,
    foreign key (locationId) references WorkspaceLocations (locationId) on delete cascade
);
`;
const tester = "tsting";

/// hi mr aref

createTable(createActiveIngrediants);
