import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";

const CategoryCollapse = ({
  mainCategories,
  extraCategories,
  openSubmenu,
  handleMainItemClick,
  handleSubItemClick,
  handleExtraItemClick,
}) => {
  return (
    <>
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
                        <FaRegSquareMinus size={16} className="text-primary" />
                      ) : (
                        <FaRegPlusSquare size={16} className="text-gray-500" />
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
                      <ListItem key={subItem} disablePadding sx={{ pl: 4 }}>
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
              onClick={handleExtraItemClick}
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
    </>
  );
};

export default CategoryCollapse;