import React, { useEffect, useState } from "react";
import Select from "react-select";

interface BrandOption {
  value: string;
  label: string;
}

interface BrandSelectorProps {
  onChange: (v: string | null) => void;
}

export const BrandSelector = ({ onChange }: BrandSelectorProps) => {
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/brands.json")
      .then((res) => res.json())
      .then((r) => {
        setBrands(
          r.map((b: string) => ({
            value: b,
            label: b,
          }))
        );
        setLoading(false);
      });
  }, []);

  return (
    <Select
      loadingMessage={() => "Loading"}
      isLoading={loading}
      options={brands}
      isClearable
      onChange={(v) => onChange(v ? v.value : null)}
    />
  );
};
