import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import FilterListIcon from "@mui/icons-material/FilterList"
import { Sidebar, SubMenu, sidebarClasses } from "react-pro-sidebar"
function Example() {
  return (
    <Menu >
      <MenuButton>   Filters <FilterListIcon fontSize="small" /></MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
        <SubMenu icon={<CategoryIcon />} label={!isExpanded ? null : "Filter by Categories"}>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <div key={category.categoryID}>
                    <label htmlFor="categories">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.categoryID)}
                        value={category.categoryID}
                        onChange={() => handleCategoryChange(category.categoryID)}
                      />{" "}
                      {"    "}
                      {category.name}
                    </label>
                  </div>
                ))}
            </SubMenu>
        </MenuItem>
        <MenuItem>
        <SubMenu icon={<AttachMoneyIcon />} label={!isExpanded ? null : "Filter by Price"}>
          <div className="flex p-4 gap-2">
          <div  className="flex border rounded-lg p-1 ">
            <label htmlFor="min-price">
                <input
                size={8}
                className="focus:outline-none"
                  type="text"
                  name="min-price"
                  id="min-price"
                  onChange={handLeMinPriceChange}
                />
              </label>
              $
            </div>
            <p>to</p>
            <div className="flex border rounded-lg p-1">
            <label htmlFor="max-price">
                <input
                 className="focus:outline-none"
                size={8}
                  type="text"
                  name="max-price"
                  id="max-price"
                  onChange={handleMaxPriceChange}
                />
              </label>
              $
            </div>
          </div>
            </SubMenu>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}