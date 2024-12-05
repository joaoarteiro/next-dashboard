"use client";

import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type SelectorProps = {
  label: string;
  options: string[];
  defaultOption?: string;
};

const Selector = ({ label, options, defaultOption }: SelectorProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState(searchParams.get(label) || defaultOption);

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setValue(option);
    if (option !== defaultOption) {
      params.set(`${label.toLowerCase()}`, option);
    } else {
      params.delete(`${label.toLowerCase()}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setValue(searchParams.get(label.toLowerCase()) || defaultOption);
  }, [label, defaultOption, searchParams]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label={label}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
