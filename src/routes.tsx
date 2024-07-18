import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import { ADMIN_ROUTE, BASKET_ROUTE, SHOP } from "./utils/consts";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

]

export const publicRoutes = [
    {
        path: SHOP,
        Components: Shop
    }
]

