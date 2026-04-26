import Card from "./Card";
import Dropdown from "./Dropdown";
import Input from "./Input";

function FiltersSection() {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
        <p className="text-sm text-slate-500">
          Narrow down applications quickly
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Input placeholder="Search company or role..." />
        <Dropdown
          options={[
            "All Statuses",
            "Applied",
            "Interview",
            "Rejected",
            "Offer",
          ]}
        />
        <Dropdown
          options={[
            "All Platforms",
            "LinkedIn",
            "Naukri",
            "Instahyre",
            "Career Page",
          ]}
        />
        <Dropdown
          options={[
            "All Locations",
            "Bengaluru, India",
            "Remote",
            "Hyderabad, India",
            "Pune, India",
            "Chennai, India",
          ]}
        />
      </div>
    </Card>
  );
}

export default FiltersSection;
