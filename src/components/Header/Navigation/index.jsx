import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { Button } from "@mui/material";
import CategoryPanel from "./CategoryPanel";

const Navigation = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const openCategoryPanel = () => setIsOpenCategoryPanel(true);
  const closeCategoryPanel = () => setIsOpenCategoryPanel(false);

  const menuItems = [
    { name: "Home", path: "/", sub: [] },
    { name: "Fashion", path: "/fashion", sub: ["Men", "Women", "Girls"] },
    { name: "Electronics", path: "/electronics", sub: ["Smart Watch", "Laptops", "Mobiles"] },
    { name: "Bags", path: "/bags", sub: ["Women Bags", "Men Bags"] },
    { name: "Footwear", path: "/footwear", sub: ["Women Footwear", "Men Footwear"] },
    { name: "Groceries", path: "/groceries", sub: [] },
    { name: "Beauty", path: "/beauty", sub: [] },
    { name: "Wellness", path: "/wellness", sub: [] },
    { name: "Jewellery", path: "/jewellery", sub: [] },
  ];

  // Hover vào menu item
  const handleMouseEnter = (name) => {
    if (timeoutId) clearTimeout(timeoutId);
    setHoveredItem(name);
  };

  // Rời khỏi toàn bộ vùng (li + submenu)
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // Delay 150ms để chuột kịp di chuyển vào submenu
    setTimeoutId(id);
  };

  return (
    <>
      <nav className="py-2 bg-white border-b border-gray-250">
        <div className="container flex items-center justify-between gap-8">
          {/* Shop By Categories */}
          <div className="w-[20%]">
            <Button
              onClick={openCategoryPanel}
              startIcon={<RiMenu2Fill size={18} />}
              endIcon={<FaAngleDown size={13} />}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                color: "black",
                gap: 1,
                padding: "8px 12px",
                "&:hover": { backgroundColor: "rgb(243 244 246)" },
              }}
            >
              Shop By Categories
            </Button>
          </div>

          {/* Horizontal Menu */}
          <div className="w-[60%]">
            <ul className="flex items-center justify-center gap-1">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="list-none relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={item.path} className="link">
                    <Button
                      className="normal-case"
                      sx={{
                        color: "rgba(0,0,0,0.8)",
                        "&:hover": { color: "#ff5252" },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>

                  {/* Submenu */}
                  {item.sub.length > 0 && hoveredItem === item.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50 dropdown-shadow"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="py-2">
                        {item.sub.map((subItem) => (
                          <li key={subItem}>
                            <Link
                              to={`${item.path}/${subItem
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-primary transition"
                              onClick={() => {
                                setHoveredItem(null);
                                if (timeoutId) clearTimeout(timeoutId);
                              }}
                            >
                              {subItem}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Free Delivery */}
          <div className="w-[20%] flex justify-end">
            <p className="text-[14px] font-semibold flex items-center gap-2">
              <GoRocket size={18} />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      <CategoryPanel
        isOpen={isOpenCategoryPanel}
        onClose={closeCategoryPanel}
      />
    </>
  );
};

export default Navigation;