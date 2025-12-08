"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibilityMenuItems = void 0;
exports.visibilityMenuItems = [
    { title: 'Dimensions', active: true, onClick() { } },
    { title: 'Annotations', active: false, onClick() { } },
    { title: 'Space markers', active: true, onClick() { } },
    {
        title: 'Construction',
        items: [
            {
                title: 'Walls',
                items: [
                    { title: 'Exterior Walls', active: true, onClick() { } },
                    { title: 'Interior Walls', active: true, onClick() { } },
                ],
            },
            { title: 'Doors', active: true, onClick() { } },
            { title: 'Windows', active: true, onClick() { } },
            { title: 'Columns', active: true, onClick() { } },
            { title: 'Stairs', active: true, onClick() { } },
            { title: 'Railings', active: true, onClick() { } },
        ],
    },
    {
        title: 'Furniture',
        items: [
            { title: 'Kitchen', active: true, onClick() { } },
            { title: 'Bathroom', active: true, onClick() { } },
            { title: 'Seats', active: true, onClick() { } },
            { title: 'Beds', active: false, onClick() { } },
            { title: 'Tables', active: true, onClick() { } },
            { title: 'Shelves', active: false, onClick() { } },
            { title: 'Decorations', active: true, onClick() { } },
            { title: 'Appliances', active: true, onClick() { } },
            { title: 'Other', active: true, onClick() { } },
        ],
    },
    {
        title: 'Landscape',
        items: [
            { title: 'Trees', active: false, onClick() { } },
            { title: 'Bushes', active: true, onClick() { } },
        ],
    },
];
//# sourceMappingURL=data.js.map