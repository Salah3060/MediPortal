import CategoryCard from "./Cards/CategoryCard";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Medicines",
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      name: "Vitamins",
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      name: "Supplements",
      image: "https://placehold.co/600x400",
    },
    {
      id: 4,
      name: "Personal Care",
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      name: "Health Devices",
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      name: "Health Devices",
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      name: "Health Devices",
      image: "https://placehold.co/600x400",
    },
    {
      id: 5,
      name: "Health Devices",
      image: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="textHeader font-bold text-primary text-xl mb-4">
        <h1>Browse by category</h1>
      </div>

      {/* Responsive Grid with minmax */}
      <div
        className="grid gap-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
