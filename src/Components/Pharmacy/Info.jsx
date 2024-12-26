const Info = () => {
  return (
    <div className="container max-w-[1300px] mx-auto flex flex-col md:flex-row items-center px-4 py-6 gap-4 md:gap-8">
      {/* Logo Section */}
      <div className="logo">
        <img
          src="/ministry.jpg"
          alt="Ministry Logo"
          className="h-10 w-10 md:h-10 md:w-10 object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="text text-[14px] text-center md:text-left">
        <h1 className="text-lightGrayText leading-5 md:leading-6">
          All medicines are dispensed from pharmacies licensed by the Egyptian
          Ministry of Health.
        </h1>
      </div>
    </div>
  );
};

export default Info;
