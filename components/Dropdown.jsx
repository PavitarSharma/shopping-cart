"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronUp, LuSearch } from "react-icons/lu";

const Dropdown = ({
  value,
  setValue,
  options = [],
  placeholder,
  label,
  isSearch,
  disabled,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSearchChange = useCallback(
    (event) => {
      const searchValue = event.target.value;
      setSearchTerm(searchValue);
      if (isSearch) {
        const updatedOptions = options.filter((option) =>
          option.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredOptions(updatedOptions);
      }
    },
    [isSearch, options]
  );

  const handleSelectValue = useCallback(
    (option) => {
      if (!disabled) {
        setValue(option);
        setSearchTerm("");
        setFilteredOptions(options);
        setOpen(false);
      }
    },
    [setValue, options, disabled]
  );

  return (
    <div className="flex flex-col space-y-1 w-auto">
      {label && <span>{label}</span>}
      <div
        ref={ref}
        onClick={handleOpen}
        className="relative flex items-center gap-2 w-full cursor-pointer justify-between px-4 h-12 rounded border border-gray-300 bg-white"
      >
        <span className="text-sm">{value ? value : placeholder}</span>
        {open ? <LuChevronUp /> : <LuChevronDown />}

        {open && (
          <div
            onClick={(event) => event.stopPropagation()}
            className={`bg-white absolute left-0 right-0 w-full top-[52px] border border-gray-300 rounded z-10 `}
          >
            {isSearch && (
              <div className="relative w-full border-b border-gray-300 h-12 rounded-t mb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full rounded-t tetx-sm h-full pl-8 pr-3 text-sm placeholder:text-gray-600 text-black"
                />
                <LuSearch className="absolute top-1/2 -translate-y-1/2 left-2" />
              </div>
            )}
            {filteredOptions.length ? (
              <ul className="w-full pb-2 space-y-1">
                {filteredOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelectValue(option)}
                    className={`block rounded px-4 py-2.5 w-full  text-sm font-medium ${
                      value === option
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } hover:bg-primary hover:text-white`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4 opacity-70">
                {" "}
                No option found
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <small className="text-red-600 px-2 font-medium">{error}</small>
      )}
    </div>
  );
};

export default Dropdown;
