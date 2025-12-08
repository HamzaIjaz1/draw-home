"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallMenuDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const noop_1 = require("../utils/noop");
const negate_1 = require("../utils/negate");
const lookup_1 = require("../utils/lookup");
const Icons_1 = require("../components/Icons");
const components_1 = require("../components");
exports.PaywallMenuDemo = (0, react_1.memo)(() => {
    const title = 'Billing';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [chosenTab, setChosenTab] = (0, react_1.useState)(0);
    const theme = (0, material_1.useTheme)();
    const period = chosenTab === 0 ? 'year' : 'month';
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, headerSpacing: { bottom: 'sm' }, noDivider: true, noHeightLimit: true, header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, lookup_1.lookup)(period, {
                            year: (0, jsx_runtime_1.jsx)(components_1.PaywallMenuDescription, { children: "Choose the subscription plan that\u2019s right for you" }),
                            month: ((0, jsx_runtime_1.jsxs)(components_1.PaywallMenuAlert, { children: [(0, jsx_runtime_1.jsx)(Icons_1.AlertIcon, {}), (0, jsx_runtime_1.jsx)("span", { children: "3 days remaining on your Free Trial." })] })),
                        }), (0, jsx_runtime_1.jsxs)(components_1.Tabs, { chosenTab: chosenTab, onClick: setChosenTab, stretch: true, children: [(0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Yearly Billing' }), (0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Monthly Billing' })] })] }), children: (0, jsx_runtime_1.jsxs)(components_1.PaywallMenuCards, { children: [(0, jsx_runtime_1.jsx)(components_1.PaymentPlanCard, { title: 'Free', description: 'Explore basic features', priceBold: 'Free', pricePrevious: null, priceGray: [], discountBadge: null, featuresTitle: 'Included features:', features: [
                                '3 Active projects',
                                'Community support',
                                'Basic models and textures',
                                '2 Levels',
                                'Export to PNG',
                                '10 AI Credits(Coming Soon)',
                            ], actionElement: (0, jsx_runtime_1.jsx)(components_1.BillingButton, { text: 'Your Current Plan', width: 'fill', variant: 'contained', height: 'md', rounded: 'md', textColors: { default: theme.palette.primary.main }, backgroundColors: { default: '#fd563133' }, shadowless: true, onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.PaymentPlanCard, { highlight: true, title: 'Professional', description: 'Enhance your work', priceBold: '$8', pricePrevious: (0, lookup_1.lookup)(period, { month: null, year: '$10' }), priceGray: [`/month${(0, lookup_1.lookup)(period, { month: '', year: ' ($96 Yearly)' })}`], discountBadge: '20% Discount', featuresTitle: 'Includes all Free Plan features and:', features: [
                                '10 Active projects',
                                'Email Support',
                                'Premium models and textures',
                                'Unlimited levels',
                                'Export PNG, GLB, GLTF, etc.',
                                'Import 2D and 3D assets',
                                '100 AI Credits(Coming Soon)',
                            ], actionElement: (0, jsx_runtime_1.jsx)(components_1.BillingButton, { text: 'Upgrade to Professional', width: 'fill', variant: 'contained', height: 'md', rounded: 'md', shadowless: true, onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.PaymentPlanCard, { title: 'Teams', description: 'Expand with clients and teams', priceBold: (0, lookup_1.lookup)(period, { month: '$20', year: '$200' }), pricePrevious: null, priceGray: [`/${period}`, '/seat'], discountBadge: null, featuresTitle: 'Includes all Professional Plan features and:', features: [
                                '10 Active Projects per seat',
                                'Real time collaboration ',
                                'Comments and feedback',
                                'Create & share an unlimited amount of projects',
                            ], actionElement: (0, jsx_runtime_1.jsx)(components_1.BillingButton, { text: 'Upgrade to Team', width: 'fill', variant: 'contained', height: 'md', rounded: 'md', shadowless: true, onClick: noop_1.noop }) })] }) })] }));
});
//# sourceMappingURL=PaywallMenuDemo.js.map