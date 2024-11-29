import { Select, SelectItem, Avatar } from "@nextui-org/react";
// import { categories } from "./data";

export default function selectBox() {
  const categories = [
    {
      id: 1,
      key: "1",
      title: "John Doe",
      icon: "https://placehold.co/32x32",
    },
    {
      id: 2,
      key: "1",
      title: "John Doe",
      icon: "https://placehold.co/32x32",
    },
    {
      id: 3,
      key: "1",
      title: "John Doe",
      icon: "https://placehold.co/32x32",
    },
    {
      id: 4,
      key: "1",
      title: "John Doe",
      icon: "https://placehold.co/32x32",
    },
    {
      id: 5,
      key: "1",
      title: "John Doe",
      icon: "https://placehold.co/32x32",
    },
  ];
  return (
    <Select
      items={categories}
      label="Assigned to"
      placeholder="Select a user"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "h-12",
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.title}
              className="flex-shrink-0"
              size="sm"
              src={item.icon}
            />
            <div className="flex flex-col">
              <span>{item.title}</span>
            </div>
          </div>
        ));
      }}
    >
      {(category) => (
        <SelectItem key={category.id} textValue={category.title}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={category.title}
              className="flex-shrink-0"
              size="sm"
              src={category.icon}
            />
            <div className="flex flex-col">
              <span className="text-small">{category.title}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
