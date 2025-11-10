import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";

const CategoryPanel = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});

  const mainCategories = [
    { name: "Fashion", sub: ["Men", "Women", "Girls"] },
    { name: "Electronics", sub: ["Smart Watch", "Laptops", "Mobiles"] },
    { name: "Bags", sub: ["Women Bags", "Men Bags"] },
    { name: "Footwear", sub: ["Women Footwear", "Men Footwear"] },
    { name: "Groceries", sub: [] },
    { name: "Beauty", sub: [] },
    { name: "Wellness", sub: [] },
    { name: "Jewellery", sub: [] },
  ];

  const extraCategories = ["All Categories", "New Arrivals", "Best Sellers"];

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleMainItemClick = (e, name) => {
    e.stopPropagation();
    const category = mainCategories.find((cat) => cat.name === name);
    if (category?.sub.length > 0) {
      toggleSubmenu(name);
    } else {
      onClose();
    }
  };

  const handleSubItemClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleExtraItemClick = () => {
    onClose();
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Shop By Categories
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <IoCloseSharp size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Danh sách danh mục - sử dụng component con */}
      <div className="w-64" role="presentation">
        <CategoryCollapse
          mainCategories={mainCategories}
          extraCategories={extraCategories}
          openSubmenu={openSubmenu}
          toggleSubmenu={toggleSubmenu}
          handleMainItemClick={handleMainItemClick}
          handleSubItemClick={handleSubItemClick}
          handleExtraItemClick={handleExtraItemClick}
        />
      </div>
    </Drawer>
  );
};

export default CategoryPanel;