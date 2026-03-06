import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("students", "routes/students.tsx"),
    route("students/add", "routes/students-add.tsx"),
    route("students/:id", "routes/student.tsx"),

    route("test", "routes/test-page.tsx"),
] satisfies RouteConfig;
