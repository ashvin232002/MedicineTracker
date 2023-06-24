import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: "VscAccount",
    },
    {
      id: 2,
      name: "Update Medicine",
      path: "/dashboard/update-medicine",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscVm",
    },
    {
      id: 3,
      name: "Add Medicine / Delete Medicine",
      path: "/dashboard/add-delete-medicine",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscAdd",
    },
    {
      id: 4,
      name: "Serch Medicine",
      path: "/dashboard/search-medicine",
      type: ACCOUNT_TYPE.CUSTOMER,
      icon: "VscMortarBoard",
    },
    {
      id: 5,
      name: "My Medicine",
      path: "/dashboard/my-medicine",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscMortarBoard",
    },
    
];
  