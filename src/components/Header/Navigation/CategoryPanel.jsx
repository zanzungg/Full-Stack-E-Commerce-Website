import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
 

const CategoryPanel = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});

  const mainCategories = [
    {
      name: "Fashion",
      sub: ["Men", "Women", "Girls"],
    },
    {
      name: "Electronics",
      sub: ["Smart Watch", "Laptops", "Mobiles"],
    },
    {
      name: "Bags",
      sub: ["Women Bags", "Men Bags"],
    },
    {
      name: "Footwear",
      sub: ["Women Footwear", "Men Footwear"],
    },
    {
      name: "Groceries",
      sub: [],
    },
    {
      name: "Beauty",
      sub: [],
    },
    {
      name: "Wellness",
      sub: [],
    },
    {
      name: "Jewellery",
      sub: [],
    },
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
    if (mainCategories.find((cat) => cat.name === name)?.sub.length > 0) {
      toggleSubmenu(name);
    } else {
      onClose();
    }
  };

  const handleSubItemClick = (e) => {
    e.stopPropagation();
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

      {/* Danh sách danh mục */}
      <div className="w-64" role="presentation">
        <List>
          {mainCategories.map(({ name, sub }) => {
            const isOpen = openSubmenu[name];

            return (
              <React.Fragment key={name}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => handleMainItemClick(e, name)}
                    sx={{
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "rgba(255, 82, 82, 0.08)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={name}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "rgba(0, 0, 0, 0.85)",
                      }}
                    />
                    {sub.length > 0 && (
                      <div className="ml-auto">
                        {isOpen ? (
                          <FaRegSquareMinus
                            size={16}
                            className="text-primary"
                          />
                        ) : (
                          <FaRegPlusSquare
                            size={16}
                            className="text-gray-500"
                          />
                        )}
                      </div>
                    )}
                  </ListItemButton>
                </ListItem>

                {/* Submenu */}
                {sub.length > 0 && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {sub.map((subItem) => (
                        <ListItem
                          key={subItem}
                          disablePadding
                          sx={{ pl: 4 }}
                        >
                          <ListItemButton
                            onClick={handleSubItemClick}
                            sx={{
                              py: 1,
                              "&:hover": {
                                backgroundColor: "rgba(255, 82, 82, 0.04)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={subItem}
                              primaryTypographyProps={{
                                fontSize: "13px",
                                color: "rgba(0, 0, 0, 0.7)",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>

        <Divider />

        <List>
          {extraCategories.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={onClose}
                sx={{
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 82, 82, 0.08)",
                  },
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.7)",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CategoryPanel;