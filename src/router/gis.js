import DashboardLayout from "../views/Layout/DashboardLayout.vue";
import Middleware from "../middleware/";
export default {
    path: "/",
    component: DashboardLayout,
    name: "GIS",
    children: [
        {
            path: "/locations/create",
            name: "NewLocation",
            component: () => import("@/views/Location/New.vue"),
            meta: {
                groupName: "Location",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "location-create",
            },
        },
        {
            path: "/locations/update/:id",
            name: "EditLocation",
            component: () => import("@/views/Location/Edit.vue"),
            meta: {
                groupName: "Location",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "location-update",
            },
        },
        {
            path: "/locations",
            name: "LocationPage",
            component: () => import("@/views/Location/Show.vue"),
            meta: {
                groupName: "Location",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "location-index",
            },
        },

        // kitchens

        {
            path: "/kitchens/create",
            name: "NewKitchen",
            component: () => import("@/views/Kitchen/New.vue"),
            meta: {
                groupName: "Kitchen",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "kitchen-create",
            },
        },
        {
            path: "/kitchens/update/:id",
            name: "EditKitchen",
            component: () => import("@/views/Kitchen/Edit.vue"),
            meta: {
                groupName: "Kitchen",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "kitchen-update",
            },
        },
        {
            path: "/kitchens",
            name: "KitchenPage",
            component: () => import("@/views/Kitchen/Show.vue"),
            meta: {
                groupName: "Kitchen",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "kitchen-index",
            },
        },
        // tent
        {
            path: "/tents/create",
            name: "NewTent",
            component: () => import("@/views/Tent/New.vue"),
            meta: {
                groupName: "Tent",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "tent-create",
            },
        },
        {
            path: "/tents/update/:id",
            name: "EditTent",
            component: () => import("@/views/Tent/Edit.vue"),
            meta: {
                groupName: "Tent",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "tent-update",
            },
        },
        {
            path: "/tents",
            name: "TentPage",
            component: () => import("@/views/Tent/Show.vue"),
            meta: {
                groupName: "Tent",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "tent-index",
            },
        },

        // container
        {
            path: "/containers/create",
            name: "NewContainer",
            component: () => import("@/views/Container/New.vue"),
            meta: {
                groupName: "Container",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "container-create",
            },
        },
        {
            path: "/containers/update/:id",
            name: "EditContainer",
            component: () => import("@/views/Container/Edit.vue"),
            meta: {
                groupName: "Container",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "container-update",
            },
        },
        {
            path: "/containers",
            name: "ContainerPage",
            component: () => import("@/views/Container/Show.vue"),
            meta: {
                groupName: "Container",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "container-index",
            },
        },

        // zone
        {
            path: "/zones",
            name: "ZonePage",
            component: () => import("@/views/Zone/Show.vue"),
            meta: {
                groupName: "Zone",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "zone-index",
            },
        },

        // plot
        {
            path: "/plots/create",
            name: "NewPlot",
            component: () => import("@/views/Plot/New.vue"),
            meta: {
                groupName: "Plot",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "plot-create",
            },
        },
        {
            path: "/plots/update/:id",
            name: "EditPlot",
            component: () => import("@/views/Plot/Edit.vue"),
            meta: {
                groupName: "Plot",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "plot-update",
            },
        },
        {
            path: "/plots",
            name: "PlotPage",
            component: () => import("@/views/Plot/Show.vue"),
            meta: {
                groupName: "Plot",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "plot-index",
            },
        },

        // establishments
        {
            path: "/establishments/create",
            name: "NewEstablishments",
            component: () => import("@/views/Establishment/New.vue"),
            meta: {
                groupName: "Establishment",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "establishments-create",
            },
        },
        {
            path: "/establishments/update/:id",
            name: "EditEstablishments",
            component: () => import("@/views/Establishment/Edit.vue"),
            meta: {
                groupName: "Establishment",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "establishments-update",
            },
        },
        {
            path: "/establishments",
            name: "EstablishmentsPage",
            component: () => import("@/views/Establishment/Show.vue"),
            meta: {
                groupName: "Establishment",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "establishments-index",
            },
        },

        // water-tape
        {
            path: "/water-tapes/create",
            name: "NewWaterTape",
            component: () => import("@/views/waterTape/New.vue"),
            meta: {
                groupName: "waterTape",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "water-tape-create",
            },
        },
        {
            path: "/water-tapes/update/:id",
            name: "EditWaterTape",
            component: () => import("@/views/waterTape/Edit.vue"),
            meta: {
                groupName: "waterTape",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "water-tape-update",
            },
        },
        {
            path: "/water-tapes",
            name: "WaterTapePage",
            component: () => import("@/views/waterTape/Show.vue"),
            meta: {
                groupName: "waterTape",
                middlewares: [
                    Middleware.auth,
                    Middleware.permission,
                    Middleware.signeture,
                ],
                permissions: "water-tape-index",
            },
        },
        // washroom
        {
            path: "/washrooms/create",
            name: "NewWashroom",
            component: () =>
                import("@/views/Washroom/New.vue"),
            meta: {
                groupName: "Washroom",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-washroom-create',
            },
        },
        {
            path: "/washrooms/update/:id",
            name: "EditWashroom",
            component: () =>
                import("@/views/Washroom/Edit.vue"),
            meta: {
                groupName: "Washroom",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-washroom-update',
            },
        },
        {
            path: "/washrooms",
            name: "WashroomPage",
            component: () =>
                import("@/views/Washroom/Show.vue"),
            meta: {
                groupName: "Washroom",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-washroom-index',
            },
        },

        // electrical-meter
        {
            path: "/electrical-meters/create",
            name: "NewElectricalMeters",
            component: () =>
                import("@/views/ElectricalMeter/New.vue"),
            meta: {
                groupName: "ElectricalMeters",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-electrical-meter-create',
            },
        },
        {
            path: "/electrical-meters/update/:id",
            name: "EditElectricalMeters",
            component: () =>
                import("@/views/ElectricalMeter/Edit.vue"),
            meta: {
                groupName: "ElectricalMeters",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-electrical-meter-update',
            },
        },
        {
            path: "/electrical-meters",
            name: "ElectricalMetersPage",
            component: () =>
                import("@/views/ElectricalMeter/Show.vue"),
            meta: {
                groupName: "ElectricalMeters",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-electrical-meter-index',
            },
        },

        {
            path: "/map",
            name: "MapPage",
            component: () =>
                import("@/views/Map/Show.vue"),
            meta: {
                groupName: "MapPage",
                middlewares: [Middleware.auth, Middleware.permission, Middleware.signeture],
                permissions: 'gis-map-index',
            },
        },
    ],
};