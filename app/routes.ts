import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("students", "routes/students.tsx"),
    route("students/add", "routes/students-add.tsx"),
] satisfies RouteConfig;
