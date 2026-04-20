import { SearchBar } from "@uengage/ui";
export default function SearchPreview() {
  return (
    <div className="mt-8 flex flex-col gap-4 px-20">
      <SearchBar placeholder="Search ticket..." width={280}  />
      <SearchBar
        placeholder="Numbers only"
        valueType="number"
        width={280}
        
      />
      <SearchBar placeholder="Small"  size="sm" width={220}  />
      <SearchBar placeholder="Large"  size="lg" width={340}  />
    </div>
  );
}
